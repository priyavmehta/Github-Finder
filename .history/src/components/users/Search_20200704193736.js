import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Search extends Component {

    state = {
        text : ''
    }

    onSubmit = (event) => {
        event.preventDefault()
        this.props.searchUsers(this.state.text)
        this.setState({ text : '' })
    }

    changeValue = (event) => {
        this.setState ({
            text : event.target.value
        })
    }

    static propTypes = {
        searchUsers : PropTypes.func.isRequired,
    }

    render() {
        return (
            <div>
                <form className = "form" onSubmit = {this.onSubmit}>
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
