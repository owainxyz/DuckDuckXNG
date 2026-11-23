# Search Assist

[← README](../README.md)

Search Assist writes a short answer above the results, in the same style as DuckDuckGo's:

> **Rambutan** is a fruit native to Southeast Asia with a red, spiky outer shell and sweet, juicy white flesh. It is often eaten by popping off the shell and sucking out the flesh.

It runs on the first page of **All** results. Turn it off with the Search Assist toggle next to the gear icon (saved in your browser).

## How an answer is made

1. The page sends the query and the top 4 results (title + snippet) to `/assist`.
2. `assist.py` builds the prompt: the style rules, six worked examples, then the query and results.
3. The model's reply streams back word by word. The server stops it after two sentences.
4. The answer is cached for 24 hours. If you search again before it finishes, it's cancelled.

**More** under the answer asks the model for a longer write-up. **Explore More** shows three follow-up questions, taken from SearXNG's suggestions, and answers each one when you open it.

## The style

DuckDuckGo's answers follow a clear pattern, and the prompt copies it:

| query type | first sentence | second sentence |
|---|---|---|
| a thing (`salak`) | *X is a …* with its key facts | origin, taste, use |
| best X (`best budget gpu`) | the single best pick and why | a second option |
| how-to (`how to cook rice`) | the method, with the numbers | a tip |
| yes/no (`is coffee bad for you`) | the verdict | the caveat |
| a list (`snacks for a road trip`) | *X include a, b, c and d.* | one detail |

Other rules:
- It bolds one thing at most.
- It never starts with "Try".
- It never names websites.
- It never says "according to the search results".
- It uses its own knowledge as well as the results, so it still answers when the snippets are thin.

## Changing it

Everything is at the top of [`assist/assist.py`](../assist/assist.py):

| name | what |
|---|---|
| `big["answer"]` | the style rules and token limit for GPU backends |
| `SHOTS` | the worked examples. The model copies their length and tone more than it follows the rules. |
| `big["questions"]` | the prompt for Explore More questions, used when SearXNG has no suggestions |
| `local_prompt()` | the much shorter prompt for `=small` CPU backends |
| `TWO` | the regex that cuts answers off after two sentences |
| `chat_system` | the AI Chat personality |

Restart after editing:

```sh
docker compose restart assist
```

> [!TIP]
> Don't make an example too close to a query people will really search for. A 7B model will copy names straight out of it. An example about "exotic vegetables" got kohlrabi into answers about fruit.

## API

`assist.py` listens on `127.0.0.1:7501` and is served at `/assist` through the proxy.

**POST `/assist`**: streams plain text.

```json
{"q": "rambutan", "mode": "answer", "results": [{"title": "...", "content": "...", "url": "..."}]}
```

| `mode` | needs | returns |
|---|---|---|
| `answer` | `q`, `results` | the 2-sentence answer |
| `questions` | `q`, `results` | 3 follow-up questions, one per line |
| `chat` | `messages` (`[{role, content}]`, last one from the user) | the chat reply. The `X-Model` header names the model. |

**GET `/assist?ia=weather&q=<place>`**: current weather and a 7-day forecast from Open-Meteo (JSON).

**GET `/assist?ia=define&q=<word>`**: definitions from Wiktionary (JSON).
