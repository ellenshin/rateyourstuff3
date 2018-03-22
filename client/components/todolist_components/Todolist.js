import React from 'react';
import TodoItem from './TodoItem';
import TodoService from '../../services/TodoService'
import NewTodo from './NewTodo';
import EditableLabel from 'react-edit-inline';

class TodoList extends React.Component {
    
  constructor(props){
    super(props);

    //Set the initial state of the component
    this.state = {todos: TodoStore.allTags};
    this.deleteList = this.deleteList.bind(this);
      
  }

  scrollToBottom() {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  componentDidMount() {
      //Add event listener for change of Todo Store
      this.tagChange = () => { 
        console.log("TASKS IN TODO LIST CHANGED!");
        this.setState( {todos: TodoStore.allTags}) 
      };

      TodoStore.addChangeListener(this.tagChange);    
      TodoService.fetchStuff(this.props.list._id, this.props.index);
    //Fetch initial tasks and tags
    //console.log("LOADED??", this.state.todos);
  }
  
  componentWillUnmount() {
    //Add event listener for change of Todo Store
    TodoStore.removeChangeListener(this.tagChange);
  }


  componentDidUpdate() {
    this.scrollToBottom();
  }

  deleteList(event) {
    event.preventDefault();
    TodoService.deleteTask(this.props.index);
  }

  customValidateText(text) {
      return (text.length > 0 && text.length < 64);
  }

 dataChanged(data) {
        // data = { description: "New validated text comes here" } 
        // Update your model from here 
        //console.log(data)
        //this.setState({...data})
    }

_handleFocus(text) {
        console.log('Focused with text: ' + text);
    }
 
    _handleFocusOut(text) {
        console.log('Left editor with text: ' + text);
    }

    render(){
        var array = this.state.todos;
        var stuff = array[this.props.index];
        if (stuff === undefined) {
          var stuff = [];
        }
        console.log("ARRAY", array, stuff);
        var list_index = this.props.index;
        var list_id = this.props.list._id;
        return (
          
          <div className="todo-list rounded">
            
          {/*<div className={!this.props.markedDone ? "todo" : "todo todoisdone"}>*/}
            {/*<input className="todo-checkbox custom-checkbox" type="checkbox" checked={this.props.markedDone} onClick={this.toggleCheckbox}/>*/}
            <div className = "delete-list-btn" onClick={this.deleteList}>X</div>
            {/*<div className="todo-name"> {this.props.title} </div>*/}
            <EditableLabel text={this.props.title}
                className='todo-name'
                //inputClassName='todo-name'
                inputWidth='200px'
                inputHeight='25px'
                inputMaxLength='50'
                labelFontWeight='700'
                inputFontWeight='bold'
                onFocus={this._handleFocus}
                onFocusOut={this._handleFocusOut}
            />
            
            
            <hr className="style1"></hr>
            <ul className="todo-tags">
              
              { stuff.map( function(todo, index){
                return <TodoItem key={todo._id} todo={todo} index={index} list_index={list_index} list_id={list_id}/>
              })}

            </ul>
            <NewTodo list={this.props.list} index={this.props.index}/>
            <div style={{ float:"left", clear: "both" }}
             ref={(el) => { this.messagesEnd = el; }}>
            </div>
            {/*<button type="button" className="todo-delete close" aria-label="Delete" onClick={this.deleteTodo}> <span aria-hidden="true">&times;</span> </button>*/}
          </div>
        )
    }

}

export default TodoList;