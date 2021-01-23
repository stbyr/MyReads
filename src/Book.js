import React from 'react'
import PropTypes from 'prop-types'

class Book extends React.Component {
  	// function is called when user clicks to move book to another shelf
  	// it calls the moveBook function in the App component
  	handleSelect = (e) => {
      	let value = e.target.value;
      	this.props.moveBook({
       		id: this.props.id, 
          	title: this.props.title,
          	author: this.props.author,
          	backgroundImage: this.props.backgroundImage
      	}, value);
  	}; 	

  	render() {
      	return(
        	<li key={this.props.id}>
            	<div className="book">
                	<div className="book-top">
                    	<div 
      						className="book-cover" 
      						style={{width: 128, height: 193, backgroundImage: `url(${this.props.backgroundImage})` }}
						  ></div>
                        <div className="book-shelf-changer">
                        	<select value={this.props.shelf} onChange={this.handleSelect}>
                            	<option value="move" disabled>Move to...</option>
                                <option value="none">None</option>
								                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                        	</select>
                        </div>
                    </div>
                    <div className="book-title">{this.props.title}</div>
                    <div className="book-authors">{this.props.author && this.props.author.join(', ')}</div> 
            	</div>
         	</li>
        )
    }
}	

Book.propTypes = {
   	id: PropTypes.string, 
    title: PropTypes.string,
   	author: PropTypes.array,
   	backgroundImage: PropTypes.string,
    moveBook: PropTypes.func.isRequired,
	  shelf: PropTypes.string.isRequired,
}

export default Book