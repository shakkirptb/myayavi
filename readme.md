# Myayavi

"Myayavi" is a browser extension designed to streamline repetitive actions on any website. It presents a set of actions tailored to the website's scope and enables developers, testers, content authors, and anyone who frequently performs repetitive tasks to automate or shortcut them.

The extension's name "Myayavi" is derived from a character in a Malayalam comedy movie, meaning "genie" or "a spirit with only good intentions."

## Key Features

- The extension includes several generic actions, with the option to add more actions as needed.
- It features an in-site assistant (Myayavi) and a popup.
- Actions can be registered with tags, and each entry in the tags registry has the following structure:

  ```javascript
  window.myayavi.registerTags([
    {
      test: (url) => RegExp("^http://localhost:4502").test(url),
      tags: ["app:aem", "aem:author", "role:dev"],
    },
    // ...
  ]);
  ```

  Tags from the registry are evaluated for each website via the "test" function, and actions are displayed accordingly.

- Actions can be registered as follows:

  ```javascript
  window.myayavi.registerActions([
    {
      id: "open-crxde",
      label: "Open in CRX DE",
      action: (tab, url) => {
        const { origin } = new URL(url);
        const newUrl = `${origin}/crx/de/index.jsp#${getSuffixFromURL(url)}`;
        openNewTab(newUrl);
      },
      hide: ["aem:crxde"],
      show: ["app:aem", "role:dev"],
    },
    // ...
  ]);
  ```

  The "id" and "label" properties are used to display an action button in the popup or assistant list. The "action" property defines the action to be performed. The "hide" property specifies tags to hide the action, and the "show" property specifies tags to show the action. Each action is available if any of their "show" tags match the filtered tags for the website and none of the "hide" tags match.

## Additional features
- The extension also enables the registration of regular expressions in the pattern registry for reuse. If the key looks like a tag (has ":" in it), it will be added to the tags registry to avoid extra work.

  ```javascript
  window.myayavi.registerPatterns({
    "path:asset": RegExp("(/content/dam).*(\\.)"),
    "path:content": RegExp("(/content/).*"),
    // ...
  });
  ```

- There is also a domain registry where frequently used reusable site domains can be registered:

  ```javascript
  window.myayavi.registerDomains({
    "local-aem": "http://localhost:4502",
    // ...
  });
  ```

## Contribution

If you would like to contribute to the development of Myayavi, please feel free to submit a pull request or open an issue on the [Github repository](https://github.com/yourusername/myayavi).
