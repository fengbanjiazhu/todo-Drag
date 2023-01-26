export default function templateBox(header, column) {
  return `
  <li class="drag-column ${header}-column">
    <span class="header">
      <h1>${header}</h1>
    </span>
    <div id="${header}-content" class="custom-scroll">
      <ul
        class="drag-item-list"
        id="${header}-list"
        ondrop="drop(event)"
        ondragover="allowDrop(event)"
        ondragenter="dragEnter(${column})"
        ondragleave="dragLeave(${column})"
      ></ul>
    </div>
    <div class="add-btn-group">
      <div class="add-btn" onclick="showInputArea(${column})">
        <span class="plus-sign">+</span>
        <span>Add Item</span>
      </div>
      <div class="add-btn solid" onclick="hideInputArea(${column})">
        <span>Save Item</span>
      </div>
    </div>
    <div class="add-container">
      <div class="add-item" contenteditable="true"></div>
    </div>
  </li>;`;
}

// console.log(templateBox);
// const onHold = templateBox("on-hold", 3);
// console.log(onHold);
// listContainer.insertAdjacentHTML("beforeend", onHold);
