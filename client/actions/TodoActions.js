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

  updateTag: (tag_index, list_index, newRating) => {
    AppDispatcher.dispatch({
      type: 'UPDATE_TAG',
      listIndex: list_index,
      tagIndex: tag_index,
      newRating: newRating
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
  
  emptyOut: () => {
    AppDispatcher.dispatch({
      type: 'EMPTY_OUT'
    });
  }
      
      
}
