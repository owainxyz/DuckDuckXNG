import json, os, re, socket, threading, time, urllib.parse, urllib.request
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

port = int(os.environ.get("PORT", "7501"))
backends = []
# BACKENDS: comma separated url=model, tried in order. Add =small to a CPU-only
# fallback (short prompts, 2 threads, never skipped), e.g.
#   http://127.0.0.1:11434=qwen2.5:7b,http://127.0.0.1:11435=qwen2.5:0.5b-instruct-q4_0=small
for part in os.environ.get("BACKENDS", "http://127.0.0.1:11434=qwen2.5:7b").split(","):
    bits = part.strip().split("=")
    url, model, small = bits[0], bits[1], len(bits) > 2 and bits[2] == "small"
    backends.append({"url": url, "model": model, "local": small, "dead": 0.0})
locks = {b["url"]: threading.Lock() for b in backends}
latest = {"pid": ""}
cache = {}
# worked examples: small models copy their length, tone and bolding
TWO = re.compile(r"^(.*?[a-z0-9)\"”][.!?][\"”)]?\s+.*?[a-z0-9)\"”][.!?][\"”)]?)\s+[A-Z*]", re.S)
SHOTS = [
    ("Query: mangosteen\nSearch results:\n- Garcinia mangostana, tropical evergreen tree, purple fruit\n- Mangosteen juice supplements, buy online",
     "**Mangosteen** is a tropical fruit from Southeast Asia with a thick deep-purple rind and soft white segments that taste sweet and slightly tangy. It is often called the queen of fruits and is eaten fresh or used in juices and desserts."),
    ("Query: best text editor\nSearch results:\n- Top code editors ranked: VS Code, Sublime Text, Neovim, Zed\n- Notepad++ download",
     "**Visual Studio Code** is the best all-round text editor for most people, being free, fast and backed by a huge library of extensions. Sublime Text is a lighter alternative, while Neovim suits people who prefer keyboard-driven editing."),
    ("Query: how to boil an egg\nSearch results:\n- Boiled egg timings for soft, jammy and hard yolks\n- Egg timer app",
     "To boil an egg, lower it into boiling water and cook for **6 to 7 minutes** for a jammy yolk or 10 to 12 minutes for hard-boiled. Move it straight into cold water afterwards so it stops cooking and peels easily."),
    ("Query: is chocolate bad for dogs\nSearch results:\n- Chocolate toxicity in dogs, theobromine\n- Dog-safe treats",
     "Yes, **chocolate is toxic to dogs** because it contains theobromine and caffeine, which they cannot break down well. Dark and baking chocolate are the most dangerous, and symptoms include vomiting, a racing heart and seizures."),
    ("Query: board games for two\nSearch results:\n- 15 best two-player board games: Patchwork, 7 Wonders Duel, Jaipur, Codenames Duet\n- Board Games For Two shop",
     "Good board games for two include 7 Wonders Duel, Patchwork, Jaipur and Codenames Duet, which all play quickly and stay tense with only two players. 7 Wonders Duel is the deepest of them, while Patchwork and Jaipur are the easiest to teach."),
    ("Query: why do cats purr\nSearch results:\n- How cats purr: laryngeal muscles\n- Cat purring sounds 10 hours",
     "Cats purr by rapidly twitching the muscles of their larynx as they breathe, which makes the vocal cords vibrate at around **25 to 150 Hz**. They purr when content, but also when stressed or hurt, as the vibration may help calm them and heal tissue."),
]
# one ctx size and no unload for GPU backends: a different num_ctx or an expiry makes Ollama reload the model, which stalls the desktop
GPU_CTX = 8192
GPU_KEEP = os.environ.get("GPU_KEEP_ALIVE", "-1")
try:
    GPU_KEEP = int(GPU_KEEP)
except ValueError:
    pass
