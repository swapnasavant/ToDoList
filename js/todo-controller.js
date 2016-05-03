/* Controller : WIll call the model method based on
   user-input on the view. 
   Will attach/subscribe to the view events as well as model events.
 */
function ToDoController(model, view) {
    this.todomodel = model;
    this.todoview = view;

    this.todoview.addTodoEvent.attachHandler(this.addTodo.bind(this));

    this.todoview.deleteAllEvent.attachHandler(this.deleteAll.bind(this));

    this.todoview.clearCompletedEvent.attachHandler(this.clearCompleted.bind(this));

    this.todoview.deleteToDoEvent.attachHandler(this.deleteToDo.bind(this));

    this.todoview.completeToDoEvent.attachHandler(this.completeToDo.bind(this));

    this.todoview.editToDoEvent.attachHandler(this.editToDo.bind(this));

    this.todomodel.refreshEvent.attachHandler(this.refreshView.bind(this));

}

ToDoController.prototype.addTodo = function(todoText) {
    this.todomodel.createToDos(todoText);
}
ToDoController.prototype.deleteAll = function() {
    this.todomodel.deleteAll();
}
ToDoController.prototype.clearCompleted = function() {
    this.todomodel.clearComplete();
}
ToDoController.prototype.deleteToDo = function(index) {
    this.todomodel.deleteToDo(index);
}
ToDoController.prototype.completeToDo = function(index) {
    this.todomodel.markToDoComplete(index);
}
ToDoController.prototype.editToDo = function(text, index) {
    this.todomodel.editToDo(text, index);
}
ToDoController.prototype.refreshView = function() {
    this.todoview.refreshList();
}