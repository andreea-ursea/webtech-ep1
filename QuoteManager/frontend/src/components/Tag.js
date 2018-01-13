import React, {Component} from 'react'

class Tag extends Component{
  constructor(props){
    super(props)
    this.state = {
      isEditing : false,
      tagTextTag : ''
    }
    this.handleChange = (event) => {
      this.setState({
        [event.target.name] : event.target.value
      })
    }
  }
  componentDidMount(){
    this.setState({
      tagTextTag : this.props.tag.textTag,
    })
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      isEditing : false
    })
  }
  render(){
    if (!this.state.isEditing){
      return (
        <div>
          <h5>{this.props.tag.textTag}</h5>
          <div>
            <input type="button" value="Delete" id="DeleteBtn" onClick={() => this.props.onDelete(this.props.tag.id)} />
            <input type="button" value="Edit" id="EditBtn" onClick={() => this.setState({isEditing : true})}/>
          </div>
        </div>  
      )
    }
    else{
      return (
        <div>
            <input type="text" name="tagTextTag" onChange={this.handleChange} value={this.state.tagTextTag}/> 
            <input type="button" value="Cancel" id="CancelBtn" onClick={() => this.setState({isEditing : false})}/>
            <input type="button" value="Save" id="SaveBtn" onClick={() => this.props.onSave(this.props.tag.id, {textTag : this.state.tagTextTag})} />
        </div>
      )
    }
  }
}

export default Tag