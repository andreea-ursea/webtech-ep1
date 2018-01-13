import React, { Component } from 'react'
import '../styles/App.css'
import QuoteList from './QuoteList'

class App extends Component {
   componentDidMount(){
    document.title = "Quote Manager"
    document.body.style = 'background: burlywood;';
    
    document.querySelector("link[rel='shortcut icon']").href = "/favicon.ico";
    
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Quote Manager</h1>
        </header>
        <QuoteList />
      </div>
    )
  }
}

export default App
