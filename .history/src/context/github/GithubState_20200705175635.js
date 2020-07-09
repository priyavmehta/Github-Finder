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
        const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        
        dispatch ({
            type : CLEAR_USERS,
            payload : res.data
        })
        // setUsers(res.data)
        // setLoading(false)
        // eslint-disable-next-line
    }, []);
    // Search Users
    const searchUsers = async (text) => {

        setLoading()
        const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        
        dispatch ({
            type : SEARCH_USERS,
            payload : res.data.items
        })
        //setClear(true)
    }

    // Get User
    const getUser = async (username) => {
        setLoading()
        const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        
        dispatch ({
            type : GET_USER,
            payload : res.data
        })
        // setUser(res.data)
        // setLoading(false)
      }

    // Get Repos
    const getUserRepos = async (username) => {
        setLoading()
        const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        
        dispatch({
            type : GET_REPOS,
            payload : res.data
        })
        // setRepos(res.data)
        // setLoading(false)
    }

    // Clear users
    const clearUsers = async () => {

        setLoading()
        const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        
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