import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'
import Home from './Home'
import Search from './Search'

class BooksApp extends React.Component {
  // each array holds books that are in a specific shelf; information in stored in local storage
    state = {
        currentlyReading: JSON.parse(localStorage.getItem('currentlyReading')) || [],
        wantToRead: JSON.parse(localStorage.getItem('wantToRead')) || [],
        read: JSON.parse(localStorage.getItem('read')) || []
    }

  // adds book from Search page to Home page on a specific shelf; state and local storage are updated
  addBook = (book, value) => { 
        value !== 'none' && 
        this.setState((prevState) => ({
          [value]: prevState[value].concat(book)
        }), () => {
          localStorage.setItem('currentlyReading', JSON.stringify(this.state.currentlyReading))
            localStorage.setItem('wantToRead', JSON.stringify(this.state.wantToRead))
            localStorage.setItem('read', JSON.stringify(this.state.read))
        });
    };

  // if a book is moved to another shelf, this function removes it from the previous shelf
  removeBook = (book, value) => {
      this.setState((prevState) => ({
            currentlyReading: prevState.currentlyReading.filter((b) => {
            return b.id !== book.id
          }),
            wantToRead: prevState.wantToRead.filter((b) => {
            return b.id !== book.id
          }),
            read: prevState.read.filter((b) => {
            return b.id !== book.id
          })
      }));
    };

  moveBook = (book, value) => {
      this.removeBook(book, value);
      this.addBook(book, value);
    };
  
  render() {
        return (
          <Router>
            <div>
                <Route exact path="/" render={() => (
                  <Home 
                    moveBook={this.moveBook} 
                    currentlyReading={this.state.currentlyReading}
                    wantToRead={this.state.wantToRead}
                    read={this.state.read}
                  />
                )} /> 
                <Route path="/search" render={() => (
                  <Search 
                    moveBook={this.moveBook} 
                    currentlyReading={this.state.currentlyReading}
                    wantToRead={this.state.wantToRead}
                    read={this.state.read}
                  />
                )} />
            </div> 
          </Router>
        )
  }
}

export default BooksApp
