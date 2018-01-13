import React, { Component } from 'react'

class QuoteForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      quoteLanguage : '',
      quoteTextQuote : '',
      quoteAuthor: ''
    }
    this.handleChange = (event) => {
      this.setState({
        [event.target.name] : event.target.value
      })
      console.warn(this.state)
    }
  
  
  }
  
  render() {
    return (
      <div id="detAut">
        Language :<input type="text" ref="form" name="quoteLanguage" onChange={this.handleChange}/><br/>
        TextQuote :<input type="text" ref="form"  name="quoteTextQuote" onChange={this.handleChange}/><br/>
        Author :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" ref="form" name="quoteAuthor" onChange={this.handleChange}/><br/>

        <input type="button" value="Add" id="AddBtn" onClick={() => this.props.onAdd({language : this.state.quoteLanguage, textQuote : this.state.quoteTextQuote,
                                                                            author:this.state.quoteAuthor})}/>
                                                                            
       <input type="button" value="Clear" id="AddBtn" onClick={() =>this.refs.form.value=""}/>
                                                                   
      </div>
    )
  }
}

export default QuoteForm
