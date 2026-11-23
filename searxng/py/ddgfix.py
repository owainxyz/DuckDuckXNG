import re
import typing as t
from urllib.parse import urlparse

from searx.plugins import Plugin, PluginInfo
from searx.data import EXTERNAL_BANGS
from searx.external_bang import get_bang_definition_and_ac, resolve_bang_definition

BANG = re.compile(r"(?:^|\s)!([^\s!][^\s]*)(?=\s|$)")


@t.final
class SXNGPlugin(Plugin):
    id = "ddgfix"

    def __init__(self, plg_cfg) -> None:
        super().__init__(plg_cfg)
        self.info = PluginInfo(id=self.id, name="DDG fixes", description="Drop broken links, DDG-style bangs", preference_section="general")

    def pre_search(self, request, search) -> bool:
        raw = (request.form.get("q") or "").strip()
        if "!" not in raw or search.search_query.external_bang:
            return True
        m = BANG.search(raw)
        if not m:
            return True
        bang = m.group(1).lower()
        try:
            definition, _ = get_bang_definition_and_ac(EXTERNAL_BANGS, bang)
        except Exception:
            return True
        if not definition or not isinstance(definition, str):
            return True
        rest = (raw[: m.start()] + " " + raw[m.end():]).strip()
        url = resolve_bang_definition(definition, rest)[0]
        if "duckduckgo.com" in urlparse(url).netloc:
            return True
        search.search_query.external_bang = bang
        search.search_query.query = rest
        return True

    def on_result(self, request, search, result) -> bool:
        url = getattr(result, "url", None) or (result.get("url") if hasattr(result, "get") else None)
        if not url:
            return True
        try:
            p = urlparse(url)
        except ValueError:
            return False
        return bool(p.netloc) and not p.path.startswith("/go/v1/")
