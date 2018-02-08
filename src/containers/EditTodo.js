import { connect } from 'react-redux';
import React from 'react'

import axios from '../axioService';
import { editTodo, handleChange, resetSingleTodo } from '../actions';

const EditForm = (props) => {
  let triggerSaveAction = (event) => {
    if (event.keyCode === 13) {
      handleSubmit();
    }
  }

  let handleSubmit = () => {
    props.editTodo(
      props.todos.singleTodo.listID,
      props.todos.singleTodo.userID,
      props.todos.singleTodo.categoryID,
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
      <input name="details" type="text" id="inputDetails" 
        value={props.todos.singleTodo.details}
        onChange={props.handleChange}
        onKeyDown={triggerSaveAction}
        placeholder={props.todos.singleTodo.details}/>
      <img height='25' width='25' src='../images/cancel-red-btn.png' alt='cancel' onClick={handleCancel}/>
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
    editTodo: (listId, userId, categoryId, details)=>{
      dispatch(editTodo(
        axios.put('http://127.0.0.1:8848/api/users/'+ userId+'/categories/'+categoryId+'/todos/'+listId,{
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
