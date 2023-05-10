(() => {
  class MyvViewer {
    constructor(table) {
      if (MyvViewer.activeItem?.isOpen) {
        MyvViewer.activeItem.close();
      }
      this.isOpen = false;
      this.children = [];
      this.table = table ?? [];
      this.parent = document.getElementById("myv-viewer");
      this.node = document.getElementById("myv-table");
      // rows
      this.table.forEach((row) => {
        this.createRow(row);
      });
      this.show();
    }
    show = () => {
      this.parent.className = "";
      MyvViewer.activeItem = this;
      setTimeout(() => (this.isOpen = true), 200);
    };
    close = () => {
      this.parent.className = `myv-hide`;
      this.node.innerHTML = "";
      this.isOpen = false;
    };
    createRow = (cells) => {
      const row = new Row(cells);
      this.node.appendChild(row.node);
      row.node.scrollIntoView();
      row.parent = this;
      this.children.push(row);
      return row;
    };
  }
  MyvViewer.activeItem = null;
  window.myayavi.MyvViewer = MyvViewer;

  document.addEventListener("DOMContentLoaded", function () {});
  const closeButton = document.getElementById("myv-close");
  closeButton.addEventListener("click", function () {
    if (MyvViewer.activeItem?.isOpen) {
      MyvViewer.activeItem.close();
    }
  });

  class Row {
    constructor(cells) {
      this.parent = null;
      this.node = document.createElement("div");
      this.node.className = "myv-row";
      this.update(cells ?? []);
    }
    update = ([c1, c2, c3]) => {
      this.node.innerHTML = createCellsHtml([c1, c2, c3] ?? []);
      this.node.appendChild(createSpecialCell(c3));
      return this;
    };
  }

  function createCellsHtml([c1, c2, c3]) {
    return `<div class="myv-col ${
      c1 ? "myv-green" : c1 == null ? "" : "myv-red"
    }">${c1 ? "OK" : c1 == null ? "Loading.." : "NOT OK"}</div>
      <div class="myv-col">${c2.replaceAll("\n", "<br>")}</div>`;
  }
  function createSpecialCell(c3) {
    const cell = document.createElement("div");
    cell.className = "myv-col";

    function event(edit) {
      cell.innerHTML = "";

      const objectEle = createEditor(c3, edit);
      objectEle.addEventListener("dblclick", () => {
        const newObj = event(objectEle.tagName === "DIV");
      });

      cell.appendChild(objectEle);
      return objectEle;
    }
    event(false);
    return cell;
  }
  function createEditor(c3, edit) {
    const isObject = typeof c3 === "object";
    const objectEle = document.createElement(edit ? "textarea" : "div");
    try {
      objectEle.className = isObject ? "myv-col-json" : "";
      const value = isObject ? JSON.stringify(c3, null, 4) : c3;
      if (edit) {
        objectEle.tagName = "textarea";
        objectEle.value = value;
      } else {
        objectEle.tagName = "div";
        objectEle.innerHTML =
          value.length > 200000
            ? "Big Object! [edit]"
            : escapeHtml(value.toString()).replaceAll("\n", "<br>");
      }
    } catch (e) {
      console.log("error at createEditor:", e);
    }
    return objectEle;
  }
})();
