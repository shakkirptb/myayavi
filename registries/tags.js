window.myayavi.registerTags([
  {
    test: (url) => RegExp("^http://localhost:").test(url),
    tags: ["env:local", "role:dev"],
  },
  {
    test: (url) => RegExp("^http://localhost:4502").test(url),
    tags: ["app:aem", "aem:author"],
  },
  {
    test: (url) => RegExp("^http://localhost:4503").test(url),
    tags: ["app:aem", "aem:publisher"],
  },
  {
    test: (url) => myayavi.registry.patterns["path:onehub:html"].test(url),
    tags: ["app:aem"],
  },
]);
