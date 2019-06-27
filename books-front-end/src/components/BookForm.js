import React, { Component } from 'react';
import './BookForm.css';

class BookForm extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      title: props.title || '',
      author: props.author || '',
      genre: props.genre || '',
      price: props.price || 0,
      id: props.id || 0
    };
  }

  handleClick = (e) => {
    e.preventDefault();
    const newBook = {
        title: this.state.title, 
        author: this.state.author, 
        genre: this.state.genre, 
        price: this.state.price,
        id: this.state.id 
    }
    console.log(newBook)
    this.props.addNewBook(newBook)
  }

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value })
  }

  render(){
    console.log(this.state);
      return (
        <div className="book-form">
          <h1>Book Form</h1>
          <form>
            <label htmlFor="title">Title</label>
              <input 
                onChange={this.handleChange} 
                type="text" 
                id="title" 
                placeholder="title" 
                value={this.state.title} 
              />
              <label htmlFor="author">Author</label>
              <input 
                onChange={this.handleChange} 
                type="text" 
                id="author" 
                placeholder="author" 
                value={this.state.author} 
              />
              <label htmlFor="genre">Genre</label>
              <input 
                onChange={this.handleChange} 
                type="text" 
                id="genre" 
                placeholder="genre" 
                value={this.state.genre} 
              />
              <label htmlFor="price">Price</label>
              <input 
                onChange={this.handleChange} 
                type="number" 
                id="price" 
                placeholder="price" 
                value={this.state.price} 
              />

              <button onClick={this.handleClick}>Save</button>
              <button onClick={this.handleCancel}>Cancel</button>
          </form>
        </div>
      );
    }
  }

export default BookForm;