import React, { Component } from 'react'
import TagStore from '../stores/TagStore'
import {EventEmitter} from 'fbemitter'
import Tag from './Tag'
import TagForm from './TagForm'

const ee = new EventEmitter()
const store = new TagStore(ee)

class QuoteDetails extends Component {
  constructor(props){
    super(props)
    this.state = {
      tags : []
    }
    this.addTag = (tag) => {
      store.addOne(this.props.quote.id, tag)
    }
    this.saveTag = (id, tag) => {
      store.saveOne(this.props.quote.id, id, tag)
    }
    this.deleteTag = (id) => {
      store.deleteOne(this.props.quote.id, id)
    }
  }
  componentDidMount(){
    store.getAll(this.props.quote.id)
    ee.addListener('TAG_LOAD', () => {
      this.setState({
        tags : store.content
      })
    })
  }
  render() {
    return (
      <div>
        <div><br/><br/>
          Tags for <i>" {this.props.quote.textQuote} "</i> by <i>{this.props.quote.author}</i>
        </div>
        {
          this.state.tags.map((t) => 
            <Tag tag={t} onDelete={this.deleteTag} onSave={this.saveTag}/>
          )
        }
        <p>Add a new one </p>
          <TagForm onAdd={this.addTag} />
        <input type="button" value="Back" id="BackBtn" onClick={() => this.props.onCancel()} />
      </div>
    )
  }
}

export default QuoteDetails
