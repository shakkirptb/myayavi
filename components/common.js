async function getCurrentTab() {
  if (chrome?.tabs) {
    return new Promise((resolve) => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        console.log(tabs[0].url);
        resolve(tabs[0]);
      });
    });
  }
  return window;
}

function getAssetPath(url) {
  const matches = myayavi.registry.patterns["path:asset"].exec(url);
  if (!matches?.length) {
    return null;
  }
  const [_beforeDot, afterDot] = url.split(matches[0]);
  const extension = afterDot.split("#")[0].split("/")[0];
  return `${matches[0]}${extension}`;
}
function getSuffixFromURL(url) {
  const { pathname, hash } = new URL(url);
  const [_resourceName, extAndSuffix, ...rest] = (
    `${pathname}${hash}` ?? "."
  ).split(".");
  const index = extAndSuffix?.indexOf("/");
  if (index > -1) {
    // extract the part of the path after the last slash
    return `${extAndSuffix.substring(index)}${
      rest?.length ? "." : ""
    }${rest.join(".")}`;
  }
  // if there is no slash in the path, return the whole path
  return "";
}

async function getUrl(currentTab) {
  return decodeURIComponent(
    currentTab === window
      ? window.location.href
      : (currentTab ?? (await getCurrentTab())).url
  );
}
async function getTags(currentTab) {
  const url = await getUrl(currentTab);
  const tags = [];
  myayavi.registry.tags.forEach((item) => {
    if (myayavi.isAvailableForRole(item.tags) && item.test(url, currentTab)) {
      tags.push(...item.tags);
    }
  });
  return [...new Set(tags)];
}
async function openNewTab(url) {
  const tab = await getCurrentTab();
  if (tab === window) {
    return window.open(url, "_blank");
  }
  return chrome.tabs.create({
    url: url,
    index: tab.index + 1,
    active: true,
  });
}

function getSize(rsp) {
  return (typeof rsp === "object" ? JSON.stringify(rsp) : rsp).length;
}
