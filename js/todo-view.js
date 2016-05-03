/* View: Will manipulates DOM's
   Based on user action will fire the events which are handled by controller.
*/
function ToDoView(model, controls) {
    this.todomodel = model;
    this.todocontrols = controls;
    this.enterKeyCode = 13;

    this.todocontrols.addtodo.addEventListener("keypress", this.addToDo.bind(this));
    this.addTodoEvent = new Event();

    this.todocontrols.deleteall.addEventListener("click", this.deleteAll.bind(this));
    this.deleteAllEvent = new Event();

    this.todocontrols.clearcompleted.addEventListener("click", this.clearCompleted.bind(this));
    this.clearCompletedEvent = new Event();

    this.deleteToDoEvent = new Event();

    this.completeToDoEvent = new Event();

    this.editToDoEvent = new Event();

    document.body.addEventListener("click",this.editHandler.bind(this, null), false);

}

ToDoView.prototype = {
    show: function() {
        this.todomodel.getToDos();
        this.refreshList();
    },
    /* Refresh the current UI to reflect the latest state of model */
    refreshList: function() {
        /* THis will create structure like following
		<li class="todo">
			<span class="cross"></span>
			<span class="tick"></span>
			<span class="todotext"> hi there how are you </span>				
		</li> 
		*/
        var that = this;
        var outerContent = that.todocontrols.list;
        outerContent.innerHTML = "";
        for (var currentToDo = 0; currentToDo < this.todomodel.todos.length; currentToDo++) {
            var currentToDoObj = this.todomodel.todos[currentToDo];

            var todoNode = document.createElement("li");
            todoNode.className = "todo";
            if (!currentToDoObj.complete) {
                todoNode.addEventListener("dblclick", that.editHandler.bind(this, currentToDo), false);
            }
            var crossSpan = document.createElement("span");
            crossSpan.className = "cross";
            crossSpan.addEventListener("click", that.deleteHandler.bind(this, currentToDo), false);

            var tickSpan = document.createElement("span");
            tickSpan.className = "tick";

            tickSpan.addEventListener("click", that.markCompleteHandler.bind(this, currentToDo), false);

            var textSpan = document.createElement("span");
            textSpan.className = "todotext";
            textSpan.innerHTML = currentToDoObj.text;
            if (currentToDoObj.complete == true) {
                textSpan.className += " complete";
                todoNode.className += " completetodo";
            }

            todoNode.appendChild(crossSpan);
            todoNode.appendChild(tickSpan);
            todoNode.appendChild(textSpan);

            outerContent.appendChild(todoNode);

        }

    }

}
ToDoView.prototype.deleteHandler = function(index, listener) {
    this.deleteToDoEvent.publish(index);
}

ToDoView.prototype.markCompleteHandler = function(index, listener) {
    this.completeToDoEvent.publish(index);
}

ToDoView.prototype.editHandler = function(index, listener) {
    // Make Sure Double Click is not executed when on textArea or on edit mode
    if (listener.target.type !== "text" && listener.target.type !== "textarea" && !listener.target.classList.contains('edit')) {
        var editModeIndex = -1;
        var thingstoclear = list.getElementsByClassName('todo');
        for (var i = 0; i < thingstoclear.length; i++) {
            var editMode = list.getElementsByClassName('todo')[i].classList.toString().split(" ")[1];
            if (typeof editMode != "undefined") {
                editModeIndex = i;
            }
        }
        // If one to-do is opened in edit mode
        // It will be saved and reverted to non-edit mode before another to-do can be opened in edit-mode.
        this.revertEditMode(editModeIndex);

        if (index == null) return;
        var target = this.todocontrols.list.children[index];
        target.className += " edit";
        var text = target.getElementsByClassName('todotext')[0].innerHTML;
        var inputSpan = document.createElement("textArea");
        inputSpan.className = "edittext";
        inputSpan.setAttribute("maxLength", "70");
        inputSpan.value = text;
        inputSpan.addEventListener("keypress", this.editTodo.bind(this, index, inputSpan), false);
        target.appendChild(inputSpan);

        target.getElementsByClassName('todotext')[0].parentNode.removeChild(target.getElementsByClassName('todotext')[0]);
        document.getElementsByClassName("edittext")[0].focus();
    }
}
ToDoView.prototype.editTodo = function(index, inputSpan, listener) {
    if (parseInt(listener.keyCode) === this.enterKeyCode) {
        if (inputSpan.value === null || inputSpan.value === "") {
            this.deleteToDoEvent.publish(index);
        } else {
            this.editToDoEvent.publish(inputSpan.value, index);
        }
    }
}
ToDoView.prototype.revertEditMode = function(param) {
    if (param !== -1) {
        var list = this.todocontrols.list;
        var thingstoclear = list.getElementsByClassName('edittext');
        for (var i = 0; i < thingstoclear.length; i++) {
            var paramText = thingstoclear[i].value;
            if (paramText === null || paramText === "") {
                this.deleteToDoEvent.publish(param);
             }  else {
                this.editToDoEvent.publish(paramText, param);
            }
        }
    }
}

ToDoView.prototype.addToDo = function(listener) {
    if (parseInt(listener.keyCode) === this.enterKeyCode) {
        var todoText = this.todocontrols.addtodo.value;
        if (todoText !== null && todoText !== "") {
            this.addTodoEvent.publish(todoText);
            this.todocontrols.addtodo.value = "";
        }
    }
}

ToDoView.prototype.deleteAll = function() {
    this.deleteAllEvent.publish();
}
ToDoView.prototype.clearCompleted = function() {
    this.clearCompletedEvent.publish();
}