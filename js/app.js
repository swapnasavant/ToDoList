window.onload = function() {
  var model = new ToDoModel();
  var view = new ToDoView(model,{
     'list' : document.getElementById('list'),
	 'addtodo' : document.getElementById('addtodo'),
	'deleteall' : document.getElementById('deleteall'),
	'clearcompleted' : document.getElementById('clear')  	 
	});
  var controller = new ToDoController(model,view);
  view.show();
}