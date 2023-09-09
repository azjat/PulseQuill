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
            clickCount
        } = todo;

        switch (clickCount) {
            case 1:
                var clicks = 'todo-status-not-started';
                break;
            case 2:
                var clicks = 'todo-status-in-progress';
                break;
            case 3:
                var clicks = 'todo-status-completed';
                break;
        }

        const html = `
        <div class="todo-status-name">
            <button class="todo-status inputs ${clicks}"> 
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
        let clickCount = todoList[i].clickCount;
        button.addEventListener('mousedown', () => {
            if (clickCount > 2) {
                clickCount = 1;
            } else {
                clickCount++;
            }
            
            todoList[i].clickCount = clickCount;
            switch (clickCount) {
                case 1:
                    button.classList.add('todo-status-not-started');
                    button.classList.remove('todo-status-completed');
                    button.classList.remove('todo-status-in-progress');

                    todoUpdate();
                    break;
                case 2:
                    button.classList.add('todo-status-in-progress');
                    button.classList.remove('todo-status-not-started');
                    button.classList.remove('todo-status-completed');

                    todoUpdate();
                    break;
                case 3:
                    button.classList.add('todo-status-completed');
                    button.classList.remove('todo-status-in-progress');
                    button.classList.remove('todo-status-not-started');

                    todoUpdate();
                    break;
            }
        });
    });
}

document.querySelector('.todo-add').addEventListener('click', addTodo);
document.querySelector('.todo-name').addEventListener('keydown', function (event) {
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
        clickCount: 1
    });

    todoUpdate();

    input.value = '';
    renderTodoList();
}