import React , { useReducer, useEffect } from 'react';
import githubContext from './githubContext';
import githubReducer from './githubReducer';
import axios from 'axios'
import {
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    GET_USER,
    GET_REPOS
} from '../types'

let githubCliendId;
let githubClientSecret;

if (process.env.NODE_ENV !== 'production') {
    githubCliendId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET
} else {
    githubCliendId = process.env.GITHUB_CLIENT_ID;
    githubClientSecret = process.env.GITHUB_CLIENT_SECRET
}

const GithubState = props => {
    const initialState = {
        users : [],
        user : {},
        loading : false,
        repos : [],
        clear : false
    }

    const [state, dispatch] = useReducer(githubReducer, initialState);

    // Get all Users
    useEffect (async () => {
        setLoading()
        const res = await axios.get(`https://api.github.com/users?client_id=${githubCliendId}&client_secret=${githubClientSecret}`);
        
        dispatch ({
            type : CLEAR_USERS,
            payload : res.data
        })
        // eslint-disable-next-line
    }, []);

    // Search Users
    const searchUsers = async (text) => {

        setLoading()
        const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${githubCliendId}&client_secret=${githubClientSecret}`);
        
        dispatch ({
            type : SEARCH_USERS,
            payload : res.data.items
        })
    }

    // Get User
    const getUser = async (username) => {
        setLoading()
        const res = await axios.get(`https://api.github.com/users/${username}?client_id=${githubCliendId}&client_secret=${githubClientSecret}`);
        
        dispatch ({
            type : GET_USER,
            payload : res.data
        })
      }

    // Get Repos
    const getUserRepos = async (username) => {
        setLoading()
        const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubCliendId}&client_secret=${githubClientSecret}`);
        
        dispatch({
            type : GET_REPOS,
            payload : res.data
        })
    }

    // Clear users
    const clearUsers = async () => {

        setLoading()
        const res = await axios.get(`https://api.github.com/users?client_id=${githubCliendId}&client_secret=${githubClientSecret}`);
        
        dispatch ({
            type : CLEAR_USERS,
            payload : res.data
        })
    }

    const setLoading = () => dispatch ({ type : SET_LOADING })

    return <githubContext.Provider
        value = {{
            users : state.users,
            user : state.user,
            loading : state.loading,
            repos : state.repos,
            clear : state.clear,
            searchUsers,
            clearUsers,
            getUser,
            getUserRepos
        }}
    >
    {props.children}
    </githubContext.Provider>
}

export default GithubState