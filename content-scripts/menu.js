(() => {
  // myv container
  const mydBody = document.createElement("div");
  mydBody.id = "myv-body";
  mydBody.innerHTML = `

  <ul id="myv-popup-container" class="myv-hide"></ul>
  <div id="myv-viewer" class="myv-hide">
    <div id="myv-table" class="myv-table"></div>
    <button id="myv-close" class="myv-close">x</button>
  </div>
  <div id="myv-assistant-icon">${coolDogSvg}</div>
  
  `.trim();
  document.body.appendChild(mydBody);
})();
