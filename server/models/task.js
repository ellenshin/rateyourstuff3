var Tasktag = require('../models/tasktag');
var mongoose = require('mongoose');

var TaskSchema = mongoose.Schema({

    user_id        : mongoose.Schema.Types.ObjectId,
    date_created   : Date,
    title          : String,
    marked_done    : Boolean,
    tags           : [mongoose.Schema.Types.ObjectId] //Each array element referes to a tag table
    
});

//We create a variable accesible outside of this file. Variable will be a mongoose schema with added functions
var Task = module.exports = mongoose.model('Task', TaskSchema);


module.exports.createTask = function(newTask, callback){
  Task.create(newTask, callback);
  //newTask.save(callback);
}
module.exports.deleteTask = function(taskId, callback){
  Task.findByIdAndRemove(taskId, callback);
}

module.exports.toggleDone = function(taskId, callback){

  Task.findById(taskId, function(err, doc){
    if(err){
      callback(err);
    }
    var markedValue = doc.marked_done;
    Task.findByIdAndUpdate(taskId, {marked_done: !markedValue}, callback);
  });
 
}


module.exports.updateTitle = function(id, newTitle, callback) {
  Task.findByIdAndUpdate(id, {title: newTitle}, callback);
}

module.exports.getTask = function(taskId, callback) {
  Task.findById(taskId, callback);
}

module.exports.addStuff = function(taskId, stuffId, callback){

  Task.findById(taskId, function(err, doc){
    if(err){
      callback(err);
    }
    var markedValue = doc.marked_done;
    //Task.findByIdAndUpdate(taskId, {marked_done: !markedValue}, callback);
    Task.findByIdAndUpdate(taskId, {$push: {tags: { $each: [stuffId], $position: 0 }}}, callback);
  });
 
}

module.exports.deleteStuff = function(taskId, stuffId, callback){

  Task.findById(taskId, function(err, doc){
    if(err){
      callback(err);
    }
    var markedValue = doc.marked_done;
    //Task.findByIdAndUpdate(taskId, {marked_done: !markedValue}, callback);

    Task.findByIdAndUpdate(taskId, {$pull: {tags: stuffId}}, callback);
  });
 
}

module.exports.getUserTasks = function(userId, callback){
  var query = {'user_id': userId}; 
  Task.find(query, callback);
}

