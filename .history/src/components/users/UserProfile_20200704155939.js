import React from 'react'
import PropTypes from 'prop-types'

const UserProfile = ({user : {login, avatar_url, html_url}}) => {

    return (
        <div className = "card text-center">
            <img src = {avatar_url} className = "round-img" style = {{ width : '60px'}} />
            <h3>{login}</h3>
            <a href = {html_url} className = "btn btn-dark btn-sm my-1" >More</a>
        </div>
    )
}

UserProfile.propTypes = {
    user : PropTypes.object.isRequired,
}

export default UserProfile
