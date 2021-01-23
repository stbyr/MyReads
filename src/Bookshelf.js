import React from 'react'
import PropTypes from 'prop-types'
import './App.css'
import Book from './Book'

function Bookshelf(props) {
	return(
    	<div className="bookshelf">
       		<h2 className="bookshelf-title">{props.title}</h2>
          	<div className="bookshelf-books">
            	<ol className="books-grid">
                	{props.books.map((book) => (
                    	<Book 
                        	key={book.id} 
                          id={book.id} 
                          title={book.title} 
                          author={book.author}
                          backgroundImage={book.backgroundImage}
                          moveBook={props.moveBook}
							            shelf={props.shelf}
                    	/>
					        ))}
            	</ol>
       		</div>
    	</div>
	)
}

Bookshelf.propTypes = {
  	title: PropTypes.string.isRequired,
  	moveBook: PropTypes.func.isRequired,
  	books: PropTypes.array.isRequired,
	  shelf: PropTypes.string.isRequired
}

export default Bookshelf