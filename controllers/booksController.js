const Book = require('../models/Book')
const { createThisManyFakeBooks} = require('../utils/utils')

const getAllBooks = async (req, res) => {
  const books = await Book.find()
  res.status(200).send(books)
}

const getOneBook = async (req, res) => {
  const { id } = req.params
  const book = await Book.findOne({ id })
  console.log(book._id)
  res.status(200).send(book)
}

const createNewBook = async (req, res) => {
  try {
    const { id, title, genre, author, price } = req.body
    const newBook = await Book.create({ id, title, genre, author, price })
    res.status(201).send(`Successfully created book ${ newBook.title }`)
  } catch(err) {
    res.status(400).send(`There has been an error ${ err }`)
  }
}

const seedBooks = async (req, res) => {
  // drop all books
  await Book.deleteMany()
  const newBooks = createThisManyFakeBooks(10)
  try {
    const books = await Book.insertMany(newBooks)
    return res.status(201).send(books)
  } catch(err){
    return res.status(400).send(err)
  }
}

const updateOneBook = async (req, res) => {
  const { id } = req.params
  const payload = req.body
  
  try{
    await Book.updateOne({id}, payload)
    res.status(200).send(`Sucessfully updated`)
  } catch(err){
    res.status(400).send(err)
  }
}

const deleteOneBook = async (req, res) => {
  const { id } = req.params
  try{
    await Book.findOneAndRemove({id}, {useFindAndModify: false})
    return res.status(200).send(`Book was successfully deleted`)
  } catch(err){
    console.log(err)
    return res.status(400).send(`There has been an error: ${err}`)
  }
}

module.exports = {
  getAllBooks,
  getOneBook,
  createNewBook,
  seedBooks,
  updateOneBook,
  deleteOneBook
}
