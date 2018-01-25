import React,{ Component } from 'react';
import history from '../history';
import { connect } from 'react-redux';

import axios from '../axioService';
import { changeCurrentUserValue,tryLoggingIn } from '../actions';

class logIn extends Component{
  constructor(props){
    super (props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event){
    event.preventDefault();
    this.props.attemptLogin(this.props.todos.currentUser.email);
  }
  componentDidUpdate(){
    if(this.props.todos.currentUser.userID !== 0){
      history.push('/list');
    }
  }

  render(){
    // console.log(this.props)
    return(
    <div>
      <div className="login">
      <input name="email" style={{width:350}} type="text"
        value = {this.props.todos.currentUser.email}
        onChange = {this.props.changeCurrentUserValue}
        placeholder="Example:johndoe@gmail.com"></input>
      <button onClick={this.handleSubmit}>LogIn</button>
      </div>
    </div>
    )
  }
}

const mapStateToProps = state =>{
  return {
    todos : state
  }
}
const mapDispatchToProps = dispatch =>{
  return{
    changeCurrentUserValue: (event)=>{
      dispatch(changeCurrentUserValue(event));
    },
    attemptLogin: (email)=>{
      dispatch(tryLoggingIn(axios.post('http://127.0.0.1:8848/api/login',{
        user_email:email
      })))
    }
  }
}
const logInComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(logIn)

export default logInComponent;