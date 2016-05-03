//Simple Event class to create events and attach listeners.
function Event(){
  this.listeners =[];
}

Event.prototype.attachHandler = function(callback){
  this.listeners.push(callback);
}

Event.prototype.publish =function(){
   for(var i = 0; i < this.listeners.length; i++){
      this.listeners[i].apply(null,arguments);
   }
}
