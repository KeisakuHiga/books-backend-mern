import React, { Component } from 'react';
import './App.css';
import BookForm from './components/BookForm'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      books: [],
      adding: false,
      selectedBook: null
    };
  }

  loadBooks = () => {
    console.log('loading books')
    const url = 'http://localhost:5000/books';
    fetch(url)
    .then(resp => resp.json())
    .then(data => {
      console.log(data)
      this.setState({ books: data, adding: false, selectedBook: null });
    })
  }

  componentDidMount() {
    console.log('App is running componentDidMount');
    this.loadBooks();
  }
    
  handleEditClick(book) {
    console.log(book)
    this.setState({ selectedBook: book })
  }

  bookList = () => {
    return (
      <div className="book-list">
          {this.state.books.map((item, index) => (
          <div onClick={() => this.handleEditClick(item)} key={index}>
            {item.genre}: {item.title} by {item.author} (rrp ${item.price}) (id: {item.id})
          </div>
        ))}
        </div>
    )
  }

  handleClick = () => {
    // console.log('button clicked')
    this.setState({ adding: true });
  }

  addNewBookHandler = (newBook) => {
    console.log(newBook);
    if (newBook.id) {
      this.updateBook(newBook);
    }
    else {
      const newId = this.state.books.length + 1;
      newBook.id = newId;
      this.createBook(newBook);
    }
  }

  createBook = (book) => {
    const url = 'http://localhost:5000/books/newbook';
    const data = JSON.stringify(book);
    console.log(data)
      return fetch(url, {
          method: 'POST', 
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          },
          body: data, 
      })
      .then(response => {
          this.loadBooks();
        }
      ) 
  }

  updateBook(book){
    const url = `http://localhost:5000/books/${book.id}`;
    const data = JSON.stringify(book);
    console.log(data)
      return fetch(url, {
          method: 'PUT', 
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          },
          body: data, 
      })
      .then(response => {
          this.loadBooks();
        }
      )
  }

  render() {
    console.log('App is running render');
    return (
      <div>
        <h1>Books {this.state.books.length}</h1>
        <button onClick={this.handleClick}>Add</button>
        {this.state.adding ? 
          <BookForm addNewBook={this.addNewBookHandler} /> : 
          this.state.selectedBook ? 
            <BookForm 
              addNewBook={this.addNewBookHandler} 
              title={this.state.selectedBook.title} 
              author={this.state.selectedBook.author} 
              genre={this.state.selectedBook.genre} 
              price={this.state.selectedBook.price} 
              id={this.state.selectedBook.id} 
          /> : 
          this.bookList()
        }
      </div>
    );
  }
}

export default App;
