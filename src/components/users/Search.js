import React, { useState, useContext } from 'react'
import githubContext from '../../context/github/githubContext'
import alertContext from '../../context/alert/alertContext'

const Search = () => {

    const GithubContext = useContext(githubContext)
    const AlertContext = useContext(alertContext)

    const [text, setText] = useState('')

    const onSubmit = (event) => {
        event.preventDefault()
        if (text === ''){
            AlertContext.showAlert('Please enter something', 'light')
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
                (<button className = "btn btn-block btn-light" onClick = {GithubContext.clearUsers}>Clear</button>)
            }
        </div>
    )
}

export default Search
