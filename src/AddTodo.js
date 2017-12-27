import React, { Component } from 'react';
import axios from './axioService.js';

// axios.interceptors.response.use((response)=>{
//   return response;
// }, (error)=>{
//   console.log(error)
//   if(error.response.status === 404){

//   }
// })

class AddTodo extends Component{
  constructor(props){
    super(props);

    this.state ={
      userId : '',
      details: '',
      id: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(event){
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    })
  }


  handleSubmit(event){
    event.preventDefault();
    axios.post('http://127.0.0.1:8848/api/users/1/todos', {
      userID: this.state.userId,
      details: this.state.details
    }).then(()=>{
      this.props.onAddTodo(this.state);
      this.setState({
        userId: '',
        details: ''
      })
    }).catch(()=>{
      console.log('error caught')
    })
  }

  render(){
    return(
      <div>
        <h4>Add new todo</h4>
        <form className="todo-form" onSubmit={this.handleSubmit}>
        <div className="form-UserId">
          <label htmlFor="inputTodoUserId">UserId: </label>
          <p>{this.state.userId}</p>
        </div>
        <div className="form-details">
          <label htmlFor="inputdetails">Details: </label>
          <textarea name="details" type="text" id="inputdetails" value={this.state.details} onChange={this.handleChange} placeholder="Details"></textarea>
        </div>
        </form>
        <button onClick={this.handleSubmit}>Add Todo</button>

      </div>
    )
  }
}

export default AddTodo;
