import React, { Component } from 'react';
import './App.css';
import AddTodo from './AddTodo.js';
import SearchTodo from './SearchTodo.js';
import axios from './axioService.js';
import EditComponent from './EditTodo.js'



// let todos = [
//   {
//     todoTitle: 'Work',
//     todoDetails : 'Finish react project',
//     todoFinishBy : 'tomorrow Morning'
//   },
//   {
//     todoTitle: 'Entertainment',
//     todoDetails : 'Watch Justice League',
//     todoFinishBy : 'coming Saturday'
//   },
//   {
//     todoTitle: 'Shopping',
//     todoDetails : 'Get Fresh Apples',
//     todoFinishBy : 'Afternoon'
//   }
// ]

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      editItem:{
        id:null,
        details: null,
        userid: null
      }
    };
    this.handleEdit = this.handleEdit.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }
  getList() {
    axios.get('http://127.0.0.1:8848/api/users/1/todos').then((result) =>{
      this.setState(()=>{
        return { todos: result.data.data }
      })
    })
  }
  componentDidMount() {
    this.getList();
  }

  handleDelete(index) {
    // fetch('http://127.0.0.1:8848/api/users/1/todos/'+index,{
    //   method: 'DELETE',
    // }).then(()=>{
    //   this.getList();
    // })
    axios.delete('http://127.0.0.1:8848/api/users/1/todos/'+index).then(()=>{
      this.getList();
    })
  }

  handleAdd(todo) {
    this.setState({ todos: [...this.state.todos, todo] })
  }
  handleEdit(todo){
    this.setState({
      editItem:todo
    })
    this.getList()
  }

  handleSearch(result){
    this.setState({ todos: result})
  }


  updateEditId(item){
    this.setState({ editItem:item })
  }


  render() {
    console.log('edit',this.state.editItem)
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Todo List</h1>
          <SearchTodo onSearchTodo={this.handleSearch}></SearchTodo>
        </header>
        <h4>Total todo-list count:{this.state.todos.length}</h4>
        <ul className="todo-list">
          {this.state.todos.map((todo, index) =>
            <li className="list-item" key={index}>
              <h4>{todo.todoTitle}</h4>
              <p className="list-item-info">{'UserID: ' + todo.userId}</p>
              <p className="list-item-info">{'ListID: ' + todo.id}</p>
              <p className="list-item-info">{'Details: ' + todo.details}</p>
              <button className="edit-btn" onClick={this.updateEditId.bind(this, todo)}>Edit</button>
              <button className="delete-btn" onClick={this.handleDelete.bind(this, todo.id)}>Delete</button>
            </li>
          )}
        </ul>
        {this.state.editItem.id!=null?<EditComponent toEdit={this.state.editItem} onEditTodo={this.handleEdit}/>:null}
        <AddTodo onAddTodo={this.handleAdd}></AddTodo>
      </div>
    );
  }
}

export default App;
