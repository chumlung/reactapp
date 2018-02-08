import moment from 'moment';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';

import '../App.css';
import history from '../history';
import axios from '../axioService';
import CategoryComponent from './Category.js'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { changeCatName, logOut, getCategories, addCategories, resetSingleCategory, resetSingleTodo } from '../actions';

BigCalendar.momentLocalizer(moment);

class App extends Component {
  constructor(props) {
    super(props);    
    this.handleSearch = this.handleSearch.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.addCategory = this.addCategory.bind(this);
  }
  getCategories(uID){
    this.props.getCategories(uID);
  }
  addCategory(event) {
    event.preventDefault();
    this.props.addCategories(this.props.todos.currentUser.userID,this.props.todos.singleCategory.name);
    this.props.resetValues();
    this.props.resetSingleCategory();
    
  }
  componentDidMount() {
    let userID = parseInt(localStorage.getItem('userID'),10);
    if (userID !== 0){
      this.getCategories(userID);
    }
    else{
      this.getCategories(userID);
    }
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
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Todo List</h1>
          <button style={{float:'right'}} onClick={this.handleLogOut}>LogOut</button>
        </header>
        <ul>
          {this.props.todos.categories.map((category, index) => 
            <div key={index}>
              <CategoryComponent categoryID={category.id} categoryName={category.name} index={index}/>
            </div>
          )}
        </ul>
        <input
          name="name"
          type="text"
          id="inputCategory"
          value={this.props.todos.singleCategory.name}
          onChange={this.props.handleChange}
          placeholder="Category Title"
        />
        <button onClick={this.addCategory}>Add Category</button>
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
    getCategories: (uID) => {
      dispatch(getCategories(axios.get('http://127.0.0.1:8848/api/users/' + uID + '/categories/')))
    },
    addCategories: (uID, name) => {
      dispatch(addCategories(axios.post('http://127.0.0.1:8848/api/users/' + uID + '/categories/', {
        name: name
      })))
    },
    handleChange: (event) => {
      dispatch(changeCatName(event))
    },
    resetSingleCategory: () => {
      dispatch(resetSingleCategory())
    },
    resetValues: () => {
      dispatch(resetSingleTodo())
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
export default AppList;


