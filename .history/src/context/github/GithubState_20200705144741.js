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