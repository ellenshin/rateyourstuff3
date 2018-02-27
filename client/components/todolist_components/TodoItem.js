import React from 'react';
import TodoService from '../../services/TodoService'

class TodoItem extends React.Component {
    
  constructor(props){
    super(props);

    //Set the initial state of the component
    this.deleteTodo = this.deleteTodo.bind(this);
      
  }


  deleteTodo(event) {
    event.preventDefault();
    TodoService.deleteTag(
      this.props.index,
      this.props.todo._id,
      this.props.list_id,
      this.props.list_index);
    
    console.log(this.props.index,
      this.props.todo._id,
      this.props.list_id,
      this.props.list_index)
  }

    render(){
        return (
          <div>
            <li key={this.props.index} > {this.props.todo.name}   
            <button onClick={this.deleteTodo}>X</button></li>
            
          </div>
        )
    }

}

export default TodoItem;