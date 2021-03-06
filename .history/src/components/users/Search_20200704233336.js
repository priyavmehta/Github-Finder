import React from 'react'
import PropTypes from 'prop-types'

const Search = () => {

    state = {
        text : ''
    }

    onSubmit = (event) => {
        event.preventDefault()
        if (this.state.text === ''){
            this.props.setAlert('Please enter something', 'light')
        } else {
            this.props.searchUsers(this.state.text)
            this.setState({ text : '' })
        }
    }

    changeValue = (event) => {
        this.setState ({
            text : event.target.value
        })
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
                {   
                    this.props.showClear && 
                    (<button className = "btn btn-block btn-light" onClick = {this.props.clearUsers}>Clear</button>)
                }
            </div>
        )
    }
}

Search.propTypes = {
    searchUsers : PropTypes.func.isRequired,
    clearUsers : PropTypes.func.isRequired,
    showClear : PropTypes.bool.isRequired,
    setAlert : PropTypes.func.isRequired,
}

export default Search
