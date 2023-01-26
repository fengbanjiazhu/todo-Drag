const addBtns = document.querySelectorAll(".add-btn:not(.solid)");
const saveItemBtns = document.querySelectorAll(".solid");
const addItemContainers = document.querySelectorAll(".add-container");
const addItems = document.querySelectorAll(".add-item");

const listContainer = document.querySelector(".drag-list");
// Item Lists
const listColumn = document.querySelectorAll(".drag-item-list");
const backlogList = document.getElementById("backlog-list");
const progressList = document.getElementById("progress-list");
const completeList = document.getElementById("complete-list");
const onHoldList = document.getElementById("on-hold-list");

// Items
let updatedOnLoad = false;

// Initialize Arrays
let backlogListArray = [];
let progressListArray = [];
let completeListArray = [];
let onHoldListArray = [];
let listArrays = [];

// Drag Functionality
let draggedItem;
let dragging = false;
let currentColumn;

// Get Arrays from localStorage if available, set default values if not
function getSavedColumns() {
  if (localStorage.getItem("backlogItems")) {
    backlogListArray = JSON.parse(localStorage.backlogItems);
    progressListArray = JSON.parse(localStorage.progressItems);
    completeListArray = JSON.parse(localStorage.completeItems);
    onHoldListArray = JSON.parse(localStorage.onHoldItems);
  } else {
    backlogListArray = ["To do list", "Click to edit"];
    progressListArray = ["Click Add to add more", "Listen to music"];
    completeListArray = ["remember to Drag & Drop", "Getting stuff done"];
    onHoldListArray = ["Delete content to clear a task"];
  }
}

// Set localStorage Arrays
function updateSavedColumns() {
  listArrays = [backlogListArray, progressListArray, completeListArray, onHoldListArray];
  const arrayNames = ["backlog", "progress", "complete", "onHold"];
  listArrays.forEach((el, index) => {
    localStorage.setItem(`${arrayNames[index]}Items`, JSON.stringify(el));
  });
}

// Create DOM Elements for each list item
function createItemEl(columnEl, column, item, index) {
  // List Item
  const listEl = `<li class="drag-item" id = ${index} draggable = "true" ondragstart = "drag(event)" contenteditable="true" onfocusout = "updateItem(${index},${column})">${item}</li>`;
  columnEl.insertAdjacentHTML("beforeend", listEl);
}

// Update Columns in DOM - Reset HTML, Filter Array, Update localStorage
function updateDOM() {
  // Check localStorage
  if (!updatedOnLoad) getSavedColumns();

  // Backlog Column
  backlogList.textContent = "";
  backlogListArray.forEach((backlogItems, index) => {
    createItemEl(backlogList, 0, backlogItems, index);
  });

  // Progress Column
  progressList.textContent = "";
  progressListArray.forEach((progressItems, index) => {
    createItemEl(progressList, 1, progressItems, index);
  });

  // Complete Column
  completeList.textContent = "";
  completeListArray.forEach((completeItems, index) => {
    createItemEl(completeList, 2, completeItems, index);
  });

  // On Hold Column
  onHoldList.textContent = "";
  onHoldListArray.forEach((onHoldItems, index) => {
    createItemEl(onHoldList, 3, onHoldItems, index);
  });

  // set updatedOnLoad to true
  // make sure that getSavedColumns only runs once,
  updatedOnLoad = true;
  // Update Local Storage
  updateSavedColumns();
}

// update Item
const updateItem = function (id, column) {
  const selectedArr = listArrays[column];
  const selectedColumnEl = listColumn[column].children[id].textContent;
  if (!dragging) {
    if (!selectedColumnEl) {
      selectedArr.splice(id, 1);
    } else {
      selectedArr[id] = selectedColumnEl;
    }
    updateDOM();
  }
};

// Add to column list
const addToColumn = function (column) {
  const text = addItems[column].textContent;
  if (text === "") return;
  const selectedArr = listArrays[column];
  selectedArr.push(text);
  addItems[column].textContent = "";
  updateDOM();
};

// show input area
const showInputArea = function (column) {
  addBtns[column].style.visibility = "hidden";
  saveItemBtns[column].style.display = "flex";
  addItemContainers[column].style.display = "flex";
};

const hideInputArea = function (column) {
  addBtns[column].style.visibility = "visible";
  saveItemBtns[column].style.display = "none";
  addItemContainers[column].style.display = "none";
  addToColumn(column);
};

const updateArrays = function () {
  backlogListArray = [...backlogList.children].map((el) => el.textContent);
  progressListArray = [...progressList.children].map((el) => el.textContent);
  completeListArray = [...completeList.children].map((el) => el.textContent);
  onHoldListArray = [...onHoldList.children].map((el) => el.textContent);

  updateDOM();
};

// drag and drop

// dragging functions
const drag = function (e) {
  draggedItem = e.target;
  dragging = true;
};

// allows dropping
const allowDrop = function (e) {
  e.preventDefault();
};

// dropping function
const drop = function (e) {
  e.preventDefault();
  // remove background color
  listColumn.forEach((column) => {
    column.classList.remove("over");
  });
  // add item to column
  const parentEl = listColumn[currentColumn];
  parentEl.insertAdjacentElement("beforeend", draggedItem);
  dragging = false;
  updateArrays();
};

// Item Enters Column Area
const dragEnter = function (column) {
  listColumn[column].classList.add("over");
  currentColumn = column;
};

const dragLeave = function (column) {
  listColumn[column].classList.remove("over");
};

updateDOM();
