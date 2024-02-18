let addMessage = document.querySelector('.message'),
    addButton= document.querySelector('.add'),
    todo = document.querySelector('.todo');

let todoList = [];

if(localStorage.getItem('todo')) {
    todoList = JSON.parse(localStorage.getItem('todo'));
    displayMessages();
}

addButton.addEventListener("click", function() {
    if (!addMessage.value) return;
    let newTodo = {
        todo: addMessage.value,
        checked: false,
        important: false
    };

    todoList.push(newTodo);
    displayMessages();
    localStorage.setItem('todo', JSON.stringify(todoList));
    addMessage.value = '';
});

function displayMessages() {
    let displayMessage = '';
    if (todoList.length === 0) todo.innerHTML = '';
    todoList.forEach(function(item, i) {
        displayMessage += `
        <li>
            <input type='checkbox' id='item_${i}' ${item.checked ? 'checked' : ''}>
            <label for='item_${i}' class='${item.important ? 'important' : ''}'>${item.todo}</label>
        </li>
        `;

        todo.innerHTML = displayMessage;
    });
}

todo.addEventListener('change', function(event) {
    let valueLabel = todo.querySelector('[for='+ event.target.getAttribute('id') +']').innerHTML;
    console.log('valueLabel: ', valueLabel);

    todoList.forEach(function(item) {
        if (item.todo === valueLabel) {
            item.checked = !item.checked;
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    });

});

todo.addEventListener('contextmenu', function(event) {
    event.preventDefault();
    todoList.forEach(function(item, i) {
        if (item.todo === event.target.innerHTML) {
            if (event.ctrlKey || event.metaKey) {
                todoList.splice(i, 1);
            } else {
                item.important = !item.important;
            }
            displayMessages();
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    });
});