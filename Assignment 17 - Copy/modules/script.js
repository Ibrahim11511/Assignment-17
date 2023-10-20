const addTodoBar = document.querySelector('.add-todo-bar');
const creat = document.querySelector('.creat');
const taskContainer = document.querySelector('.task-container');
const allBtn = document.querySelector('.all-btn');
const todoBtn = document.querySelector('.todo-btn');
const completedBtn = document.querySelector('.completed-btn');
const border = document.querySelector('.border');
let buttonOfTask;

allBtn.style.color = '#0093e9'

let arrayOfTasks = [];

function formatAMPM(date) {
    const dateNow = new Date();
    let day = dateNow.getDay();
    let month = dateNow.getMonth();
    let year = dateNow.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let amorpm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let strTime = `${hours}:${minutes}:${seconds}  ${amorpm}, ${day}/${+month + 1}/${year}`;
    return strTime;
}

function getDataFromLocalSorageAtStartOfPage() {
    if (localStorage.todo != null) {
        arrayOfTasks = JSON.parse(localStorage.todo);
        addTodoToPage(arrayOfTasks);
    }
}
getDataFromLocalSorageAtStartOfPage();



creat.addEventListener('click', () => {
    addTodoToArray();
    addTodoToPage(arrayOfTasks);
    addTodoToLocalStorage(arrayOfTasks);
    clearDataFromBar();
})

function addTodoToArray() {
    if (addTodoBar.value != '') {
        let newTodo = {
            id: Date.now(),
            title: addTodoBar.value,
            createAt: formatAMPM(new Date),
            completed: false,
        }
        arrayOfTasks.push(newTodo);
    }
}

function addTodoToLocalStorage(todo) {
    localStorage.setItem('todo', JSON.stringify(todo));
}

function clearDataFromBar() {
    addTodoBar.value = ''
}

function addTodoToPage(array) {
    taskContainer.innerHTML = '';
    array.forEach((todo) => {
        taskContainer.innerHTML +=
            `
                <div class="task">
                    <p class="task-info">${todo.title}</p>
                    <div class="date-and-time">${todo.createAt}</div>
                    <button class="button-of-task"></button>
                </div>
            `
    })
}
buttonOfTask = document.querySelectorAll('.button-of-task');

function ckeckBottuns(array) {
    array.forEach((btn, idx) => {
        if (btn.completed == true) {
            buttonOfTask[idx].className = "button-of-task done-task";
        }
        else if (btn.completed == false) {
            buttonOfTask[idx].className = "button-of-task";
        }
    })
}
ckeckBottuns(arrayOfTasks);

allBtn.addEventListener('click', () => {
    addTodoToPage(arrayOfTasks);
    todoBtn.style.color = '#000';
    completedBtn.style.color = '#000';
    border.style.left = '20px';
    allBtn.style.color = '#0093e9';
})

todoBtn.addEventListener('click', () => {
    let completedTaskes = arrayOfTasks.filter(function (el) {
        return el.completed === false;
    })
    addTodoToPage(completedTaskes);
    
    allBtn.style.color = '#000';
    completedBtn.style.color = '#000';
    todoBtn.style.color = '#0093e9';
    border.style.left = '135px';
})

completedBtn.addEventListener('click', () => {
    let notCompletedTaskes = arrayOfTasks.filter(function (el) {
        return el.completed === true;
    })
    addTodoToPage(notCompletedTaskes);
    allBtn.style.color = '#000';
    completedBtn.style.color = '#0093e9';
    todoBtn.style.color = '#000';
    border.style.left = '278px';
})

buttonOfTask.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
        if (arrayOfTasks[idx].completed == false) {
            btn.classList.add('done-task');
            arrayOfTasks[idx].completed = true;
            addTodoToLocalStorage(arrayOfTasks);
        }
        else if (arrayOfTasks[idx].completed == true) {
            btn.classList.remove('done-task');
            arrayOfTasks[idx].completed = false;
            addTodoToLocalStorage(arrayOfTasks);
        }
    })
})

////////////////////////////////////////////////////////////////////////////////
// `
// <div class="task">
//     <p class="task-info">sfsfsdf</p>
//     <div class="date-and-time">12:30 pm</div>
//     <button class="checkbox"></button>
// </div>
// `
////////////////////////////////////////////////////////////////////////////////
// let masterDiv = document.createElement('div');
// masterDiv.className = 'task';
// masterDiv.setAttribute('data-id', todo.id);
// let text = document.createElement('p');
// text.className = 'task-info';
// text.appendChild(document.createTextNode(todo.title))
// masterDiv.appendChild(text);
// let div = document.createElement('div');
// div.className = 'data-and-time';
// div.appendChild(document.createTextNode(todo.createdAt));
// masterDiv.appendChild(div);
// let button = document.createElement('button');
// button.className = 'not-done';
// notDone = document.querySelectorAll('.not-done');
// masterDiv.appendChild(button);
// taskContainer.appendChild(masterDiv);