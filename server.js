const express = require('express')
const app = new express()
const mongoose = require('mongoose')
const PORT = 5000
const cors = require('cors')

const mongoURI = 'mongodb://localhost/booksdb'

const booksRoutes = require('./routes/booksRoutes')

app.use(cors())
app.use(express.json())

app.use('/', booksRoutes)

mongoose.connect(mongoURI, { useNewUrlParser: true }, (err) => {
  if(err) console.log(`There has been an ${err}`)
  console.log('Connected to MongoDB')
})

app.listen( PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
