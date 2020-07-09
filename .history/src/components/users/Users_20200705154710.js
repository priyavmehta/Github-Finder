import React, { useContext } from 'react';
import UserProfile from './UserProfile';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types'
import githubContext from '../../context/github/githubContext';

const Users = ({ users, loading }) => {

    const GithubContext = useContext(githubContext)

    if (loading) {
        return <Spinner />
    } else {
        return (
            <div style = {userStyle}>
                {users.map(user => (
                    <UserProfile key = {user.id} user = {user} />
                ))}
            </div>
        );
    }
}

Users.propTypes = {
    users : PropTypes.array.isRequired,
    loading : PropTypes.bool.isRequired,
}

const userStyle = { 
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '1rem'
}

export default Users
