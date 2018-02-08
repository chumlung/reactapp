import { connect } from 'react-redux';
import React from 'react';
import { Combobox } from 'react-widgets';

import axios from '../axioService';
import { editTodo, handleComboChange, resetSingleTodo } from '../actions';

const EditPriorityForm = (props) => {
  let priorityOptions = ['Very High', 'High', 'Medium', 'Low'];

  let handleSelect = (value) => {
    console.log('selectma', value)
    props.handleComboChange(value);
  }

  let handleSubmit = () => {
    console.log('propsma', props.todos.singleTodo.priority)
    props.editTodo(
      props.todos.singleTodo.listID,
      props.todos.singleTodo.userID,
      props.todos.singleTodo.categoryID,
      props.todos.singleTodo.priority
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
      <Combobox
        textField="priority"
        data={priorityOptions}
        defaultValue={'Medium'}
        filter='contains'
        value={props.todos.singleTodo.priority}
        onChange={props.handleComboChange}
        onSelect={handleSelect}
      />
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
    editTodo: (listId, userId, categoryId, priority)=>{
      dispatch(editTodo(
        axios.put('http://127.0.0.1:8848/api/users/'+ userId + '/categories/' + categoryId + '/todos/'+listId,{
          userID: userId,
          priority: priority
        })
      ))
    },
    handleComboChange: (value) => {
      dispatch(handleComboChange(value))
    },
    resetValues:() =>{
      dispatch(resetSingleTodo())
    }
  }
}
const Edit = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPriorityForm)

export default Edit;
