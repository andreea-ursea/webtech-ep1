import React, { Component } from 'react'

class TagForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      textTag : ''
      }
    this.handleChange = (event) => {
      this.setState({
        [event.target.name] : event.target.value
      })
    }
  }
  render() {
    return (
      <div>
        Tag : <input type="text" name="textTag" ref="form" onChange={this.handleChange}/>
        <input type="button" value="Add"  id="AddBtn" onClick={() => this.props.onAdd({textTag : this.state.textTag})}/>
        
        <input type="button" value="Clear" id="AddBtn" onClick={() =>this.refs.form.value=""}/>

      </div>
    )
  }
}

export default TagForm
