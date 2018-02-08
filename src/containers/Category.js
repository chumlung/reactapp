import { connect } from 'react-redux';
import React, { Component } from 'react';

import '../App.css';
import history from '../history';
import AddTodo from './AddTodo.js';
import axios from '../axioService';
import EditComponent from './EditTodo.js';
import EditDateComponent from './EditTodoDate.js';
import EditPriorityComponent from './EditTodoPriority.js';
import { getTodo, deleteTodo, storeEditValues, storeEditDate, storeEditPriority, storeCurrentCategory } from '../actions';

class Category extends Component {
  constructor(props) {
    super(props);    
    this.handleSearch = this.handleSearch.bind(this);
    this.getList = this.getList.bind(this);
  }
  getList(uID, categoryID){
    this.props.getTodo(uID, categoryID);
  }
  componentDidMount() {
    let userID = parseInt(localStorage.getItem('userID'),10);
    if (userID !== 0){
      this.getList(userID, this.props.categoryID);
    }
    else{
      this.getList(userID, this.props.categoryID);
    }
  }

  handleDelete(uID,index) {
    this.props.deleteTodo(uID,index)
  }
  componentDidUpdate(){
    if (parseInt(localStorage.getItem('userID'), 10) === 0){
      history.push('/');
    }
  }
  handleSearch(result){
    this.setState({ todos: result})
  }

  render() {
    return (
      <div className="Category">
        <header className="Category-header">
          <h1 className="Category-title">Title:{this.props.categoryName}</h1>
        </header>
        {this.props.todos.categories[this.props.index].todo ?
          <div>
            <h4>Total todo-list count:{this.props.todos.categories[this.props.index].todo.length}</h4>
            <table className="table table-bordered">
            <thead className="thead-dark">
            <tr>
              <th scope="col">ListID</th>
              <th scope="col">Task</th>
              <th scope="col">Date</th>
              <th scope="col">Priority</th>
            </tr>
            </thead>
            <tbody>
              {this.props.todos.categories[this.props.index].todo.map((todo, index) =>
                <tr scope="row" key={index}>
                  <td>{todo.id}</td>
                  <td onDoubleClick={this.props.storeEditValues.bind(this, todo)}>
                    {this.props.todos.singleTodo.listID === todo.id && this.props.todos.singleTodo.details ?
                      <EditComponent/>:
                      <p>{todo.details}</p>
                    }
                  </td>
                  <td onDoubleClick={this.props.storeEditDate.bind(this, todo)}>
                    {this.props.todos.singleTodo.listID === todo.id && this.props.todos.singleTodo.date ?
                      <EditDateComponent/>:
                      <p>{todo.date.substring(0, 10)}</p>
                    }
                  </td>
                  <td onDoubleClick={this.props.storeEditPriority.bind(this, todo)}>
                  {this.props.todos.singleTodo.listID === todo.id && this.props.todos.singleTodo.priority ?
                      <EditPriorityComponent/>:
                      <p>{todo.priority}</p>
                    }
                  </td>
                </tr>
              )}
            </tbody>
            </table>
          </div>
          : null
        }
        <hr/>
        {
          this.props.categoryID === this.props.todos.currentCategory.categoryID ?
          <AddTodo/>:
          <button onClick={this.props.storeCurrentCategory.bind(this, this.props.categoryID)}>Add Todo</button>
        }
      </div>
    );
  }
}



const mapStateToProps = state =>{
  return {
    todos : state
  }
}
const mapDispatchToProps = dispatch =>{
  return{
    getTodo: (uID, categoryID) => {
      dispatch(getTodo(axios.get('http://127.0.0.1:8848/api/users/'
        + uID + '/categories/' + categoryID + '/todos')))
    },
    // deleteTodo: (uID, categoryID)=>{
    //   dispatch(deleteTodo(axios.delete('http://127.0.0.1:8848/api/users/'
    //     + uID + '/categories' + categoryID + '/todos/' + index)))
    // },
    storeEditValues:(toEdit)=>{
      dispatch(storeEditValues(toEdit))
    },
    storeEditDate: (toEditDate)=>{
      dispatch(storeEditDate(toEditDate))
    },
    storeEditPriority: (toEditPriority)=>{
      dispatch(storeEditPriority(toEditPriority))
    },
    storeCurrentCategory: (value)=> {
      dispatch(storeCurrentCategory(value))
    }
  }
}
const CategoryList = connect(
  mapStateToProps,
  mapDispatchToProps
)(Category)
export default CategoryList;


