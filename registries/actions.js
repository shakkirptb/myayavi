window.myayavi.registerActions([
  {
    id: "open-crxde",
    label: "Open in crx de",
    action: (tab, url) => {
      const { origin } = new URL(url);
      const newUrl = `${origin}/crx/de/index.jsp#${getSuffixFromURL(url)}`;
      openNewTab(newUrl);
    },
    hide: ["aem:crxde"],
    show: ["app:aem", "role:dev"],
  },
  {
    id: "open-aem-config-mgr",
    label: "Open ConfigMgr",
    action: (tab, url) => {
      const { origin } = new URL(url);
      const newUrl = `${origin}/system/console/configMgr`;
      openNewTab(newUrl);
    },
    hide: ["aem:configmgr"],
    show: ["app:aem", "role:dev"],
  },
  {
    id: "open-aem-bundles",
    label: "Open Bundles Console",
    action: (tab, url) => {
      const { origin } = new URL(url);
      const newUrl = `${origin}/system/console/bundles`;
      openNewTab(newUrl);
    },
    hide: ["aem:bundles"],
    show: ["app:aem", "role:dev"],
  },
  {
    id: "open-dam",
    label: "Open Dam",
    action: (tab, url, tags) => {
      const templateUrl = getAEMUrTemplate(url, tags, "/content/dam");
      return openNewTab(templateUrl.replace("__EXPLORER__", "/assets.html"));
    },
    hide: ["aem:assets"],
    show: ["app:aem"],
  },
  {
    id: "open-sites",
    label: "Open Sites",
    action: (tab, url, tags) => {
      const templateUrl = getAEMUrTemplate(url, tags, "/content");
      return openNewTab(templateUrl.replace("__EXPLORER__", "/sites.html"));
    },
    hide: ["aem:sites"],
    show: ["app:aem"],
  },
  {
    id: "edit-aem",
    label: "edit item",
    action: (tab, url, tags, resourcePath, domain) => {
      const templateUrl = getAEMUrTemplate(
        url,
        tags,
        "/content",
        resourcePath,
        domain
      );
      return openNewTab(templateUrl.replace("__EXPLORER__", "/editor.html"));
    },
    hide: ["aem:edit"],
    show: ["app:aem"],
  },
  {
    id: "show-in-aem",
    label: "Show in AEM",
    action: (tab, url, tags) => {
      const templateUrl = getAEMUrTemplate(url, tags);
      if (tags.includes("path:xf")) {
        return openNewTab(
          templateUrl.replace("__EXPLORER__", "/aem/experience-fragments.html")
        );
      }
      if (tags.includes("path:dam")) {
        return openNewTab(templateUrl.replace("__EXPLORER__", "/assets.html"));
      }
      return openNewTab(templateUrl.replace("__EXPLORER__", "/sites.html"));
    },
    hide: ["aem:dam", "aem:sites", "aem:assets", "aem:xf"],
    show: ["app:aem"],
  },
]);

//---------------
function getAction(actionId) {
  return myayavi.registry.actions.find(({ id }) => id === actionId);
}
async function invokeAction(actionId, tab, url, tags) {
  const action = getAction(actionId);
  return action?.action(tab, url, tags);
}
function isPopup(tab) {
  return tab !== window;
}

function chooseAuthorDomain(tags, specialTags) {
  const env =
    tags.find((tag) => tag.startsWith("env:"))?.replace("env:", "") ?? "local";
  const key = Object.keys(window.myayavi.registry.domains).find((key) =>
    [env, ...(specialTags ?? ["aem"]), "author"].every((item) =>
      key.includes(item)
    )
  );
  return window.myayavi.registry.domains[key];
}
// AEM
function getAEMUrTemplate(url, tags, defaultPath, suffix, domain) {
  const fallback = defaultPath ?? "/content";
  const contentPath = suffix ?? getSuffixFromURL(url) ?? fallback;
  const origin =
    domain ??
    (tags.includes("app:aem")
      ? new URL(url).origin
      : myayavi.registry.domains["local:aem:author"]); // TODO: select domain  from "app:headless" group
  return `${origin}__EXPLORER__${
    contentPath.startsWith(fallback) ? contentPath : fallback
  }`;
}

async function parseJson(str) {
  try {
    return JSON.parse(str);
  } catch (e) {
    console.log("error parsing json", e.message);
  }
  return undefined;
}
async function fetchJson(url) {
  try {
    const response = await fetch(url);
    return response.json();
  } catch (e) {
    return undefined;
  }
}
const escapeHtml = (unsafe) => {
  return unsafe
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
};
