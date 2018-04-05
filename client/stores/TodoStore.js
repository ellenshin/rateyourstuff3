import BaseStore from './BaseStore';
import jwt_decode from 'jwt-decode';

class TodoStore extends BaseStore {

  constructor() {
    super();
    this.subscribe( () => this._registerToActions.bind(this)); //PRO TIP: Arrow function is used to bind LoginStore class easily
    this._tags = []; //Array type when loaded
    this._tasks = []; //Array type when loaded
  }


  //This establishes what to do when receiving different actions
  _registerToActions(action) {
    switch(action.type){
      case 'LOAD_TASKS':
        this._tasks = action.tasks;
        // for (var i = 0; i < this._tasks.length; i++) {
        //   this._tags.push([]);
        // }
        this.emitChange(); // Every component using this store can listen to the change
        // this._jwt = action.jwt;
        break;

      case 'LOAD_TAGS':
        this._tags[action.listIndex] = action.tags.reverse();
        //this._tags.splice(action.listIndex, 0, action.tags);
        this.emitChange();
        break;

      case 'ADD_TAG':
        this._tags[action.listIndex].unshift(action.newTag);
        this.emitChange();
        break;

      case 'ADD_TASK':
        this._tasks.push(action.newTask);
        //this._tags.push([]);
        this.emitChange();
        break;

      case 'TOGGLE_TASK':
        this._tasks[action.taskIndex].marked_done = !this._tasks[action.taskIndex].marked_done;
        this.emitChange();
        break;
      
      case 'DELETE_TASK':
        this._tasks.splice(action.taskIndex, 1);
        this._tags.splice(action.taskIndex, 1);
        this.emitChange();
        break;

      case 'DELETE_TAG':
        this._tags[action.listIndex].splice(action.tagIndex, 1);
        this.emitChange();
        break;

      case 'UPDATE_TAG':
        this._tags[action.listIndex][action.tagIndex].rating = action.newRating;
        this.emitChange();
        break;

      case 'UPDATE_TASK':
        this._tasks[action.listIndex].title = action.newTitle;
        this.emitChange();
        break;
        
      case 'EMPTY_OUT':
        this._tags = [];
        this._tasks = [];
      default:
        break;
    }
  }

  get allTags(){
    return this._tags;
  }

  get allTasks(){
    return this._tasks;
  }


}

export default new TodoStore(); //Export singleton instance












