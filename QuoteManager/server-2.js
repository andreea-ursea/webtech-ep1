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

Tag.belongsToMany(Quote, {through : 'quote_tag'})
Quote.belongsToMany(Tag, {through : 'quote_tag'})


const app = express()
app.use(bodyParser.json())


//----------CREEZ TABELELE-------------
app.get('/create', (req, res, next) => {
	sequelize.sync({force : true})
		.then(() => res.status(201).send('created'))
		.catch((err) => next(err))
})

//-----------AFISEZ QUOTES-----------
app.get('/quotes', (req, res, next) => {
	Quote.findAll()
		.then((quotes) => res.status(200).send(quotes))
		.catch((err) => next(err))
})

//--------INSEREZ UN QUOTE------------
app.post('/quotes', (req, res, next) => {
	Quote.create(req.body)
		.then(() => res.status(201).send('created'))
		.catch((err) => next(err))
})

//-------CAUT UN QUOTE DUPA UN ID DAT---------
app.get('/quotes/:id', (req, res, next) => {
	Quote.findById(req.params.id, {include : [Tag]})
		.then((quote) => {
			if(quote){
				res.status(200).json(quote)
			}
			else{
				res.status(404).send('not found')
			}
		})
		.catch((err) => next(err))	
})

//-----CAUT TAG-URILE DE LA UN ANUMIT QUOTE CU ID-UL DAT------
app.get('/quotes/:id/tags', (req, res, next) => {
	Quote.findById(req.params.id)
		.then((quote) => {
			if(quote){
				return quote.getTags()
			}
			else{
				res.status(404).send('not found')
			}})
		.then((tags) => res.status(200).send(tags))
		.catch((err) => next(err))
})

//----INSEREZ UN TAG LA UN ANUMIT QUOTE CU ID-UL DAT
app.post('/quotes/:id/tags', (req, res, next) => {
	let q
	Quote.findById(req.params.id)
		.then((quote) => {
			if(quote){
				q = quote
				return Tag.create(req.body)
			}
			else{
				res.status(404).send('not found')
			}})
		.then((tag) => {
			q.addTag(tag)
			res.status(201).send('created')
		})
		.catch((err) => next(err))

})
//---RETURNEZ TAG-URILE UNUI ANUMIT QUOTE CU ID-UL DAT----
app.get('/tags/:id/quotes', (req, res, next) => {
	Tag.findById(req.params.id)
		.then((tag) => {
			if (tag){
				return tag.getQuotes()
			}
			else{
				res.status(404).send('not found')
			}
		})
		.then((quotes) => res.status(200).send(quotes))
		.catch((err) => next(err))
})


app.use((err, req, res, next) => {
	console.warn(err)
	res.status(500).send('some error')
})

app.listen(8080)