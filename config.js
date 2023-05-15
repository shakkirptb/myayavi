window.myayavi = {
  config: {
    "user-role": "role:dev",
  },
  registry: {
    tags: [],
    actions: [],
    domains: {},
    patterns: {},
  },
  registerTags: (tags) => [],
  registerActions: (actions) => [],
  registerDomains: (domains) => {},
  registerPatterns: (patterns) => {},
  getConfig: () => null,
  isDev: () => false,
  getRole: () => null,
  isAvailableForRole: (tags) => false,
};

//-------
((window) => {
  const myayavi = window.myayavi ?? {};

  const config = window?.myayavi?.config;
  myayavi.getConfig = () => config;

  const role = config?.["user-role"] ?? "role:public";
  myayavi.getRole = () => role;

  const isDev = role === "role:dev";
  myayavi.isDev = () => isDev;

  myayavi.isAvailableForRole = (tags = []) => {
    return (
      myayavi.isDev() ||
      tags.includes(myayavi.getRole()) ||
      !tags.some((tag) => tag.startsWith("role:"))
    );
  };

  // registry
  myayavi.registerTags = (tags) => {
    myayavi.registry.tags.push(...tags);
  };
  myayavi.registerActions = (ac) => {
    myayavi.registry.actions.push(...ac);
  };
  myayavi.registerDomains = (domains) => {
    // Example usage:
    registerSimpleTags(domains);
    myayavi.registry.domains = {
      ...myayavi.registry.domains,
      ...domains,
    };
  };
  myayavi.registerPatterns = (patterns) => {
    registerSimpleTags(patterns);
    myayavi.registry.patterns = {
      ...myayavi.registry.patterns,
      ...patterns,
    };
  };

  // simple tags
  function registerSimpleTags(patterns) {
    const simpleTags = Object.entries(patterns)
      .map(([key, value]) => {
        try {
          const regEx = value instanceof RegExp ? value : new RegExp(value);
          if (key?.includes(":")) {
            return {
              test: (url) => RegExp(regEx).test(url),
              tags: generateCombinations(key) ?? [],
            };
          }
        } catch (e) {
          console.log("Myayavi: Error: registerSimpleTags: ", e.message);
        }
        return null;
      })
      .filter(Boolean);
    myayavi.registerTags(simpleTags);
  }

  function generateCombinations(str) {
    const pairs = str.split(":");

    const combinations = pairs.flatMap((value, index, array) =>
      array.slice(index + 1).map((nextValue) => `${value}:${nextValue}`)
    );

    return combinations;
  }
})(window);
