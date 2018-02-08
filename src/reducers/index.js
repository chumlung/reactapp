import moment from 'moment';

const INITIAL_STATE ={
  fetching: false,
  fetched: false,
  error: null,
  categories:[],
  todos:[],
  singleTodo:{
    listID: null,
    categoryID: null,
    details: '',
    priority: '',
    date: moment()
  },
  singleCategory: {
    name: ''
  },
  currentUser:{
    userID: 0,
    email: ''
  },
  currentCategory: {
    categoryID: null
  },
  metadata:{
    page: 1,
    pageCount: null,
    pageSize: 5
  },
  searchValue: ''
}

export default (state=INITIAL_STATE,action)=>{
  switch(action.type){
    case 'FETCH_TODO_PENDING':{
      return {
        ...state,
        fetching:true,
        fetched:false
      }
    }
    case 'FETCH_TODO_FULFILLED':{
      return {
        ...state,
        todos:action.payload.data.data,
        fetched:true,
        fetching:false
      } 
    }
    case 'FETCH_TODO_REJECTED':{
      return {
        ...state,
        fetching:false,
        error:action.payload
      }
    }
    case 'ADD_TODO_PENDING':{
      return {
        ...state,
        fetching:true,
        fetched:false
      }
    }
    case 'ADD_TODO_FULFILLED':{
      let categoryIndex = state.categories.findIndex(category => category.id === action.payload.data.data.categoryId);
      let changedCategory;
      if (state.categories[categoryIndex].todo){
        changedCategory = {
          ...state.categories[categoryIndex],
          todo:[
            ...state.categories[categoryIndex].todo,
            action.payload.data.data
          ]
        }
      } else {
        let todo = [
          action.payload.data.data
        ]
        changedCategory = {
          ...state.categories[categoryIndex],todo
        }
      } 
      return {
        ...state,
        categories:[
          ...state.categories.slice(0, categoryIndex),
          changedCategory,
          ...state.categories.slice(categoryIndex+ 1)
        ],	

        fetched: true,
        fetching: false
      } 
    }
    case 'ADD_TODO_REJECTED':{
      return {
        ...state,
        fetching:false,
        error:action.payload
      }
    }
    case 'DELETE_TODO_PENDING':{
      return {
        ...state,
        fetching:true,
        fetched:false
      }
    }
    case 'DELETE_TODO_FULFILLED':{
      return {
        ...state,
        todos:[...state.todos.filter(todo=>todo.id !== parseInt(action.payload.data.deleteID,10))],
        fetched:true,
        fetching:false
      } 
    }
    case 'DELETE_TODO_REJECTED':{
      return {
        ...state,
        fetching:false,
        error:action.payload
      }
    }
    case 'SEARCH_TODO_PENDING':{
      return {
        ...state,
        fetching:true,
        fetched:false
      }
    }
    case 'SEARCH_TODO_FULFILLED':{
      return {
        ...state,
        todos:action.payload.data.data,
        metadata:{
          ...state.metadata,
          page : action.payload.data.metadata.page,
          pageCount : action.payload.data.metadata.pageCount,
          pageSize : action.payload.data.metadata.pageSize
        }
      } 
    }
    case 'SEARCH_TODO_REJECTED':{
      return {
        ...state,
        fetching:false,
        error:action.payload
      }
    }
    case 'FETCH_CATEGORIES_PENDING':{
      return {
        ...state,
        fetching:true,
        fetched:false
      }
    }
    case 'FETCH_CATEGORIES_FULFILLED':{
      return {
        ...state,
        categories:action.payload.data.data,
        fetched:true,
        fetching:false
      } 
    }
    case 'FETCH_CATEGORIES_REJECTED':{
      return {
        ...state,
        fetching:false,
        error:action.payload
      }
    }
    case 'ADD_CATEGORIES_PENDING':{
      return {
        ...state,
        fetching:true,
        fetched:false
      }
    }
    case 'ADD_CATEGORIES_FULFILLED':{
      return {
        ...state,
        categories:[...state.categories,action.payload.data.data],
        fetched:true,
        fetching:false
      } 
    }
    case 'ADD_CATEGORIES_REJECTED':{
      return {
        ...state,
        fetching:false,
        error:action.payload
      }
    }

    case 'CHANGE_SEARCH_VALUE':{
      let event = action.payload;
      let target = event.currentTarget;
      let value = target.value;
      let name = target.name;
      return{
        ...state,
        [name]:value
      }
    }
    case 'EDIT_TODO_PENDING':{
      return {
        ...state,
        fetching:true,
        fetched:false
      }
    }
    case 'EDIT_TODO_FULFILLED':{
      let foundId;
      state.categories.forEach(category => {
        category.todo.forEach(todo => {
          if (todo.id === action.payload.data.data.id){
            foundId = todo.categoryId;
          }
        })
      })
      let categoryIndex = state.categories.findIndex(category => category.id === foundId);
      let todoIndex = state.categories[categoryIndex].todo.findIndex(item =>
        item.id === action.payload.data.data.id
      )
      let changedCategory = {
        ...state.categories[categoryIndex],
        todo:[
          ...state.categories[categoryIndex].todo.slice(0, todoIndex),
          action.payload.data.data,
          ...state.categories[categoryIndex].todo.slice(todoIndex + 1)
        ]
      }
      return {
        ...state,
        categories:[
          ...state.categories.slice(0, categoryIndex),
          changedCategory,
          ...state.categories.slice(categoryIndex+ 1)
        ],	

        fetched: true,
        fetching: false
      }
    }
    case 'EDIT_TODO_REJECTED':{
      return {
        ...state,
        fetching:false,
        error:action.payload
      }
    }
    case 'LOGIN_PENDING':{
      return {
        ...state,
        fetching:true,
        fetched:false
      }
    }
    case 'LOGIN_FULFILLED':{
      localStorage.setItem('userID',action.payload.data.data.userId)
      localStorage.setItem('accessToken',action.payload.data.accessToken)
      return {
        ...state,
        currentUser:{
          ...state.currentUser,userID:action.payload.data.data.userId
        },
        fetched:true,
        fetching:false
      } 
    }
    case 'LOGIN_REJECTED':{
      return {
        ...state,
        fetching:false,
        error:action.payload
      }
    }
    case 'LOGOUT_PENDING':{
      return {
        ...state,
        fetching:true,
        fetched:false
      }
    }
    case 'LOGOUT_FULFILLED':{
      localStorage.setItem('userID',0);
      localStorage.removeItem('accessToken');
      return {
        ...state,
        currentUser:{
          userID:0,
          email:''
        },
        fetched:true,
        fetching:false
      } 
    }
    case 'LOGOUT_REJECTED':{
      return {
        ...state,
        fetching:false,
        error:action.payload
      }
    }
    case 'HANDLE_CHANGE':{
      let event = action.payload;
      let target = event.target;
      let value = target.value;
      let name = target.name;
      return {
        ...state,
        singleTodo:{...state.singleTodo,
          [name]:value
        }
      }    
    }
    case 'CHANGE_CAT_NAME':{
      let event = action.payload;
      let target = event.target;
      let value = target.value;
      let name = target.name;
      return {
        ...state,
        singleCategory:{...state.singleCategory,
          [name]:value
        }
      }    
    }
    case 'HANDLE_COMBO_CHANGE':{
      return {
        ...state,
        singleTodo: {
          ...state.singleTodo,
          priority: action.payload
        }
      }   
    }
    case 'CHANGE_TODO_DATE':{
      return{
        ...state,
        singleTodo:{...state.singleTodo,
          date:action.payload
        }
      }
    }
    case 'RESET_SINGLE_TODO':{
      return{
        ...state,
        singleTodo:{...state.singleTodo,
            listID: null,
            details: ''
        }
      }
    }
    case 'RESET_SINGLE_CATEGORY':{
      return{
        ...state,
        singleCategory:{...state.singleCategory,
            name: ''
        }
      }
    }
    case 'STORE_EDIT_VALUES':{
      return {
        ...state,
        singleTodo:{
          listID:action.payload.id,
          userID:action.payload.userId,
          categoryID: action.payload.categoryId,
          details:action.payload.details
        }
      }
    }
    case 'CHANGE_CURRENT_USER':{
      let event = action.payload;
      let target = event.target;
      let value = target.value;
      let name = target.name;
      return{
        ...state,
        currentUser:{
          ...state.currentUser,[name]:value
        }
      } 
    }
    case 'STORE_EDIT_DATE':{
      return {
        ...state,
        singleTodo: {
          listID: action.payload.id,
          userID: action.payload.userId,
          categoryID: action.payload.categoryId,
          date: moment(action.payload.date.substring(0,10),'YYYY-MM-DD')
        }
      }
    }
    case 'STORE_EDIT_PRIORITY':{
      return {
        ...state,
        singleTodo: {
          listID: action.payload.id,
          userID: action.payload.userId,
          categoryID: action.payload.categoryId,
          priority: action.payload.priority
        }
      }
    }
    case 'STORE_CURRENT_CATEGORY': {
      return {
        ...state,
        currentCategory: {
          categoryID: action.payload
        }
      }
    }
    case 'RESET_CURRENT_CATEGORY': {
      return {
        ...state,
        currentCategory: {
          categoryID: null
        }
      }
    }
    default:
      return state;
  }
}