var mongoose = require('mongoose');

var TasktagSchema = mongoose.Schema({

    name           : String,
    rating         : { type: Number, default: 0 },
    user_id        : mongoose.Schema.Types.ObjectId, //User that created this task
    img_url        : { type: String, default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNf0Teecy2bqycPmLAMFuMoOd29LRhR4kKSofmjQq5TxDIXge_xw"},
    made_by        : { type: String, default: "Unknown" }
});

//We create a variable accesible outside of this file. Variable will be a mongoose schema with added functions
var Tasktag = module.exports = mongoose.model('Tasktag', TasktagSchema);


module.exports.createTag = function(newTag, callback){
  Tasktag.create(newTag, callback);
  //newTag.save(callback);
}

module.exports.updateRating = function(id, newRating, callback) {
  Tasktag.findByIdAndUpdate(id, {rating: newRating}, callback);
}

module.exports.deleteTag = function(tagId, callback){
  Tasktag.findByIdAndRemove(tagId, callback);
}

module.exports.getUserTags = function(userId, callback){
  var query = {'user_id': userId}; 
  Tasktag.find(query, callback);
}

module.exports.getStuff = function(Ids, callback) {
  Tasktag.find({_id:{$in: Ids}}, callback);
}

module.exports.deleteTagsInList = function(Ids, callback) {
  Tasktag.remove({_id:{$in: Ids}}, callback);
}

module.exports.tagExists = function(id){
  var query = {_id: mongoose.mongo.ObjectId(id)};
  var promise = Tasktag.find(query);
  promise.then(function(data){
    return true; 
  }, function(err) {
    if(err){console.log(err)};
    return false;
  });
}