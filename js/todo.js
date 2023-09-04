const input = document.querySelector('.todo-name');
const todoList = JSON.parse(localStorage.getItem('todoList')) || [];

if (todoList.length > 0) {
    renderTodoList();
}

function todoUpdate() {
    localStorage.setItem('todoList', JSON.stringify(todoList));
}

function renderTodoList() {

    let todoListHTML = '';

    todoList.forEach((todo, i) => {
        const {
            name,
            dueDate,
            status
        } = todo;
        const html = `
        <div class="todo-status-name">
            <button class="todo-status inputs ${status}"> 
            </button> 
            <div class="todo-item" id="todo-name"> ${name}</div>
        </div>

        <div class="todo-item" id="todo-date"> ${dueDate}</div>
        
        <button class="todo-del inputs"> 
            <img class="todo-trash-icon" src="icons/trash.png">
        </button> 
        
    `;
        todoListHTML += html;
    });

    document.querySelector('.todo-list').innerHTML = todoListHTML;

    document.querySelectorAll('.todo-del').forEach((button, i) => {
        button.addEventListener('click', () => {
            todoList.splice(i, 1);
            todoUpdate();
            renderTodoList();
        });
    });

    document.querySelectorAll('.todo-status').forEach((button, i) => { 
        let clickCount = 1;
        button.addEventListener('mousedown', () => {
            clickCount++;
            switch (clickCount%3) {
                case 1:
                    button.classList.add('todo-status-not-started');
                    button.classList.remove('todo-status-completed');
                    todoUpdate();
                    break;
                case 2:
                    button.classList.add('todo-status-in-progress');
                    button.classList.remove('todo-status-not-started');
                    todoList[i].status = 'todo-status-in-progress'; 
                    todoUpdate();
                    break;
                case 0:
                    button.classList.add('todo-status-completed');
                    button.classList.remove('todo-status-in-progress');
                    todoList[i].status = 'todo-status-completed'; 
                    todoUpdate();
                    break;
            }
        });
    });
}
 
document.querySelector('.todo-add').addEventListener('click', addTodo);
document.querySelector('.todo-name').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      addTodo();
    }
  });
  

function addTodo() {

    if (input.value === '') {
        return;
    }

    const nameInput = document.querySelector('.todo-name');
    const name = nameInput.value;

    const dateInput = document.querySelector('.todo-date');
    const dueDate = dateInput.value;

    todoList.push({
        name,
        dueDate,
        status: 'todo-status-not-started'
    });

    todoUpdate();

    input.value = '';
    renderTodoList();
}