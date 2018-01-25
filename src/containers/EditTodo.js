import { connect } from 'react-redux';
import React from 'react'

import axios from '../axioService';
import { editTodo,handleChange,resetSingleTodo } from '../actions';

const EditForm = (props) =>{

  let handleSubmit=(event)=>{
    event.preventDefault();
    props.editTodo(
      props.todos.singleTodo.listID,
      props.todos.singleTodo.userID,
      props.todos.singleTodo.details
    );
    props.resetValues();
  }
  let handleCancel=(event)=>{
    event.preventDefault();
    props.resetValues();
  }

  return(
    <form onSubmit = {handleSubmit}>
    <div className="edit-todo">
      <textarea name="details" type="text" id="inputDetails" 
        value={props.todos.singleTodo.details}
        onChange={props.handleChange}
        placeholder={props.todos.singleTodo.details}></textarea>
      <button className='save-btn' onClick={handleSubmit}>Save</button>
      <button className='cancel-btn' onClick={handleCancel}>Cancel</button>
    </div>
    </form>
  )
}

const mapStateToProps = state =>{
  return {
    todos : state
  }
}
const mapDispatchToProps = dispatch =>{
  return{
    editTodo: (listId,userId,details)=>{
      dispatch(editTodo(
        axios.put('http://127.0.0.1:8848/api/users/1/todos/'+listId,{
          userID: userId,
          details: details
        })
      ))
    },
    handleChange: (event)=>{
      dispatch(handleChange(event))
    },
    resetValues:() =>{
      dispatch(resetSingleTodo())
    }
  }
}
const Edit = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditForm)

export default Edit;
