# Configuration

[← README](../README.md)

## `.env`

| variable | default | what it does |
|---|---|---|
| `SEARXNG_SECRET` | none, required | SearXNG's secret key. Generate one with `openssl rand -hex 32`. |
| `PORT` | `8888` | port the site is served on |
| `BASE_URL` | `http://127.0.0.1:8888/` | the URL people open; set it to your public URL if you put a proxy in front |
| `BACKENDS` | `http://127.0.0.1:11434=qwen2.5:7b` | which Ollama servers and models Search Assist uses (see below) |

Apply changes with `docker compose up -d`.

## Backends

`BACKENDS` is a comma-separated list of `url=model`, tried in order. If a backend can't be reached, it's skipped for 30 seconds and the next one is used.

```sh
# one GPU machine
BACKENDS=http://127.0.0.1:11434=qwen2.5:7b

# a gaming PC first, falling back to a small model on the server's CPU
BACKENDS=http://192.168.1.20:11434=qwen2.5:7b,http://127.0.0.1:11434=qwen2.5:0.5b-instruct-q4_0=small
```

Add `=small` to a CPU-only backend. It then gets a short prompt, a 512-token context and 2 threads, so it can answer in 10–15 s on a weak CPU. A `small` backend is never skipped.

To use Ollama on another machine, run it with `OLLAMA_HOST=0.0.0.0`, and make sure the search server can reach port 11434 on it. Set these on that machine too:

```sh
OLLAMA_KEEP_ALIVE=-1
OLLAMA_CONTEXT_LENGTH=8192
```

Without them, the model unloads after 5 minutes and has to reload during a search. See [troubleshooting](troubleshooting.md#searching-freezes-my-pc-for-a-few-seconds).

## Models

| hardware | model | VRAM / RAM | answer time | quality |
|---|---|---|---|---|
| 8 GB GPU | `qwen2.5:7b` | ~5 GB | ~1.5 s | good |
| 4–6 GB GPU | `qwen2.5:3b` | ~2.4 GB | ~1 s | ignores some style rules |
| CPU only | `qwen2.5:0.5b-instruct-q4_0` | ~0.5 GB | 10–15 s | short and basic |

Pull a model with:

```sh
docker exec duckduckxng-ollama ollama pull <model>
```

On CPUs without AVX, `q4_0` builds run several times faster than the default `q4_K_M`.

## Exposing it

Everything listens on `127.0.0.1` only. Put a reverse proxy in front of port 8888 and set `BASE_URL` to the public address.

**Caddy**

```caddy
search.example.com {
    reverse_proxy 127.0.0.1:8888
}
```

**Tailscale** (private to your tailnet)

```sh
tailscale serve --bg --https=443 http://127.0.0.1:8888
```

> [!WARNING]
> SearXNG's rate limiter is off in `settings.yml`, and Search Assist runs a model for every search. If you open it to the internet, turn the limiter on (`server.limiter: true`, which needs Valkey/Redis) or put authentication in front.

## Search engines

Engines are set in [`searxng/settings.yml`](../searxng/settings.yml). The defaults are tuned for speed:

- Google, Brave and Yahoo are on.
- Engines that are slow or often CAPTCHA'd are off: Bing, Startpage, Qwant, Mojeek and Wikidata.
- `request_timeout` is 1.5 s with a 2.5 s maximum.

`hostnames` raises sites such as Wikipedia, Stack Overflow, GitHub and MDN, lowers content farms, and removes Pinterest and Quora. Edit those lists to suit yourself.

See the [SearXNG settings docs](https://docs.searxng.org/admin/settings/index.html) for everything else.

## Ports

Everything runs on the host network:

| port | service |
|---|---|
| 8888 | `proxy.py`, the one you open |
| 7500 | SearXNG |
| 7501 | `assist.py` |
| 11434 | Ollama |

If 7500 or 7501 is taken, change `SEARXNG_PORT` / `GRANIAN_PORT` in `compose.yml` and `server.port` in `settings.yml` for SearXNG, or set `PORT`, `ASSIST_PORT` and `SEARXNG_PORT` in the `assist` service.
