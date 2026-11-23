# routes /assist to assist.py and everything else to SearXNG, so both share one origin
import http.client, os
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

ASSIST = int(os.environ.get("ASSIST_PORT", "7501"))
SEARXNG = int(os.environ.get("SEARXNG_PORT", "7500"))
HOP = {"connection", "keep-alive", "transfer-encoding", "te", "upgrade", "proxy-authorization", "proxy-authenticate", "trailer"}


class G(BaseHTTPRequestHandler):
    protocol_version = "HTTP/1.0"

    def log_message(self, *a):
        pass

    def handle_any(self):
        port = ASSIST if self.path == "/assist" or self.path.startswith(("/assist?", "/assist/")) else SEARXNG
        n = int(self.headers.get("Content-Length") or 0)
        body = self.rfile.read(n) if 0 < n <= 2_000_000 else None
        hdrs = {k: v for k, v in self.headers.items() if k.lower() not in HOP}
        try:
            c = http.client.HTTPConnection("127.0.0.1", port, timeout=300)
            c.request(self.command, self.path, body=body, headers=hdrs)
            r = c.getresponse()
        except Exception:
            self.send_error(502)
            return
        self.send_response(r.status, r.reason)
        for k, v in r.getheaders():
            if k.lower() not in HOP and k.lower() != "content-length":
                self.send_header(k, v)
        self.send_header("Connection", "close")
        self.end_headers()
        try:
            while True:
                chunk = r.read1(65536) if hasattr(r, "read1") else r.read(65536)
                if not chunk:
                    break
                self.wfile.write(chunk)
                self.wfile.flush()
        except (BrokenPipeError, ConnectionResetError):
            pass
        finally:
            c.close()

    do_GET = do_POST = do_HEAD = handle_any


ThreadingHTTPServer((os.environ.get("HOST", "127.0.0.1"), int(os.environ.get("PROXY_PORT", "8888"))), G).serve_forever()
