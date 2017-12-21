import React, { Component } from 'react'
import axios from 'axios';
class EditForm extends Component{
  constructor(props){
    super(props);

    this.state ={
      editItem : {
        id: null,
        details: null,
        userId: null
      }
    }


    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }


  handleChange(event){   
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      editItem:{
        id: this.props.toEdit.id,
        [name]:value,
        userId: this.props.toEdit.userid
      }
    })
  }
  handleSubmit(event){
    event.preventDefault();
    axios.put('http://127.0.0.1:8848/api/users/1/todos/'+this.state.editItem.id, {
        userID: this.state.editItem.userId,
        details: this.state.editItem.details
      }).then(()=>{
        this.setState({
          editItem:{
            id:null,
            userId: null,
            details: null
          }
        })
        this.props.onEditTodo(this.state.editItem);
    })
  }
  
  componentWillReceiveProps(nextProps){
    if(nextProps){
      this.setState({
        editItem: nextProps.toEdit
      })
    }
  }
  componentWillMount(){
    this.setState({editItem: this.props.toEdit})
  }

  render(){
    return(
      <form onSubmit = {this.handleSubmit}>
      <div className="edit-todo">
        <input name="details" type="text" id="inputDetails" value={this.state.editItem.details} onChange={this.handleChange} placeholder={this.state.editItem.details}></input>
        <button className='save-btn' onClick={this.handleSubmit}>Save</button>
        <button className='cancel-btn'>Cancel</button>
      </div>
      </form>
    )
  }
}

export default EditForm
