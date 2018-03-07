import React from 'react';
import TodoService from '../../services/TodoService'
import ReactStars from 'react-stars'

class TodoItem extends React.Component {
    
  constructor(props){
    super(props);

    //Set the initial state of the component
    this.deleteTodo = this.deleteTodo.bind(this);
    this.ratingChanged = this.ratingChanged.bind(this);
  }


  deleteTodo(event) {
    event.preventDefault();
    TodoService.deleteTag(
      this.props.index,
      this.props.todo._id,
      this.props.list_id,
      this.props.list_index);
  }

  ratingChanged(newRating) {
    TodoService.updateRating(
      this.props.index,
      this.props.list_index,
      this.props.todo._id,
      newRating);
    //TodoService.fetchStuff(this.props.list_id, this.props.list_index);
  }

    render(){
        return (
          <div>
            <li key={this.props.index} > 
            <span>{this.props.todo.name} <span className="delete-btn" onClick={this.deleteTodo}>X</span></span>
            <span className="rating-stars">
            <ReactStars value={this.props.todo.rating} count={5} onChange={this.ratingChanged} size={24} color2={'#ffd700'} /> 
            </span>
            <hr></hr>
            </li>
            
          </div>
        )
    }

}

export default TodoItem;