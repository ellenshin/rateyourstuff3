import React from 'react';
import TodoListApp from '../components/todolist_components/TodoListApp'

class TodolistPage extends React.Component {
    
    render(){
      return (
        <div>
            {/*<h1 className="page-title"> Todos </h1>*/}

            <TodoListApp />

        </div>
    )}
}

export default TodolistPage;