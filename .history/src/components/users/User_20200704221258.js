import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';

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

        if (loading) return <Spinner/>;
        return <Fragment>
                <Link to = "/" className = "btn btn-light">
                    Back to Home Page
                </Link>
            </Fragment>
    }
}

export default User