small = {
    "answer": ("Answer the query in 2 short sentences using only the facts given. If the facts are about different things, say it can mean several things. Plain text.", 70),
    "questions": ("Write 3 short follow-up search questions about the topic, one per line, each ending with ?", 45),
}
big = {
    "answer": (
        "You are Search Assist, the answer box at the top of a search page. Write exactly 2 sentences, 30 to 55 words in total. "
        "Sentence 1 answers the query directly: for a thing, 'X is a ...' with its key facts; for 'best X', name the single best pick and why; "
        "for how-to, the method with the key numbers; for a yes/no question, the verdict; for a list, 'X include a, b, c and d.' "
        "Sentence 2 adds the most useful extra detail, a second option, or a caveat. "
        "Use the search results and your own knowledge, and only state facts you are sure of. If the query has several meanings, answer only the most common one. Never reuse names or facts from earlier example answers. Skip memes, companies and videos unless asked. "
        "Bold at most one thing with **: the subject at the start, or the key answer phrase. Never start with Try. "
        "Plain neutral tone, no lists, no headings, no preamble, never name websites or authors, never say refers to, according to, the results or sources.",
        110,
    ),
    "questions": (
        "Write 3 short, specific follow-up questions a curious person might search next about the topic, based on the results. "
        "One per line, no numbering, each ending with ?",
        70,
    ),
}


local_system = "You are Search Assist. Use the facts given and what you know. Plain text. Never say according to, the facts or the search results."
chat_system = (
    "You are DuckDuckXNG AI. Talk like a chill, down to earth mate texting back: short, casual, warm, natural. "
    "Match the user's vibe; a greeting gets a quick greeting back like 'Hey! What's up?'. "
    "Never say you're an AI, a language model, or that you don't have feelings unless asked directly. "
    "No 'How can I assist you today', no corporate tone. Answer the actual question straight away; "
    "go into detail only when the question needs it, and use markdown (bold, lists) only when it helps."
)


def model_label(m):
    n = m.split(":")[0].replace("qwen", "Qwen ").replace("llama", "Llama ").strip()
    s = (m.split(":")[1] if ":" in m else "").split("-")[0].upper()
    return (n + " " + s).strip()


def local_prompt(q, mode, results):
    facts = "\n".join(f"- {str(r.get('content',''))[:100]}" for r in results[:3])
    if mode == "questions":
        tail = f"Topic: {q}\nWrite 3 short follow-up search questions about the topic, one per line, each ending with ?"
        return local_system, f"Facts:\n{facts}\n\n{tail}", 45
    tail = f"Query: {q}\nAnswer in 2 short sentences. If the facts are about different things, say it can mean several things."
    return local_system, f"Facts:\n{facts}\n\n{tail}", 50


def alive(b):
    if b["local"]:
        return True
    if time.time() - b["dead"] < 30:
        return False
    u = urllib.parse.urlparse(b["url"])
    try:
        socket.create_connection((u.hostname, u.port or 80), timeout=0.8).close()
        return True
    except OSError:
        b["dead"] = time.time()
        return False


def pick():
    for b in backends:
        if alive(b):
            return b
    return backends[-1]


def call(b, body, timeout):
    req = urllib.request.Request(b["url"] + "/api/chat", json.dumps(body).encode(), {"Content-Type": "application/json"})
    return urllib.request.urlopen(req, timeout=timeout)


def warm():
    b = [x for x in backends if x["local"]]
    if not b:
        return
    while True:
        try:
            with call(b[0], {"model": b[0]["model"], "messages": [{"role": "system", "content": local_system}, {"role": "user", "content": "Facts:\n- "}], "stream": False, "keep_alive": -1,
                             "options": {"num_predict": 1, "num_ctx": 512, "temperature": 0, "num_thread": 2}}, 300):
                return
        except Exception:
            time.sleep(10)


ia_cache = {}
UA = {"User-Agent": "DuckDuckXNG/1.0"}


def fetch_json(url):
    with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=3) as r:
        return json.loads(r.read())


def strip_html(s):
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", str(s))).strip()


def ia_define(q):
    w = q.strip().lower()
    d = fetch_json("https://en.wiktionary.org/api/rest_v1/page/definition/" + urllib.parse.quote(w.replace(" ", "_")))
    out = []
    for e in d.get("en", [])[:4]:
        defs = [strip_html(x.get("definition", "")) for x in e.get("definitions", [])]
        defs = [x for x in defs if x][:4]
        if defs:
            out.append({"pos": e.get("partOfSpeech", ""), "defs": defs})
    return {"word": w, "entries": out} if out else None


def ia_weather(q):
    g = fetch_json("https://geocoding-api.open-meteo.com/v1/search?count=1&language=en&name=" + urllib.parse.quote(q.strip()))
    if not g.get("results"):
        return None
    p = g["results"][0]
    args = urllib.parse.urlencode({
        "latitude": p["latitude"], "longitude": p["longitude"], "timezone": "auto", "forecast_days": 7,
        "current": "temperature_2m,apparent_temperature,weather_code,wind_speed_10m,relative_humidity_2m,is_day",
        "daily": "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max",
    })
    f = fetch_json("https://api.open-meteo.com/v1/forecast?" + args)
    return {"place": p.get("name", ""), "region": p.get("admin1", ""), "country": p.get("country", ""), "current": f.get("current", {}), "daily": f.get("daily", {})}


