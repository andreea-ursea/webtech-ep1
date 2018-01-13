import axios from 'axios'

const SERVER = 'https://workspace-super-hero-audreyh.c9users.io'

class TagStore{
  constructor(ee){
    this.ee = ee
    this.content = []
  }
  getAll(quoteId){
    axios(SERVER + '/quotes/' + quoteId + '/tags')
      .then((response) => {
        this.content = response.data
        this.ee.emit('TAG_LOAD')
      })
      .catch((error) => console.warn(error))
  }
  addOne(quoteId, tag){
    axios.post(SERVER + '/quotes/' + quoteId + '/tags', tag)
      .then(() => this.getAll(quoteId))
      .catch((error) => console.warn(error))
  }
  deleteOne(quoteId, tagId){
    axios.delete(SERVER + '/quotes/' + quoteId + '/tags/' + tagId) 
      .then(() => this.getAll(quoteId))
      .catch((error) => console.warn(error))
  }
  saveOne(quoteId, tagId, tag){
    axios.put(SERVER + '/quotes/' + quoteId + '/tags/' + tagId, tag)
      .then(() => this.getAll(quoteId))
      .catch((error) => console.warn(error))
  }
}

export default TagStore




