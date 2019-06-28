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
      id: props.id || null
    };
    console.log('constructored from BookForm')
  }

  componentDidMount() {
    console.log('DidMount from BookForm')
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
    console.log('BookForm rendered');
    console.log(this.state);
      return (
        <div className="book-form">
          {this.state.id ? <h1>Edit</h1> : <h1>Create New</h1>}
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
              
              {this.state.id ?
              <button onClick={this.handleClick}>Update</button> :
              <button onClick={this.handleClick}>Create New</button>}
              
              <button onClick={this.handleCancel}>Cancel</button>
          </form>
        </div>
      );
    }
  }

export default BookForm;