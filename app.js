//elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

//classes
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//variables
let LIST, id;

//get from local storage
let data = localStorage.getItem("ToDo");

//check data
if (data) {
  LIST = JSON.parse(data);
  id = LIST.length;
  loadList(LIST);
} else {
  LIST = [];
  id = 0;
}

//load items
function loadList(array) {
  array.array.forEach(function (item) {
    addToDo(item.name, item, id, item.done, item.trash);
  });
}

//clear localstorage
clear.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});

//date
const options = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options);

// ad to do
function addToDo(toDo) {
  if (toDo.trash) {
    return;
  }
  const DONE = toDo.done ? CHECK : UNCHECK;
  const LINE = toDo.done ? LINE_THROUGH : "";
  const item = ` <li class="item">
  <i class="fa ${DONE} co" job="complete" id="${id}"></i>
  <p class="text ${LINE}">${toDo}</p>
  <i class="fa fa-trashcan-ode" job="delete" id="${id}"></i>
  </li> 
                 
              `;
  const position = "beforeend";
  list.insertAdjacentHTML(position, item);
}

// enter key
document.addEventListener("keyup", function (event) {
  if (event.keyCode == 13) {
    const toDo = input.value;

    if (toDo) {
      addToDo(toDo, id, false, false);

      LIST.push({
        name: toDo,
        id: id,
        done: false,
        trash: false,
      });
      //add from local storage
      localStorage.setItem("ToDO", JSON.stringify(LIST));

      id++;
    }
    input.value = "";
  }
});

//complete
function completeToDo(element) {
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
  LIST[element.id].done = LIST[element.id].done ? false : true;
}

//remove
function removeToDo(element) {
  element.parentNode.parentNode.removechild(element.parentNode);
  LIST[element.id].trash = true;
}

//TARGET
list.addEventListener("click", function (event) {
  const element = event.target;
  const elementjob = element.getAttribute("job");

  if (elementjob == "complete") {
    completeToDo(element);
  } else if (elementjob == "delete") {
    this.removeToDo(element);
  }
  //add from local storage
  localStorage.setItem("ToDO", JSON.stringify(LIST));
});
