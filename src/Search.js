import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import './App.css'
import Book from './Book'

class Search extends React.Component {
	// this state holds the text of the input field (Search is a controlled component) 
  	// and it holds the results from requests to the books API 
  	state = {
    	search: '',
      	results: []
    }

	// the lifecycle event componentDidUpdate is used for http requests to books API 
	componentDidUpdate(previousProps, previousState) {
		this.state.search && (
      	// this condition prevents the lifecycle event from creating an infinite loop 
      	previousState.search !== this.state.search) && (
          	BooksAPI.search(this.state.search.trim(), 20)
            .then((data) => {
              	// books without thumbnail are filtered out 
              	const filteredData = data.filter(book => book.imageLinks)
              	this.setState(() => ({
                    results: filteredData
                }))
            })
          	.catch((error) => {
                console.log(error);
                this.setState(() => ({
                	results: []
                }))
             })
        )
		// if the input field is empty, no results should be displayed
		!this.state.search && (
       	previousState.search !== this.state.search) && (
        	this.setState(() => ({
            	results: []
            }))
        )
  	}

	// handles input changes in the input field
	handleChange = query => {
		this.setState({search: query});
	};

	// this function makes sure that the correct option is selected; checks if book is already in one of the shelves
	checkShelves = id => {
    	if (this.props.currentlyReading && this.props.currentlyReading.find((b) => b.id === id)) {
       		return 'currentlyReading';
        } else if (this.props.wantToRead && this.props.wantToRead.find((b) => b.id === id)) {
            return 'wantToRead';
        } else if (this.props.read && this.props.read.find((b) => b.id === id)) {
            return 'read';
        } else {
        	return 'none';
        }
    };
  	
  	render() {
      	return(
        	<div className="app">
            	<div className="search-books">
                	<div className="search-books-bar">
                  		<Link to="/" className="close-search">Close</Link>
                  		<div className="search-books-input-wrapper">
             				<input 
             					type="text" 
             					placeholder="Search by title or author" 
             					value={this.state.search} 
            					onChange={(event) => this.handleChange(event.target.value)}
							/>
                  		</div>
                	</div>

                	<div className="search-books-results">
                  		<ol className="books-grid">
							{this.state.results && (
                     		this.state.results.map((book) => (
                            	<Book 
                              		key={book.id}
                                    id={book.id} 
                                    title={book.title} 
                                    author={book.authors}
                                    backgroundImage={book.imageLinks.thumbnail}
                                    moveBook={this.props.moveBook}
                                    shelf={this.checkShelves(book.id)}
                                />
                    		)))}
          		  		</ol>
                	</div>
              	</div>
          	</div>
       	)
 	}
}

Search.propTypes = {
	moveBook: PropTypes.func.isRequired, 
	currentlyReading: PropTypes.array.isRequired,
 	wantToRead: PropTypes.array.isRequired,
  read: PropTypes.array.isRequired
}

export default Search