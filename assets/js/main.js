const URL = "http://localhost:3003/todos/";
const listTodo = document.querySelector(".listTodo");

// Getting Datas to show in List

const showAllDatas = () => {
  axios(URL).then(({ data }) => {
    data.forEach(({ id, name, description, isCompleted }) => {
      listTodo.innerHTML += `
            <li class="${isCompleted ? "checkedTodo" : ""}">
            <div class="listTodo-item">
              <div class="left">
                <h6 class="todoName">${name}</h6>
                <a class="expandToDetail" type="button">
                  <img src="./assets/icons/chevron-down.svg" onclick="expand(${id})" />
                </a>
              </div>
              <div class="right">
                <input type="checkbox" onchange="check(event,${id})" ${
        isCompleted ? "checked" : ""
      } />
                <a type="button" class="editTodo" onclick="editTodo(${id})">
                  <img src="./assets/icons/ci_edit.svg" />
                </a>
                <a type="button" class="deleteTodo"  onclick="deleteTodo(${id})">
                  <img src="./assets/icons/fluent_delete-24-filled.svg" />
                </a>
              </div>
            </div>
            <div class="listTodo-item details">
              <p>${description}</p>
            </div>
          </li>
            `;
    });
  });
};

showAllDatas();
const successAlert = document.querySelector(".success");
const check = (e, todoId) => {
  axios.patch(URL + todoId, { isCompleted: e.target.checked });
  successAlert.style.display = "flex";
};

const nameInput = document.getElementById("nameInput");
const descriptionInput = document.getElementById("descriptionInput");
const addTodo = document.querySelector(".addTodo");

const infoAlert = document.querySelector(".info");
const errorAlert = document.querySelector(".error");
const canvas = document.querySelector("#my-canvas");
console.log(errorAlert);

addTodo.addEventListener("submit", (e) => {
  e.preventDefault();
  const todoName = nameInput.value;
  const todoDescription = descriptionInput.value;
  if (todoName && todoDescription) {
    axios
      .post(URL, {
        name: todoName,
        description: todoDescription,
        isComplated: false,
      })
      .then((res) => {
        infoAlert.style.transform = "translateX(0)";
      });
  } else {
    errorAlert.style.transform = "translateX(0)";
  }
});

const editTodo = (id) => {
  axios(URL + id).then(({ data }) => {
    console.log(data.name);
    const newTodoName = prompt("Enter New Title of ToDo task:", data.name);
    const newTodoDesc = prompt(
      "Enter New Description of ToDo task:",
      data.description
    );

    if (newTodoName && newTodoDesc) {
      axios.put(URL + id, {
        ...data,
        name: newTodoName,
        description: newTodoDesc,
      });
    } else {
      errorAlert.style.transform = "translateX(160%)";
    }
  });
};

const deleteTodo = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      axios.delete(URL + id).then(() => {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      });
    }
  });
};

const content = document.querySelector(".content");
const loader = document.querySelector(".loader");
setTimeout(() => {
  loader.style.display = "none";
  content.style.display = "flex";
}, 4000);
const btn = document.querySelectorAll(".alert .btn");
btn.forEach((buttons) => {
  buttons.addEventListener("click", (e) => {
    e.preventDefault();
    errorAlert.style.display = "none";
    successAlert.style.display = "none";
    infoAlert.style.display = "none";
  });
});
