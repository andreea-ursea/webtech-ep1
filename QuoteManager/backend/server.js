const express = require('express'),
      bodyParser = require('body-parser'),
      Sequelize = require('sequelize')
      
const sequelize = new Sequelize('quote_manager','root','',{
  dialect : 'mysql',
  define : {
    timestamps : false
  }
})

const Quote = sequelize.define('quote',
{
  language : 
  {
    type : Sequelize.STRING,
    allowNull : false,
  },
  textQuote : 
  {
    type : Sequelize.STRING,
    allowNull : false,
    validate : 
    {
      len : [2,40]
    }
  },
  author : 
  {
    type : Sequelize.STRING,
    allowNull : false,
    validate : 
    {
      len : [3,40]
    }
  },
  timestamp : 
  {
    type : Sequelize.DATE,
    allowNull : false,
    defaultValue : Sequelize.NOW
  }
    
})


const Tag = sequelize.define('tag',
{
  textTag : 
  {
    type : Sequelize.STRING,
    allowNull : false,
    validate : 
    {
      len : [3,20]
    }
  }
})
Quote.hasMany(Tag)

const app = express()
app.use(bodyParser.json())
app.use(express.static('../frontend/build'))


//---CREEZ TABELELE---
app.get('/create', (req, res, next) => {
  sequelize.sync({force : true})
    .then(() => res.status(201).send('created'))
    .catch((err) => next(err))
})

//---SELECT * QUOTES----
app.get('/quotes', (req, res, next) => {
  Quote.findAll()
    .then((quotes) => res.status(200).json(quotes))
    .catch((err) => next(err))
})

//---INSERARE IN QUOTES
app.post('/quotes', (req, res, next) => {
  Quote.create(req.body)
    .then(() => res.status(201).send('created'))
    .catch((err) => next(err))
})

//---SELECT * FROM QUOTES WHERE QUOTES.IDq==ID
app.get('/quotes/:id', (req, res, next) => {
  Quote.findById(req.params.id, {include : [Tag]}) .then((quote) => {
      if (quote){
        res.status(200).json(quote)
      }
      else{
        res.status(404).send('not found')
      }
    })
    .catch((err) => next(err))
})

//---UPDATE QUOTES SET LANGUAGE, TEXTQ, AUTHOR
app.put('/quotes/:id', (req, res, next) => {
  Quote.findById(req.params.id)
    .then((quote) => {
      if (quote){
        return quote.update(req.body, {fields : ['language', 'textQuote','author']})
      }
      else{
        res.status(404).send('not found')
      }
    })
    .then(() => {
      if (!res.headersSent){
        res.status(201).send('modified')
      }
    })
    .catch((err) => next(err))
})

//---DELETE FROM QUOTES WHERE QUOTES.ID=ID
app.delete('/quotes/:id', (req, res, next) => {
  Quote.findById(req.params.id)
    .then((quote) => {
      if (quote){
        return quote.destroy()
      }
      else{
        res.status(404).send('not found')
      }
    })
    .then(() => {
      if (!res.headersSent){
        res.status(201).send('removed')
      }
    })
    .catch((err) => next(err))
})

//---SELECT TAGS FROM QUOTES WHERE QUOTES.ID=ID
app.get('/quotes/:idQ/tags', (req, res, next) => {
  Quote.findById(req.params.idQ)
    .then((quote) => {
      if (quote){
        return quote.getTags()
      }
      else{
        res.status(404).send('not found')
      }
    })
    .then((tags) => {
      if (!res.headers){
        res.status(200).json(tags)
      }
    })
    .catch((err) => next(err))
})

//--INSERT TAGS IN QUOTES
app.post('/quotes/:idQ/tags', (req, res, next) => {
  Quote.findById(req.params.idQ)
    .then((quote) => {
      if (quote){
        let tag = req.body
        tag.quoteId = quote.id
        return Tag.create(tag)
      }
      else{
        res.status(404).send('not found')
      }
    })
    .then(() => {
      if (!res.headers){
        res.status(201).json('created')
      }
    })
    .catch((err) => next(err))
})

//---SELECT TAGS FROM QUOTES WHERE QUOTES.ID=ID1 AND TAGS.ID=ID2
app.get('/quotes/:idQ/tags/:idT', (req, res, next) => {
  Tag.findById(req.params.idQ, {
    where : {
      idQ : req.params.idQ
    }
  })
    .then((tag) => {
      if (tag){
        res.status(200).json(tag)
      }
      else{
        res.status(404).send('not found')
      }
    })
    .catch((err) => next(err))
})

//--UPDATE TAGS WHERE TAGS.ID=ID1 AND QUOTES.ID=ID2
app.put('/quotes/:idQ/tags/:idT', (req, res, next) => {
  Tag.findById(req.params.idQ)
    .then((tag) => {
      if (tag){
        return tag.update(req.body, {fields : ['textTag']})
      }
      else{
        res.status(404).send('not found')
      }
    })
    .then(() => {
      if (!res.headersSent){
        res.status(201).send('modified')
      }
    })
    .catch((err) => next(err))
})

//---DELETE FROM TAGS WHERE TAGS.ID=ID1 AND QUOTES.ID=ID2
app.delete('/quotes/:idQ/tags/:idT', (req, res, next) => {
  Tag.findById(req.params.idT)
    .then((tag) => {
      if (tag){
        return tag.destroy()
      }
      else{
        res.status(404).send('not found')
      }
    })
    .then(() => {
      if (!res.headersSent){
        res.status(201).send('removed')
      }
    })
    .catch((err) => next(err))
})

app.use((err, req, res, next) => {
  console.warn(err)
  res.status(500).send('some error')
})

app.listen(8080)