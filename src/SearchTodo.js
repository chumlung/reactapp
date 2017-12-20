import React, { Component } from 'react'
import axios from 'axios';
class SearchTodo extends Component{
  constructor(props){
    super(props);

    this.state ={
      searchValue : ''
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
    console.log(this.state.searchValue)
    // fetch('http://127.0.0.1:8848/api/users/1/todos/search?searchValue='+this.state.searchValue,{
    //   method: 'GET'
    // }).then((result)=>{
    //   return result.json();
    // }).then((result)=>{
    //   this.props.onSearchTodo(result.data);
    //   console.log(result.data)
    // }).then(()=>{
    //   this.setState({
    //     searchValue : ''
    //   })
    // })
    axios.get('http://127.0.0.1:8848/api/users/1/todos/search?searchValue='+this.state.searchValue).then((result)=>{
      console.log(result)
      this.props.onSearchTodo(result.data.data);
    }).then(()=>{
      this.setState({
        searchValue : ''
      })
    })
  }


  render(){
    return(
      <form onSubmit = {this.handleSubmit}>
      <div className="search-todo">
        <input name="searchValue" type="text" id="inputSearchKey" value={this.state.searchValue} onChange={this.handleChange} placeholder="Search.."></input>
        <button onClick={this.handleSubmit}>Search</button>
      </div>
      </form>
    )
  }
}

export default SearchTodo
