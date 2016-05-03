/* Test Cases for Model Operations */
window.onload = function() {
    var model = new ToDoModel();
    var deleteAll = document.getElementsByClassName("deleteall")[0];
    var createTodo = document.getElementsByClassName("createtodo")[0];
    var deleteTodo = document.getElementsByClassName("deletetodo")[0];
    var markComplete = document.getElementsByClassName("markcomplete")[0];
    var editTodo = document.getElementsByClassName("edittodo")[0];
    var clearComplete = document.getElementsByClassName("clearcomplete")[0];

    model.deleteAll();
    if (model.todos.length != 0) {
        deleteAll.innerHTML = "Delete All Test Failed!";
    } else {
        deleteAll.innerHTML = "Delete All Test Succeeded!";
    }

    var todos = ["Need to go to gym", "Cook", "Clean", "Go to work", "ComeBack"];
    for (var i = 0; i < todos.length; i++) {
        model.createToDos(todos[i]);
    }
    if (model.todos.length != 5) {
        createTodo.innerHTML = "Creating new todos test Failed!";
    } else {
        createTodo.innerHTML = "Creating new todos test Succeeded!";
    }

    model.deleteToDo(1);
    if (model.todos.length == 5) {
        deleteTodo.innerHTML = "Delete todo test Failed!";
    } else {
        deleteTodo.innerHTML = "Delete todo test Succeeded!";
    }

    model.markToDoComplete(3);
    if (!model.todos[3].complete) {
        markComplete.innerHTML = "Mark todo complete test Failed!";
    } else {
        markComplete.innerHTML = "Mark todo complete test Succeeded!";
    }

    model.editToDo("I am edited", 0)
    if (model.todos[0].text != "I am edited") {
        editTodo.innerHTML = "Edit todo test Failed!";
    } else {
        editTodo.innerHTML = "Edit todo test Succeeded!";
    }

    model.clearComplete();
    if (model.todos.length !== 3) {
        clearComplete.innerHTML = "Clear completed test Failed!";
    } else {
        clearComplete.innerHTML = "Clear completed test Succeeded!";
    }
}