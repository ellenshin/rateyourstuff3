import React from 'react';

import TodoService from '../../services/TodoService'
import NewTodo from './NewTodo';
class TodoList extends React.Component {
    
  constructor(props){
    super(props);

    //Set the initial state of the component
    this.state = {todos: TodoStore.allTags};
    this.deleteTodo = this.deleteTodo.bind(this);
      
  }

  componentDidMount() {
      //Add event listener for change of Todo Store
      this.tagChange = () => { 
        console.log("TASKS IN TODO LIST CHANGED!");
        this.setState( {todos: TodoStore.allTags}) 
      };

      TodoStore.addChangeListener(this.tagChange);    

    //Fetch initial tasks and tags
    TodoService.getStuff(this.props.list._id, this.props.index);
    //console.log("LOADED??", this.state.todos);
  }
  
  componentWillUnmount() {
    //Add event listener for change of Todo Store
    TodoStore.removeChangeListener(this.tagChange);
  }


  deleteTodo(event) {
      TodoService.deleteTask(this.props.index);
  }



    render(){

        return (
          <div className="todo-list">
            
          {/*<div className={!this.props.markedDone ? "todo" : "todo todoisdone"}>*/}
            {/*<input className="todo-checkbox custom-checkbox" type="checkbox" checked={this.props.markedDone} onClick={this.toggleCheckbox}/>*/}
            <span className="todo-name"> {this.props.title} </span>
            <button onClick={this.deleteTodo}>X</button>
            <NewTodo list={this.props.list} index={this.props.index}/>
            <ul className="todo-tags">
              
              { this.props.todos.map( function(todo, index){
                {/*return <li key={index} className="badge badge-primary"> {todo} </li>*/}
                return <li key={index} > {todo.name} </li>
              })}

            </ul>
            
            {/*<button type="button" className="todo-delete close" aria-label="Delete" onClick={this.deleteTodo}> <span aria-hidden="true">&times;</span> </button>*/}
          </div>
        )
    }

}

export default TodoList;