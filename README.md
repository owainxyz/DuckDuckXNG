<p align="center"><img src="https://duckduckgo.com/assets/logo_header.v109.svg" alt="DuckDuckGo logo" width="120"></p>

# DuckDuckXNG

[SearXNG](https://github.com/searxng/searxng) with a DuckDuckGo-style look and a local AI Search Assist.

- results layout, filter menus, image grid, videos carousel and settings page in the DuckDuckGo style
- Search Assist: a 2-sentence answer above the results, written by a local [Ollama](https://ollama.com) model from the top results, with Explore More follow-ups
- AI Chat with saved chats
- instant answers in the browser: calculator, unit converter, timer, stopwatch, password, random number, colour picker, time; dictionary and weather through `assist.py`
- `!bangs` work like DuckDuckGo's

Not affiliated with DuckDuckGo. Their logo and fonts aren't included; the theme falls back to system fonts.

## Run

```sh
cp .env.example .env
sed -i "s/^SEARXNG_SECRET=.*/SEARXNG_SECRET=$(openssl rand -hex 32)/" .env
docker compose up -d
docker exec duckduckxng-ollama ollama pull qwen2.5:7b
```

Open http://127.0.0.1:8888.

Everything binds to 127.0.0.1 on the host network. To reach it from elsewhere, put a reverse proxy (Caddy, nginx, `tailscale serve`) in front of port 8888 and set `BASE_URL`.

## Models

`BACKENDS` in `.env` is a comma-separated list of `url=model`, tried in order. A backend that can't be reached is skipped for 30 s.

| hardware | model | answer time |
|---|---|---|
| 8 GB GPU | `qwen2.5:7b` | ~1.5 s |
| 4 GB GPU | `qwen2.5:3b` | ~1 s, sloppier |
| CPU only | `qwen2.5:0.5b-instruct-q4_0=small` | 10-15 s |

Add `=small` to a CPU-only backend: it gets short prompts and 2 threads. For a GPU, uncomment the `deploy` block under `ollama` in `compose.yml`, or point `BACKENDS` at an Ollama running somewhere else.

The model is kept loaded (`OLLAMA_KEEP_ALIVE=-1`) and every request uses the same context size. Unloading, or switching context size, makes Ollama reload the model in the middle of a search, which can freeze a desktop for 10-20 s.

## Files

| path | what |
|---|---|
| `compose.yml` | SearXNG, Ollama and the assist container |
| `searxng/settings.yml` | engines, timeouts, hostname priorities |
| `searxng/theme/ddg.css`, `assist.js` | the theme, appended to SearXNG's own css/js on every start |
| `searxng/py/ddgfix.py` | SearXNG plugin: DuckDuckGo-style bangs, drops broken links |
| `assist/assist.py` | Search Assist, chat, dictionary and weather API on 127.0.0.1:7501 |
| `assist/proxy.py` | serves SearXNG and `/assist` on one port |

Search Assist's style comes from the prompt and worked examples at the top of `assist.py` (`big["answer"]` and `SHOTS`).

## License

AGPL-3.0, like SearXNG. Figtree is under the SIL Open Font License (`searxng/theme/ddg/Figtree-OFL.txt`).
