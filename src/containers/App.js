import moment from 'moment';
import { connect } from 'react-redux';
import { DragSource, DragDropContext } from 'react-dnd';
import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import HTML5Backend from 'react-dnd-html5-backend';


import '../App.css';
import history from '../history';
import AddTodo from './AddTodo.js';
import axios from '../axioService';
import PageComponent from './Page.js';
import { ItemTypes } from '../Constants';
import SearchTodo from './SearchTodo.js';
import EditComponent from './EditTodo.js';
import { getTodo,deleteTodo,storeEditValues,logOut } from '../actions';

BigCalendar.momentLocalizer(moment);

const listSource = {
  beginDrag(props) {
    console.log('porps',props)
    return {
    };
  }
};
function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

class App extends Component {
  constructor(props) {
    super(props);    
    this.handleSearch = this.handleSearch.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }
  getList(uID){
    this.props.getTodo(uID);
  }
  componentDidMount() {
    let userID = parseInt(localStorage.getItem('userID'),10);
    if (userID !== 0){
      this.getList(userID);
    }
    else{
      this.getList(userID);
    }
  }

  handleDelete(uID,index) {
    this.props.deleteTodo(uID,index)
  }
  handleLogOut(){
    this.props.logOut(parseInt(localStorage.getItem('userID'), 10));
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
    // console.log('yahako props',this.props)
    const { isDragging, connectDragSource } = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Todo List</h1>
          <button style={{float:'right'}} onClick={this.handleLogOut}>LogOut</button>
          <SearchTodo onSearchTodo={this.handleSearch}></SearchTodo>
          {this.props.todos.searchValue === ""?null:<PageComponent/>}
        </header>
        <BigCalendar 
          events={
            this.props.todos.todos.map((todo, index) => ({
              allDay: true,
              start: todo.date,
              end: todo.date,
              title: todo.details
            }))
          }
        />
        <h4>Total todo-list count:{this.props.todos.todos.length}</h4>
          <ul className="todo-list">
            {this.props.todos.todos.map((todo, index) =>
            connectDragSource(
            <div style={{ opacity: isDragging ? 0.5 : 1 }} key={index}>
              <li className="list-item">
                <p className="list-item-info">{'UserID: ' + todo.userId}</p>
                <p className="list-item-info">{'ListID: ' + todo.id}</p>
                <p className="list-item-info">{'Details: ' + todo.details}</p>
                <p className="list-item-info">{'Date: ' + todo.date.toString().substring(0,10)}</p>
                <button className="edit-btn" onClick={this.props.storeEditValues.bind(this, todo)}>Edit</button>
                <button className="delete-btn" onClick={this.handleDelete.bind(this,todo.userId, todo.id)}>Delete</button>
              </li>
            </div>)
            )}
          </ul>
        {this.props.todos.singleTodo.listID!=null?<EditComponent/>:null}
        <AddTodo/>
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
    getTodo: (uID)=>{
      dispatch(getTodo(axios.get('http://127.0.0.1:8848/api/users/'+uID+'/todos')))
    },
    deleteTodo: (uID,index)=>{
      dispatch(deleteTodo(axios.delete('http://127.0.0.1:8848/api/users/'+uID+'/todos/'+index)))
    },
    storeEditValues:(toEdit)=>{
      dispatch(storeEditValues(toEdit))
    },
    logOut:(uID)=>{
      dispatch(logOut(axios.delete('http://127.0.0.1:8848/api/logout/'+uID)))
    }
  }
}
const AppList = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
const ContainerApp = DragSource(ItemTypes.ITEM ,listSource, collect)(AppList);
export default  DragDropContext(HTML5Backend)(ContainerApp)


