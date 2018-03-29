import React from 'react';
import LoginTextInput from './form_components/LoginTextInput'
import { Redirect } from 'react-router';

class LoginForm extends React.Component {

  constructor(props){
    super(props);

    //Set the initial state of the component
    this.state = {redirect: false};
    this.handleOnClick = this.handleOnClick.bind(this);
  }

handleOnClick(){
  // some action...
  // then redirect
  this.setState({redirect: true});
}

    render(){

if (this.state.redirect) {
    return <Redirect push to="/register" />;
  }
      const errors = this.props.errors;
      const user = this.props.user;      
      const onChange = this.props.onChange;
      const onSubmit = this.props.onSubmit;
      

      return (
        <div id="login-form" >
        
          <p className="login-form-errors">{errors.main}</p>

          <form action="/todos" onSubmit={onSubmit}>
            

            <LoginTextInput 
              label="👤"
              placeholder="Username"
              id="username"
              name="username"
              onChange={onChange}
              value={user.username}
              error={errors.username}
              type="text"
            />
            
            <LoginTextInput 
              label="🗝"
              placeholder="Password"
              id="password"
              name="password"
              onChange={onChange}
              value={user.password}
              error={errors.password}
              type="password"
            />


            <div className="form-group">
              <button type="submit" className="btn btn-outline-secondary">Login</button>
            &nbsp;&nbsp;
            <button type="button" onClick={this.handleOnClick} className="btn btn-outline-secondary">Register</button>
            </div>
          </form>
          
        
        </div>
    )}
}

export default LoginForm;