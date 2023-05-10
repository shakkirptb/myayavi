// import {myayavi.registry.actions} from '../registries/actions';
// import {myayavi.registry.patterns} from '../registries/patterns';
// import {myayavi.registry.tags} from '../registries/tags';

document.addEventListener("DOMContentLoaded", async function () {
  const currentTab = await getCurrentTab();
  //currentTab.url = decodeURIComponent(currentTab.url);
  const tags = await getTags(currentTab);
  console.log("tags", tags);
  const popupContainer = document.getElementById("myv-popup-container");
  await openMyDPopup(currentTab, popupContainer, tags);
});
