import axios from 'axios'


const SERVER = 'https://workspace-super-hero-audreyh.c9users.io'

class QuoteStore{
  constructor(ee){
    this.ee = ee
    this.content = []
    this.selected = null
  }
  getAll(){
    axios(SERVER + '/quotes')
      .then((response) => {
        this.content = response.data
        this.ee.emit('QUOTE_LOAD')
      })
      .catch((error) => console.warn(error))
  }
  addOne(quote){
    axios.post(SERVER + '/quotes', quote)
      .then(() => this.getAll())
      .catch((error) => console.warn(error))
  }
  deleteOne(id){
    axios.delete(SERVER + '/quotes/' + id) 
      .then(() => this.getAll())
      .catch((error) => console.warn(error))
  }
  saveOne(id, quote){
    axios.put(SERVER + '/quotes/' + id, quote)
      .then(() => this.getAll())
      .catch((error) => console.warn(error))
  }
  getOne(id){
    axios(SERVER + '/quotes/' + id)
      .then((response) => {
        this.selected = response.data
        this.ee.emit('SINGLE_QUOTE_LOAD')
      })
      .catch((error) => console.warn(error))
  }
}

export default QuoteStore




