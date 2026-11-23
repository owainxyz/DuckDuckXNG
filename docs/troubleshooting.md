# Troubleshooting

[← README](../README.md)

Start with the logs:

```sh
docker compose logs -f assist searxng
```

## Search Assist never appears

- **No model pulled.** Run `docker exec duckduckxng-ollama ollama list`. If it's empty, pull the model named in `BACKENDS`.
- **Wrong model name.** The name in `BACKENDS` must match `ollama list` exactly, tag included (`qwen2.5:7b`, not `qwen2.5`).
- **Backend can't be reached.** From the server, run `curl http://<host>:11434/api/version`. A backend that fails the check is skipped for 30 s.
- **It's off.** It only runs on the first page of **All**, and it can be turned off with the toggle by the gear icon.

## Searching freezes my PC for a few seconds

Ollama is loading the model onto the GPU in the middle of a search. A cold load can take 10–20 s and stall the desktop while it does. Two things cause it:

- **The model unloaded.** Set `OLLAMA_KEEP_ALIVE=-1` on the machine running Ollama. The bundled container already has it.
- **A different context size.** Ollama reloads the model whenever `num_ctx` changes. `assist.py` always asks for 8192, so set `OLLAMA_CONTEXT_LENGTH=8192` on Ollama, and don't point other apps at the same model with another size.

Check that the model stays loaded:

```sh
ollama ps   # UNTIL should say "Forever"
```

## Answers are slow

- Check `ollama ps`. `PROCESSOR` should say `100% GPU`. Anything with `CPU` means the model doesn't fit in VRAM: pick a smaller one.
- The first answer after a restart includes loading the model.
- CPU-only backends take 10–15 s with `qwen2.5:0.5b-instruct-q4_0`. Larger models on a CPU are much slower.

## Answers are wrong or ignore the style

Small models struggle with the rules. `qwen2.5:3b` gets facts wrong and bolds everything, and `qwen2.5:7b` is a lot better. See [models](configuration.md#models) and [changing the style](search-assist.md#changing-it).

## No results, or few results

SearXNG engines get rate-limited or CAPTCHA'd. Check:

```sh
docker compose logs searxng | grep -i -E "captcha|denied|timeout"
```

Suspended engines come back on their own after a few minutes (`suspended_times` in `settings.yml`). Turning on more engines makes this rarer.

## The theme didn't update

The entrypoint rebuilds the CSS and JS on every start and stamps them with `?v=<time>`. Restart SearXNG, then hard-refresh the page:

```sh
docker compose restart searxng
```

## Port already in use

See [ports](configuration.md#ports).
