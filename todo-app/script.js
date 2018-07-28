const todos = [
    "hello", "bike", "lunch with friend"
]

let input = document.querySelector("input");
let addBtn = document.querySelector(".add-button");
let listContainter = document.querySelector(".todo-list")

let render = function() {
    listContainter.innerHTML = "";
    todos.forEach(todo => {
        addTodoBtn(todo);
    })
}

let addTodoBtn = function(txt) {
    let newBtn = document.createElement("button");
    newBtn.innerText = txt;
    newBtn.classList.add('todo-button');
    newBtn.addEventListener('click', function() {
        for(let i=0; i<todos.length; i++) {
            if (todos[i] === txt) {
                todos[i] = "*** DONE ***"; 
                render();
                break;
            }
        }
    });
    listContainter.appendChild(newBtn);
}

//---------------------------------------

render();