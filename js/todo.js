const input = document.querySelector('.todo-name');
const todoList = [];

function renderTodoList() {

    let todoListHTML = '';

    todoList.forEach((todo, i) => {
        const {
            name,
            dueDate
        } = todo;
        const html = `
        <div class="todo-item" id="todo-name"> ${name}</div>
        <div class="todo-item" id="todo-date"> ${dueDate}</div>
        <button class="todo-del inputs" 
        ">Delete</button> 
    `;
        todoListHTML += html;
    });

    document.querySelector('.todo-list').innerHTML = todoListHTML;

    document.querySelectorAll('.todo-del').forEach((button, i) => {
        button.addEventListener('click', () => {
            todoList.splice(i, 1);
            renderTodoList();
        });
    });
    
}


document.querySelector('.todo-add').addEventListener('click', addTodo);

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
        dueDate
    });

    input.value = '';
    renderTodoList();
}