import React from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';

import axios from '../axioService';
import { editTodo, changeTodoDate, resetSingleTodo } from '../actions';

const EditDate = (props) => {

  let handleSubmit = (event) => {
    event.preventDefault();
    props.todos.singleTodo.date.set({hours: 12});
    props.editTodo(
      props.todos.singleTodo.listID,
      props.todos.singleTodo.userID,
      props.todos.singleTodo.categoryID,
      props.todos.singleTodo.date._d
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
      <DatePicker selected={props.todos.singleTodo.date} onChange={props.handleDateChange}/>
      <img height='25' width='25' src='../images/save-green-btn.png' alt='save' onClick={handleSubmit}/>
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
    editTodo: (listId, userId, categoryId, date)=>{
      console.log('date',date)
      dispatch(editTodo(
        axios.put('http://127.0.0.1:8848/api/users/'+ userId + '/categories/' + categoryId + '/todos/' + listId,
         {
          userID: userId,
          date: date
        })
      ))
    },
    handleDateChange:(date)=>{
      dispatch(changeTodoDate(date))
    },
    resetValues:() => {
      dispatch(resetSingleTodo())
    }
  }
}
const EditTodoDate = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditDate)

export default EditTodoDate;
