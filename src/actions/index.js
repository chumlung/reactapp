export function getTodo(payload){
  return{
    type: "FETCH_TODO",
    payload
  }
}

export function addTodo(payload){
  return{
    type: "ADD_TODO",
    payload
  }
}

export function deleteTodo(payload){
  return{
    type: "DELETE_TODO",
    payload
  }
}

export function editTodo(payload){
  return{
    type: "EDIT_TODO",
    payload
  }
}

export function searchTodo(payload){
  return{
    type: "SEARCH_TODO",
    payload
  }
}

export function handleChange(event){
  return{
    type: "HANDLE_CHANGE",
    payload : event
  }
}

export function resetSingleTodo(){
  return{
    type: "RESET_SINGLE_TODO"
  }
}

export function storeEditValues(todo){
  return{
    type:"STORE_EDIT_VALUES",
    payload: todo
  }
}

export function changeSearchValue(event){
  return{
    type:"CHANGE_SEARCH_VALUE",
    payload: event
  }
}

export function changeCurrentUserValue(event){
  return{
    type:"CHANGE_CURRENT_USER",
    payload: event
  }
}

export function tryLoggingIn(payload){
  return{
    type:"LOGIN",
    payload
  }
}
export function logOut(payload){
  return{
    type:"LOGOUT",
    payload
  }
}
export function changeTodoDate(payload){
  return{
    type:"CHANGE_TODO_DATE",
    payload
  }
}
