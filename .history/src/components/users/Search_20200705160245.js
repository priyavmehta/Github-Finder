import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import githubContext from '../../context/github/githubContext'

const Search = ({ setAlert }) => {

    const GithubContext = useContext(githubContext)

    const [text, setText] = useState('')

    const onSubmit = (event) => {
        event.preventDefault()
        if (text === ''){
            setAlert('Please enter something', 'light')
        } else {
            GithubContext.searchUsers(text)
            setText('')
        }
    }

    const changeValue = (event) => setText (event.target.value)

    return (
        <div>
            <form className = "form" onSubmit = {onSubmit}>
                <input
                    type = "text"
                    name = "text" 
                    placeholder = "Search Users..."
                    value = {text} 
                    onChange = {changeValue}/>
                <input
                    type = "submit" 
                    value = "Search" 
                    className = "btn btn-dark btn-block" />
            </form>
            {   
                GithubContext.clear && 
                (<button className = "btn btn-block btn-light" onClick = {GithubContex.clearUsers}>Clear</button>)
            }
        </div>
    )
}

Search.propTypes = {
    setAlert : PropTypes.func.isRequired,
}

export default Search
