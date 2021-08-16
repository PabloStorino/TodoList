//  selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//  event listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

//  Functions

function addTodo(event){
    //preventDefault para que no recargue la pagina al hacer click en el boton de submit
    event.preventDefault();

    if(todoInput.value != ""){
        // Creo el Div "todo"
        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo");
        // Creo el Li
        const newTodo = document.createElement('li');
        newTodo.innerText = todoInput.value;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);
        // Boton Checkmark
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        // Boton Trash
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        //Append a la lista
        todoList.appendChild(todoDiv);
        // Guardo en el localStorage
        saveLocalTodos(todoInput.value);

        //Borramos el todoInput
        todoInput.value = "";
    }
}

function deleteCheck(e){
    const item = e.target;

    // DELETE
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;

        todo.classList.add("eliminado");
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
    }

    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all": 
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = "none"
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = "none"
                }
                break;
        }
    });
}

function saveLocalTodos(todo){
    // Chequeo si ya tengo una lista guardada
    let todos;
    if (localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if (localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todo){
        // Creo el Div "todo"
        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo");
        // Creo el Li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);
        // Boton Checkmark
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        // Boton Trash
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        //Append a la lista
        todoList.appendChild(todoDiv);
    })
}

function removeLocalTodos(todo){
    let todos;
    if (localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex) , 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}