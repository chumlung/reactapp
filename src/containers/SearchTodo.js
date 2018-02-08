import React from 'react';
import { connect } from 'react-redux';

import axios from '../axioService';
import { searchTodo,getTodo,changeSearchValue } from '../actions';

let delay = 500;
let callSearch;

const SearchTodo=(props)=>{

  let startSearch=()=>{
    callSearch = setTimeout(()=>{
      props.searchTodo(props.todos.currentUser.userID,props.todos.searchValue)
    },delay)
  }

  let resetDelay=()=>{
    clearTimeout(callSearch)
    delay = 500;
  }

  return(
    <div className="search-todo">
    <input name="searchValue" type="text" id="inputSearchKey"
      value={props.todos.searchValue}
      onChange={props.changeSearchValue}
      onKeyUp={startSearch}
      onKeyDown={resetDelay}
      placeholder="Search.."></input>
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
    searchTodo: (uID,value)=>{
      if (value){
        dispatch(searchTodo(
          axios.get('http://127.0.0.1:8848/api/users/'+uID+'/todos/search?searchValue='+ value +'')
          )
        )
      }
      else{
        dispatch(getTodo(axios.get('http://127.0.0.1:8848/api/users/'+uID+'/todos')))
      }
    },
    changeSearchValue: (event)=>{
      dispatch(changeSearchValue(event));
    }
  }
}
const searchComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchTodo)

export default searchComponent;
