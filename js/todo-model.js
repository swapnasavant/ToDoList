/* Model: Will store the to-do data   
   Will send a refresh view event once operation is complete.
 */
function ToDoModel(todos) {
    this.todos = todos;
    this.refreshEvent = new Event();

};

ToDoModel.prototype = {
    //  Creates a new to do
    createToDos: function(todo) {
        this.todos.push({
            text: todo,
            complete: false
        });
        this.refreshStorage();
        this.refreshEvent.publish();
    },
    // Deletes a to-do
    deleteToDo: function(index) {
        var todo;
        todo = this.todos[index];
        this.todos.splice(index, 1);
        this.refreshStorage();
        this.refreshEvent.publish();
    },
    //Marks a to-do as complete
    markToDoComplete: function(index) {
        var todo;
        todo = this.todos[index];
        todo.complete = true;
        this.refreshStorage();
        this.refreshEvent.publish();
    },
    //Delete All To-dos
    deleteAll: function() {
        this.todos = [];
        this.refreshStorage();
        this.refreshEvent.publish();
    },
    //Removes all Completed To-dos
    clearComplete: function() {
        var noncompleted_todos = [];
        for (var i = 0; i < this.todos.length; i++) {
            if (!this.todos[i].complete) {
                noncompleted_todos.push(this.todos[i]);
            }
        }
        this.todos = noncompleted_todos;
        this.refreshStorage();
        this.refreshEvent.publish();
    },
    //Edits a to-do
    editToDo: function(text, index) {
        this.todos[index].text = text;
        this.refreshStorage();
        this.refreshEvent.publish();
    },
    //Stores to-tods in session storage
    refreshStorage: function() {
        // As For IE SessionStorage won't work if webpage is served from local hard-disk.
        // Special Check for IE to exclude sessionStorage
        if ((typeof(Storage) !== "undefined") && !checkIE()) {
            sessionStorage.setItem("todos", JSON.stringify(this.todos));
        }
    },
    // Get To-dos from session Storage
    getToDos: function() {
        if ((typeof(Storage) !== "undefined") && !checkIE()) {
            this.todos = JSON.parse(sessionStorage.getItem("todos"));
            if (this.todos == null) {
                this.todos = [];
            }
        } else {
            this.todos = [];
        }
    }
};