window.myayavi.registerDomains({
  //Domains
  "env:local": "http://localhost",
  "local:aem:author": "http://localhost:4502",
  // aem
  "app:aem:configmgr": "/system/console/configMgr",
  "app:aem:bundles": "/system/console/bundles",
});
window.myayavi.registerPatterns({
  "path:asset": RegExp("(/content/dam).*(\\.)"),
  "path:content": RegExp("(/content/).*"),
  "path:dam": RegExp("(/content/dam).*"),
  "path:xf": RegExp("(/content/experience-fragments).*"),
  "app:aem:crxde": RegExp("/crx/de/index.jsp"),
  "app:aem:assetdetails": RegExp("/assetdetails.html/"),
  "app:aem:dam": RegExp("/assets.html/"),
  "app:aem:sites": RegExp("(/sites.html)(/.*)"),
  "app:aem:xf": RegExp("(/aem/experience-fragments.html)(/.*)"),
  "app:aem:start": RegExp("/aem/start.html"),
});
