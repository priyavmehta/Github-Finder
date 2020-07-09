import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Spinner from '../layout/Spinner';

class User extends Component {

    componentDidMount () {
        this.props.getUser(this.props.match.params.login)
    }

    static propTypes = {
        loading : PropTypes.bool,
        user : PropTypes.object,
        getUser : PropTypes.func,
    }
    
    render() {
        const {
            name,
            avatar_url,
            location,
            bio,
            blog,
            login,
            html_url,
            followers,
            following,
            public_repos,
            public_gists,
            hireable
        } = this.props.user;

        const loading = this.props.loading;

        if (loading) return <Spinner/>
        return (

            <Fragment>
                
            </Fragment>
        )
    }
}

export default User
