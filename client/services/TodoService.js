import request from 'superagent';

import Constants from '../constants'

import AlertActions from  '../actions/AlertActions';
import TodoActions from '../actions/TodoActions';
import TodoStore from '../stores/TodoStore';
import LoginStore from '../stores/LoginStore'

class TodoService {
  
  fetchTasks() {
    
    var tasks = false;
    var tags = false;

    request
    .post(Constants.API_TASKS_GETALL)
    .send({"Authorization":LoginStore._jwt})
    .end( (err, res) => {
        if(err || !res.ok){
            // if(res.body.message) { AlertActions.displayMessage('warning', res.body.message); }
            // else{ AlertActions.displayMessage('error', 'Can not fetch todos at this time. Server might be down.');}
            return;
        }
        else{
          //We obtain tasks. Now do a chain request to obtain tags
          tasks = res.body.tasks;
          TodoActions.loadTasks(tasks);

        }
    });
  }

  fetchStuff(list_id, index) {
    request
    .post(Constants.API_TAGS_GETBYID)
    .send({"Authorization":LoginStore._jwt, "list_id":list_id})
    .end( (err, res) => {
        if(err || !res.ok){
            // if(res.body.message) { AlertActions.displayMessage('warning', res.body.message); }
            // else{ AlertActions.displayMessage('error', 'Can not fetch todos at this time. Server might be down.');}
            return;
        }
        else{
          //TodoActions.loadTasksAndTags(tags,tasks);
          var tags = res.body.tags;
          console.log("TAGS FROM FETCH", tags);
          TodoActions.loadTags(tags, index);
          //return res.body.tags;
          //We obtain tasks. Now do a chain request to obtain tags
        }
    });
  }

  updateRating(tag_index, list_index, id, newRating){
    request
    .post(Constants.API_TAG_NEWRATING)
    .send({"Authorization":LoginStore._jwt, "id":id, "newRating": newRating})
    .end( (err, res) => {
        if(err || !res.ok){
            // if(res.body.message) { AlertActions.displayMessage('warning', res.body.message); }
            // else{ AlertActions.displayMessage('error', 'Can not toggle todo at this time. Server might be down.');}
            return;
        }
        else{
          //We toggle task in the store
          TodoActions.updateTag(tag_index, list_index, newRating);
        }
      });
  }

  updateList(new_title, list_index, list_id){
    request
    .post(Constants.API_TASK_NEWTITLE)
    .send({"Authorization":LoginStore._jwt, "id":list_id, "new_title": new_title})
    .end( (err, res) => {
        if(err || !res.ok){
            // if(res.body.message) { AlertActions.displayMessage('warning', res.body.message); }
            // else{ AlertActions.displayMessage('error', 'Can not toggle todo at this time. Server might be down.');}
            return;
        }
        else{
          //We toggle task in the store
          TodoActions.updateTask(list_index, new_title);
        }
      });
  }

  createTask(taskTitle) {
    if(taskTitle.length == 0) {
      AlertActions.displayMessage('warning', "Name your list!");
    }

    request
    .post(Constants.API_TASKS_CREATE)
    .send({"Authorization":LoginStore._jwt, "title":taskTitle, "tags":[]})
    .end( (err, res) => {
        if(err || !res.ok){
          console.log("ERRORS = " + JSON.stringify(res.body));
          
            // if(res.body.message) { AlertActions.displayMessage('warning', res.body.message); }
            // else{ AlertActions.displayMessage('error', 'Can not create task at this time. Server might be down.');}
            return;
        }
        else{
          //We place the task in the store
          TodoActions.addTask(res.body.task);
        }
      });
  }

  deleteTask(taskIndex) {
    if(taskIndex<0 || taskIndex>=TodoStore.allTasks.length){
      AlertActions.displayMessage("error","Invalid task index");
      return;
    }


    console.log("TAGS", TodoStore.allTags[taskIndex]);
    request
    .post(Constants.API_TASKS_DELETE)
    .send({"Authorization":LoginStore._jwt, "id":TodoStore.allTasks[taskIndex]._id, "tags":TodoStore.allTags[taskIndex]})
    .end( (err, res) => {
        if(err || !res.ok){
            // if(res.body.message) { AlertActions.displayMessage('warning', res.body.message); }
            // else{ AlertActions.displayMessage('error', 'Can not create task at this time. Server might be down.');}
            return;
        }
        else{
          //We delete the task in the Todo Store
          TodoActions.deleteTask(taskIndex);
        }
      });
  }

  deleteTag(tag_index, tag_id, list_id, list_index) {
    if(tag_index<0 || tag_index>=TodoStore.allTags[list_index].length){
      AlertActions.displayMessage("error","Invalid task index");
      return;
    }

    console.log("ID", TodoStore.allTags[list_index][tag_index]._id);
    request
    .post(Constants.API_TAGS_DELETE)
    .send({"Authorization":LoginStore._jwt, "id":TodoStore.allTags[list_index][tag_index]._id, "list_id":list_id})
    .end( (err, res) => {
        if(err || !res.ok){
            // if(res.body.message) { AlertActions.displayMessage('warning', res.body.message); }
            // else{ AlertActions.displayMessage('error', 'Can not delete tag at this time. Server might be down.');}
            return;
        }
        else{
          //We delete the task in the Todo Store
          //AlertActions.displayMessage('success', 'Task deleted');
          TodoActions.deleteTag(tag_index, list_index);
        }
      });
  }

  createTag(tagName, list_id, list_index) {
    request
    .post(Constants.API_TAGS_CREATE)
    .send({"Authorization":LoginStore._jwt, "name":tagName, "list_id":list_id})
    .end( (err, res) => {
        if(err || !res.ok){
            //if(res.body.message) { AlertActions.displayMessage('warning', res.body.message); }
            //else{ AlertActions.displayMessage('error', 'Can not create tag at this time. Server might be down.');}
            return;
        }
        else{
          //We place the task in the store
          TodoActions.addTag(res.body.tag, list_index);
        }
      });
  }

  

}

export default new TodoService()
