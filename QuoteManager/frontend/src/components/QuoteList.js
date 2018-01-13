import React, { Component } from 'react'
import Quote from './Quote'
import QuoteForm from './QuoteForm'
import QuoteStore from '../stores/QuoteStore'
import {EventEmitter} from 'fbemitter'
import QuoteDetails from './QuoteDetails'

const ee = new EventEmitter()
const store = new QuoteStore(ee)

function addQuote(quote){
  store.addOne(quote)
}

function deleteQuote(id){
  store.deleteOne(id)
}

function saveQuote(id, quote){
  store.saveOne(id, quote)
}

class QuoteList extends Component {
  constructor(props){
    super(props)
    this.state = {
      quotes : [],
      detailsFor : -1,
      selected : null
    }
    this.selectQuote = (id) => {
      store.getOne(id)
      ee.addListener('SINGLE_QUOTE_LOAD', () => {
        this.setState({
          detailsFor : store.selected.id,
          selected : store.selected
        })
      })
    }
    this.cancelSelection = () => {
      this.setState({
        detailsFor : -1
      })
    }
  }
  componentDidMount(){
    store.getAll()
    ee.addListener('QUOTE_LOAD', () => {
      this.setState({
        quotes : store.content
      })
    })
  }
  render() {
    if (this.state.detailsFor === -1){
      return (
        <div>
          <div id="alternat">
            <h3>List of quotes</h3>
            {
              this.state.quotes.map((q) => 
                <Quote quote={q} key={q.id} onDelete={deleteQuote} onSave={saveQuote} onSelect={this.selectQuote} />
              )
            }
          </div>
          <div>
            <QuoteForm onAdd={addQuote}/>
          </div>
        </div>
      )
    }
    else{
      return (
        <div>
          <QuoteDetails onCancel={this.cancelSelection} quote={this.state.selected}/>
        </div>  
      )
    }
  }
}

export default QuoteList
