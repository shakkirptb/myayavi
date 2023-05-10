// content_script.js
(() => {
  console.log("Myayavi..");
  // Create the info icon element

  const icon = document.getElementById("myv-assistant-icon");

  let position = 1;
  setPosition(
    parseInt(window.localStorage.getItem("myv-assistant-position") ?? 1)
  );

  // Add a click event listener to the icon
  let clickCount = 0;

  icon.addEventListener("click", async () => {
    !clickCount && setTimeout(() => (clickCount = 0), 1000);
    clickCount++;
    switch (clickCount) {
      case 3:
        setPosition(position + 1);
        break;
      case 2:
        // enable page actions
        break;
      case 1:
        const popupContainer = document.getElementById("myv-popup-container");
        window.closePopup(popupContainer);
        // open popup
        const tags = await getTags(window);

        await openMyDPopup(window, popupContainer, tags, icon);
        break;
    }
  });

  function setPosition(pos) {
    const marginX = "20px";
    const marginY = "20px";

    pos = pos > 3 ? 0 : pos;
    if (pos === 0 || pos === 1) {
      icon.style.right = marginX;
      icon.style.left = "auto";
    }
    if (pos === 2 || pos === 3) {
      icon.style.left = marginX;
      icon.style.right = "auto";
    }
    if (pos === 0 || pos === 3) {
      icon.style.top = marginY;
      icon.style.bottom = "auto";
    }
    if (pos === 1 || pos === 2) {
      icon.style.bottom = marginY;
      icon.style.top = "auto";
    }
    window.localStorage.setItem("myv-assistant-position", pos);
    position = pos;
    return pos;
  }
})();
