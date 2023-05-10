(() => {
  window.popupOpen = false;
  let popup = null;
  document.addEventListener("DOMContentLoaded", function () {});
  document.addEventListener("click", function () {
    if (window.popupOpen) {
      hidePopup(popup);
    }
  });

  // popup

  window.closePopup = (popupContainer) => {
    hidePopup(popupContainer);
  };
  window.openMyDPopup = async (tab, popupContainer, tags, x, y) => {
    await createPopup(tab, popupContainer, tags);
    showPopup(popupContainer, x, y);
  };
  async function createPopup(tab, popupContainer, tags) {
    console.log("tags", tags);
    const url = await getUrl(tab);
    if (!tags?.length) {
      popupContainer.innerHTML = "nothing here..";
      return;
    }
    //tags
    const tagContainer = document.getElementById("myv-tags-container");
    if (tagContainer) {
      document.getElementById("myv-tags-container").innerHTML = tags.reduce(
        (acc, tag) => {
          return acc + `<span>${tag}</span>`;
        },
        ""
      );
    }
    const availableActions = myayavi.registry.actions.filter(
      (action) =>
        myayavi.isAvailableForRole(action?.show ?? []) &&
        (action?.show ?? []).some((item) => tags.some((tag) => item === tag)) &&
        (!action?.hide ||
          !(action.hide ?? []).some((item) => tags.some((tag) => item === tag)))
    );
    console.log("availableActions", availableActions);
    if (!availableActions?.length) {
      popupContainer.innerHTML = "No actions here..";
      return;
    }
    const popupItems = availableActions.reduce((acc, action) => {
      return acc + `<li><a href="#" id="${action.id}">${action.label}</a></li>`;
    }, "");
    popupContainer.innerHTML = popupItems;

    availableActions.forEach((action) => {
      document.getElementById(action.id).addEventListener("click", function () {
        action.action(tab, url, tags);
      });
    });
  }
  function showPopup(popupContainer, element) {
    popupContainer.className = "";

    var position = element.getBoundingClientRect();
    var x = position.left;
    var y = position.top;
    var w = position.width;
    var h = position.height;
    var popPos = popupContainer.getBoundingClientRect();
    var pow = popPos.width;
    var poh = popPos.height;

    const newx = x - pow;
    const newy = y - poh;

    popupContainer.style.left = (newx < 0 ? w : newx) + "px";
    popupContainer.style.top = (newy < 0 ? h : newy) + "px";

    popup = popupContainer;
    setTimeout(() => (window.popupOpen = true), 200);
  }
  function hidePopup(popupContainer) {
    popupContainer.className = "myv-hide";
    popupContainer.innerHTML = "";
    window.popupOpen = false;
  }
})();
