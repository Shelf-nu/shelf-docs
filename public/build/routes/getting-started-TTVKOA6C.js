import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XU7DNSPJ.js";
import "/build/_shared/chunk-BOXFZXVX.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// mdx:routes/getting-started.mdx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
var attributes = {
  "meta": {
    "title": "Getting started",
    "description": "Isn't this awesome?"
  }
};
function MDXContent(props = {}) {
  const _components = Object.assign({
    h1: "h1"
  }, props.components), { wrapper: MDXLayout } = _components;
  const _content = /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(_components.h1, { children: "Hello Content!" }, void 0, false, {
    fileName: "mdx:routes/getting-started.mdx",
    lineNumber: 13,
    columnNumber: 22
  }, this) }, void 0, false, {
    fileName: "mdx:routes/getting-started.mdx",
    lineNumber: 13,
    columnNumber: 20
  }, this);
  return MDXLayout ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MDXLayout, { ...props, children: _content }, void 0, false, {
    fileName: "mdx:routes/getting-started.mdx",
    lineNumber: 14,
    columnNumber: 22
  }, this) : _content;
}
var getting_started_default = MDXContent;
var headers = typeof attributes !== "undefined" && attributes.headers;
var meta = typeof attributes !== "undefined" && attributes.meta;
var handle = typeof attributes !== "undefined" && attributes.handle;
export {
  getting_started_default as default,
  handle,
  meta
};
//# sourceMappingURL=/build/routes/getting-started-TTVKOA6C.js.map