class H(BaseHTTPRequestHandler):
    protocol_version = "HTTP/1.1"

    def log_message(self, *a):
        pass

    def do_GET(self):
        u = urllib.parse.urlparse(self.path)
        a = urllib.parse.parse_qs(u.query)
        kind = (a.get("ia") or [""])[0]
        q = (a.get("q") or [""])[0][:80].strip()
        if u.path != "/assist" or kind not in ("define", "weather") or not q:
            return self.send_error(404)
        key = kind + "\0" + q.lower()
        hit = ia_cache.get(key)
        ttl = 1800 if kind == "weather" else 86400
        if hit and time.time() - hit[0] < ttl:
            data = hit[1]
        else:
            try:
                data = (ia_define if kind == "define" else ia_weather)(q)
            except Exception:
                data = None
            ia_cache[key] = (time.time(), data)
            if len(ia_cache) > 500:
                ia_cache.pop(next(iter(ia_cache)))
        body = json.dumps(data).encode()
        self.send_response(200 if data else 204)
        self.send_header("Content-Type", "application/json")
        self.send_header("Cache-Control", "no-store")
        self.send_header("Content-Length", str(len(body) if data else 0))
        self.end_headers()
        if data:
            self.wfile.write(body)

    def chunk(self, s):
        b = s.encode()
        self.wfile.write(b"%x\r\n%s\r\n" % (len(b), b))
        self.wfile.flush()

    def do_POST(self):
        if self.path != "/assist":
            return self.send_error(404)
        n = int(self.headers.get("Content-Length") or 0)
        if n <= 0 or n > 20000:
            return self.send_error(413)
        try:
            data = json.loads(self.rfile.read(n))
            q = str(data.get("q", ""))[:300].strip()
            mode = data.get("mode") if data.get("mode") in ("answer", "questions", "chat") else "answer"
            pid = str(data.get("pid", ""))[:40]
            results = [r for r in (data.get("results") or []) if isinstance(r, dict)][:4]
            if mode == "chat":
                msgs = [m for m in (data.get("messages") or []) if isinstance(m, dict) and m.get("role") in ("user", "assistant")][-6:]
                msgs = [{"role": m["role"], "content": str(m.get("content", ""))[:600]} for m in msgs]
                assert msgs and msgs[-1]["role"] == "user" and msgs[-1]["content"].strip()
            else:
                assert q and results
        except Exception:
            return self.send_error(400)
        if mode == "chat":
            return self.do_chat(msgs)
        self.send_response(200)
        self.send_header("Content-Type", "text/plain; charset=utf-8")
        self.send_header("Cache-Control", "no-store")
        self.send_header("Transfer-Encoding", "chunked")
        self.end_headers()
        try:
            if pid and mode == "answer" and not data.get("sub"):
                latest["pid"] = pid
            b = pick()
            key = ("L" if b["local"] else "G") + mode + "\0" + q.lower() + "\0" + "|".join(str(r.get("url", "")) for r in results[:4] if isinstance(r, dict))
            hit = cache.get(key)
            if hit and time.time() - hit[0] < 86400:
                self.chunk(hit[1])
                return
            shots = []
            if b["local"]:
                system, user, limit = local_prompt(q, mode, results)
                opts = {"num_predict": limit, "num_ctx": 512, "temperature": 0, "num_thread": 2}
                keep = -1
            else:
                ctx = "\n".join(f"- {str(r.get('title',''))[:100]}: {str(r.get('content',''))[:400]}" for r in results)
                system, limit = big[mode]
                user = f"Query: {q}\nSearch results:\n{ctx}" if mode == "answer" else f"Topic: {q}\nSearch results:\n{ctx}"
                opts = {"num_predict": limit, "num_ctx": GPU_CTX, "temperature": 0.2}
                shots = [m for u, a in SHOTS for m in ({"role": "user", "content": u}, {"role": "assistant", "content": a})] if mode == "answer" else []
                keep = GPU_KEEP
            body = {"model": b["model"], "messages": [{"role": "system", "content": system}] + shots + [{"role": "user", "content": user}], "stream": True, "keep_alive": keep, "options": opts}
            with locks[b["url"]]:
                if pid and latest["pid"] and pid != latest["pid"]:
                    return
                out = []
                sent = 0
                try:
                    r = call(b, body, 120)
                except Exception:
                    if b["local"]:
                        raise
                    b["dead"] = time.time()
                    return self.do_fallback(q, mode, pid, results)
                with r:
                    for line in r:
                        if pid and pid != latest["pid"]:
                            break
                        if not line.strip():
                            continue
                        j = json.loads(line)
                        t = (j.get("message") or {}).get("content", "")
                        if t:
                            out.append(t)
                            if mode == "answer":
                                full = "".join(out)
                                cut = TWO.match(full) if not b["local"] else None
                                if cut:
                                    # DDG answers are 2 sentences; stop at the start of a third
                                    self.chunk(full[sent:cut.end(1)])
                                    out = [full[:cut.end(1)]]
                                    break
                                self.chunk(full[sent:])
                                sent = len(full)
                        if j.get("done"):
                            break
                text = "".join(out).strip()
                if mode == "questions":
                    qs = []
                    for l in text.splitlines():
                        l = re.sub(r"^[\s\-\*\d\.\)]+", "", l).strip()
                        if l.endswith("?") and 8 < len(l) < 140 and l not in qs:
                            qs.append(l)
                    text = "\n".join(qs[:3])
                    if text:
                        self.chunk(text)
                if text and (not pid or pid == latest["pid"]):
                    cache[key] = (time.time(), text)
                    if len(cache) > 2000:
                        cache.pop(next(iter(cache)))
        except (BrokenPipeError, ConnectionResetError):
            return
        except Exception:
            pass
        finally:
            try:
                self.wfile.write(b"0\r\n\r\n")
                self.wfile.flush()
            except Exception:
                pass

    def do_chat(self, msgs):
        b = pick()
        self.send_response(200)
        self.send_header("Content-Type", "text/plain; charset=utf-8")
        self.send_header("Cache-Control", "no-store")
        self.send_header("X-Model", model_label(b["model"]))
        self.send_header("Transfer-Encoding", "chunked")
        self.end_headers()
        try:
            if b["local"]:
                opts = {"num_predict": 260, "num_ctx": 1536, "temperature": 0.3, "num_thread": 2}
                keep = -1
            else:
                opts = {"num_predict": 700, "num_ctx": GPU_CTX, "temperature": 0.4}
                keep = GPU_KEEP
            body = {"model": b["model"], "messages": [{"role": "system", "content": chat_system}] + msgs, "stream": True, "keep_alive": keep, "options": opts}
            with locks[b["url"]], call(b, body, 180) as r:
                for line in r:
                    if not line.strip():
                        continue
                    j = json.loads(line)
                    t = (j.get("message") or {}).get("content", "")
                    if t:
                        self.chunk(t)
                    if j.get("done"):
                        break
        except (BrokenPipeError, ConnectionResetError):
            return
        except Exception:
            pass
        finally:
            try:
                self.wfile.write(b"0\r\n\r\n")
                self.wfile.flush()
            except Exception:
                pass

    def do_fallback(self, q, mode, pid, results):
        b = [x for x in backends if x["local"]]
        if not b:
            return
        system, user, limit = local_prompt(q, mode, results)
        body = {"model": b[0]["model"], "messages": [{"role": "system", "content": system}, {"role": "user", "content": user}], "stream": True, "keep_alive": -1,
                "options": {"num_predict": limit, "num_ctx": 512, "temperature": 0, "num_thread": 2}}
        out = []
        with locks[b[0]["url"]], call(b[0], body, 120) as r:
            for line in r:
                if not line.strip():
                    continue
                j = json.loads(line)
                t = (j.get("message") or {}).get("content", "")
                if t:
                    out.append(t)
                    if mode == "answer":
                        self.chunk(t)
                if j.get("done"):
                    break
        if mode == "questions":
            qs = [re.sub(r"^[\s\-\*\d\.\)]+", "", l).strip() for l in "".join(out).splitlines()]
            qs = [l for l in qs if l.endswith("?")][:3]
            if qs:
                self.chunk("\n".join(qs))


threading.Thread(target=warm, daemon=True).start()
ThreadingHTTPServer(("127.0.0.1", port), H).serve_forever()
