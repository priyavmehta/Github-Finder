import React , { useReducer } from 'react';
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

    // Search Users
    const searchUsers = async (text) => {

        setLoading()
        const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        
        dispatch ({
            type : SEARCH_USERS,
            payload : res.data.items
        })
        setClear(true)
    }

    const setLoading = () => dispatch ({ type : SET_LOADING })

    return <githubContext.Provider
        value = {{
            users : state.users,
            user : state.user,
            loading : state.loading,
            repos : state.repos,
            clear : state.clear
        }}
    >
    {props.children}
    </githubContext.Provider>
}

export default GithubState