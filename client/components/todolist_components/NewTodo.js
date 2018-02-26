import React from 'react';
import TodoService from '../../services/TodoService'

class NewTodo extends React.Component {
    
  constructor(props){
    super(props);

    //Set the initial state of the component
    this.state = {
      newTodoName: ''
    };
    this.updateNewTodoName = this.updateNewTodoName.bind(this);    
    this.createStuff = this.createStuff.bind(this);      
  }

  updateNewTodoName(event){
    //Updated user state
    this.setState({ newTodoName: event.target.value })
  }


  createStuff(event) {
    //TODO: Add form validation
    event.preventDefault();
    //console.log("PARAMS", this.state.newTodoName, this.props.list._id, this.props.index);
    TodoService.createTag(this.state.newTodoName, this.props.list._id, this.props.index);
    this.setState( { newTodoName: '' });
  }

    render(){
    
    return (
    
    <div className="newtodo col-md-6">

      <form onChange={this.updateNewTodoName} onSubmit={this.createStuff}>
        <div className="input-group">
          {/*<input id="new_todo_name" type="text" className="newtodo-input form-control" value={this.state.newTodoName} placeholder="New stuff..." aria-label="New stuff..."/>*/}
          <input type="text" value={this.state.newTodoName} placeholder="New stuff..." aria-label="New stuff..."/>
          <span className="input-group-btn">
            <button className="newtodo-button btn btn-outline-primary" type="submit"> + </button>
          </span>
        </div>
      </form>

    </div>

    )}
}

export default NewTodo;