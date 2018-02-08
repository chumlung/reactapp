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
export function getCategories(payload) {
  return {
    type: "FETCH_CATEGORIES",
    payload
  }
}
export function addCategories(payload) {
  return {
    type: "ADD_CATEGORIES",
    payload
  }
}
export function handleChange(event){
  return{
    type: "HANDLE_CHANGE",
    payload : event
  }
}
export function changeCatName(event){
  return{
    type: "CHANGE_CAT_NAME",
    payload : event
  }
}
export function handleComboChange(value){
  return{
    type: "HANDLE_COMBO_CHANGE",
    payload : value
  }
}

export function resetSingleTodo(){
  return{
    type: "RESET_SINGLE_TODO"
  }
}
export function resetSingleCategory(){
  return{
    type: "RESET_SINGLE_CATEGORY"
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
export function storeEditDate(toEditDate){
  return{
    type: "STORE_EDIT_DATE",
    payload: toEditDate
  }
}
export function storeEditPriority(toEditPriority){
  return{
    type: "STORE_EDIT_PRIORITY",
    payload: toEditPriority
  }
}
export function storeCurrentCategory(event) {
  return {
    type: "STORE_CURRENT_CATEGORY",
    payload: event
  }
}
export function resetCurrentCategory(){
  return{
    type: "RESET_CURRENT_CATEGORY"
  }
}
