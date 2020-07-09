import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Search = ({ searchUsers, setAlert, showClear, clearUsers }) => {

    const [text, setText] = useState('')

    const onSubmit = (event) => {
        event.preventDefault()
        if (this.state.text === ''){
            setAlert('Please enter something', 'light')
        } else {
            searchUsers(this.state.text)
            this.setState({ text : '' })
        }
    }

    const changeValue = (event) => setText (event.target.value)

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
            {   
                showClear && 
                (<button className = "btn btn-block btn-light" onClick = {clearUsers}>Clear</button>)
            }
        </div>
    )
}

Search.propTypes = {
    searchUsers : PropTypes.func.isRequired,
    clearUsers : PropTypes.func.isRequired,
    showClear : PropTypes.bool.isRequired,
    setAlert : PropTypes.func.isRequired,
}

export default Search
