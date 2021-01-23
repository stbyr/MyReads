import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import './App.css'
import Bookshelf from './Bookshelf'

function Home(props) {
    return(
        <div className="list-books">
        	<div className="list-books-title">
            	<h1>MyReads</h1>
       		</div>
          
       		<div className="list-books-content">     
				<Bookshelf 
      				title="Currently Reading"
          			moveBook={props.moveBook} 
  					books={props.currentlyReading}
					shelf="currentlyReading"
 				/>
          		<Bookshelf 
					title="Want to Read"
					moveBook={props.moveBook} 
                    books={props.wantToRead}
					shelf="wantToRead"
				/>
          		<Bookshelf 
					title="Read"
					moveBook={props.moveBook} 
					books={props.read}
					shelf="read"
				/>
         	</div>

       		<div className="open-search">
        		<Link to="/search">Add a book</Link>
          </div>
      </div>
	)
}

Home.propTypes = {
	moveBook: PropTypes.func.isRequired, 
	currentlyReading: PropTypes.array.isRequired,
 	wantToRead: PropTypes.array.isRequired,
  read: PropTypes.array.isRequired
}

export default Home