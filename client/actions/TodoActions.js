import AppDispatcher from '../dispatchers/AppDispatcher.js';

export default {

  loadTasks: (tasks) => {
    AppDispatcher.dispatch({
      type: 'LOAD_TASKS',
      tasks: tasks
    });
  },

  loadTags: (tags, listIndex) => {
    AppDispatcher.dispatch({
      type: 'LOAD_TAGS',
      tags: tags,
      listIndex: listIndex
    });
  },

  addTag: (newTag, listIndex) => {
    AppDispatcher.dispatch({
      type: 'ADD_TAG',
      newTag: newTag,
      listIndex: listIndex
    });
  },

  addTask: (newTask) => {
    AppDispatcher.dispatch({
      type: 'ADD_TASK',
      newTask: newTask
    });
  },

  toggleTask: (taskIndex) => {
    AppDispatcher.dispatch({
      type: 'TOGGLE_TASK',
      taskIndex: taskIndex
    });
  },

  deleteTask: (taskIndex) => {
    AppDispatcher.dispatch({
      type: 'DELETE_TASK',
      taskIndex: taskIndex
    });
  },

  deleteTag: (tagIndex, listIndex) => {
    AppDispatcher.dispatch({
      type: 'DELETE_TAG',
      tagIndex: tagIndex,
      listIndex: listIndex
    });
  },
    
      
      
}
