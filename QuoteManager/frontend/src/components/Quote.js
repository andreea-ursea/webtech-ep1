import React, { Component } from 'react'

class Quote extends Component {
  constructor(props){
    super(props)
    this.state = {
      isEditing : false,
      language : '',
      textQuote : '',
      author: ''
    }
    this.handleChange = (event) => {
      this.setState({
        [event.target.name] : event.target.value
      })
    }
  }
  componentDidMount(){
    this.setState({
      language : this.props.quote.language,
      textQuote : this.props.quote.textQuote,
      author:this.props.quote.author
    })
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      isEditing : false
    })
  }
  render() {
    if (!this.state.isEditing){
      return (
        <div>
          <i>" {this.props.quote.textQuote} " </i> &nbsp; by  <i> {this.props.quote.author} </i>
          <input type="button" value="Delete" id="DeleteBtn" onClick={() => this.props.onDelete(this.props.quote.id)} />
          <input type="button" value="Edit" id="EditBtn" onClick={() => this.setState({isEditing : true})}/>
          <input type="button" value="Details" id="DetailsBtn" onClick={() => this.props.onSelect(this.props.quote.id)}/>
        </div>
      )
    }
    else{
      return (
        <div>
          <input type="text" name="textQuote" onChange={this.handleChange} value={this.state.textQuote}/> 
          is the masterpiece of  
          <input type="text" name="author" onChange={this.handleChange} value={this.state.author}/>
          <input type="button" value="Cancel" id="CancelBtn" onClick={() => this.setState({isEditing : false})}/>
          <input type="button" value="Save" id="SaveBtn" onClick={() => this.props.onSave(this.props.quote.id, {language : this.state.language,
                                                            textQuote : this.state.textQuote,author:this.state.author})} />
        </div>  
      )
    }
  }
}

export default Quote
