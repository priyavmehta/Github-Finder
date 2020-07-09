import React, { Component } from 'react'

class Search extends Component {

    state = {
        text : ''
    }

    changeValue = (event) => {
        this.setState ({
            text : event.target.value
        })
    }

    render() {
        return (
            <div>
                <form className = "form">
                    <input
                     type = "text"
                     name = "text" 
                     placeholder = "Search Users..."
                     value = {this.state.text} 
                     onChange = {this.changeValue}/>
                    <input
                     type = "submit" 
                     value = "Search" 
                     className = "btn btn-dark btn-block" />
                </form>
            </div>
        )
    }
}

export default Search
