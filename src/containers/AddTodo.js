import React from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';

import axios from '../axioService.js';
import 'react-datepicker/dist/react-datepicker.css';
import { addTodo, handleChange, resetSingleTodo, changeTodoDate, resetCurrentCategory } from '../actions';

const AddTodo=(props)=>{
  let tags=['Learn','Work','Movie','Gadgets','Games','Food'];
  let tagsID=[];
  let toggleCheckbox = (event) => {
    let selectedID = tags.findIndex(tag=>tag === event.target.name)+1;
    if (event.target.checked){
      tagsID = [...tagsID,selectedID]
    }else{
      tagsID = tagsID.filter((tagID)=>tagID !== selectedID)
    }
  }
  let handleSubmit=(event)=>{
    event.preventDefault();
    props.addTodo(props.todos.currentUser.userID,
      props.todos.currentCategory.categoryID,
      props.todos.singleTodo.details,
      props.todos.singleTodo.date._d,
      tagsID,
      props.todos.singleTodo.priority);
    props.resetValues();
    props.resetCurrentCategory();
  }

  return(
    <div>
      <h4>Add new todo</h4>
      <form className="todo-form" onSubmit={handleSubmit}>
      <div className="form-UserId">
        <label htmlFor="inputTodoUserId">UserId: {props.todos.currentUser.userID} </label>
      </div>
      {props.todos.singleTodo.listID === null ?
        <div className="form-details">
          <label htmlFor="inputdetails">Details: </label>
            <input name="details" type="text" id="inputdetails" 
              value={props.todos.singleTodo.details}
              onChange={props.handleChange}
              placeholder="Details"/>
            <DatePicker selected={props.todos.singleTodo.date} onChange={props.handleDateChange}/>
            <div>
              <label>Priority:</label>
              <input name="priority" type="text" id="inputpriority" 
              value={props.todos.singleTodo.priority}
              onChange={props.handleChange}
              placeholder="Priority"/>
            </div>
            <div>
            {tags.map((labels)=>
              <label key={labels}>
                <input type='checkbox' name ={labels} 
                  defaultChecked={false} 
                  onChange={toggleCheckbox}/>
                {labels}
              </label>
            )}
            </div>
            <img height='25' width='25' src='../images/save-green-btn.png' alt='save' onClick={handleSubmit}/>
        </div>
        :<p>Cannot add while in edit</p>}
      </form>

    </div>
  )
}

const mapStateToProps = state =>{
  return {
    todos : state
  }
}
const mapDispatchToProps = dispatch =>{
  return{
    addTodo: (userId, categoryId, details, date, tagsID, priority)=>{
      dispatch(addTodo(axios.post('http://127.0.0.1:8848/api/users/'
        + userId + '/categories/' + categoryId + '/todos', {
        categoryID: categoryId,
        userID: userId,
        details: details,
        priority: priority,
        date: date,
        tags: tagsID
      })))
    },
    handleChange: (event)=>{
      dispatch(handleChange(event))
    },
    resetValues:() =>{
      dispatch(resetSingleTodo())
    },
    resetCurrentCategory:() => {
      dispatch(resetCurrentCategory())
    },
    handleDateChange:(date)=>{
      dispatch(changeTodoDate(date))
    }
  }
}
const add = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddTodo)

export default add;
