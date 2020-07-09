import {
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    GET_USER,
    GET_REPOS
} from '../types'

export default (state, action) => {
    switch (action.type){
        case CLEAR_USERS:
            return {
                ...state,
                users : action.payload,
                loading : false,
                clear : false
            }
        case SEARCH_USERS:
            return {
                ...state,
                users : action.payload,
                loading : false,
                clear : true
            }
        case SET_LOADING:
            return {
                ...state,
                loading : true
            }
        default:
            return state
    }
}