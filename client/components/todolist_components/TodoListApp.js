import React from 'react';
import TodoList from './Todolist';
import NewTodoList from './NewTodoList';

import TodoStore from '../../stores/TodoStore'
import TodoActions from '../../actions/TodoActions'
import TodoService from '../../services/TodoService'
import NewTodo from './NewTodo';

class TodoListApp extends React.Component {
    
  constructor(props){
    super(props);
    this.state = {
      tasks: TodoStore.allTasks
    };

    //Expost the todo stores and actions globally for debugging
    window.TodoStore = TodoStore;
    window.TodoActions = TodoActions;
  };


  componentDidMount() {
      //Add event listener for change of Todo Store
      this.todoChange = () => { 
        console.log("TASKS IN TODO LIST CHANGED!");
        this.setState( {tasks: TodoStore.allTasks}) 
      };
      TodoStore.addChangeListener(this.todoChange);    

    //Fetch initial tasks and tags
    TodoService.fetchTasks();
    //TodoService.fetchStuff();
    console.log(this.state.todos);
  }
  
  componentWillUnmount() {
    //Add event listener for change of Todo Store
    TodoStore.removeChangeListener(this.todoChange);
  }


  render(){
    return (
      <div id="todo-list">
        <NewTodoList />
        {/* Render all todos for this user */}
        {this.state.tasks.map( function(task, index){
            return <TodoList key={index} index={index} title={task.title} todos={task.tags} list={task} />
        })}
        
        {/* Input field for new todo */}
      </div>

      )
    }
}

export default TodoListApp;