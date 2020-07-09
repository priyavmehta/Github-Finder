import React , { useReducer } from 'react';
import alertContext from './alertContext';
import alertReducer from './alertReducer';

import {
    SET_ALERT,
    REMOVE_ALERT
} from '../types'

const AlertState = props => {
    const initialState = null

    const [state, dispatch] = useReducer(alertReducer, initialState);

    
    return <alertContext.Provider
        value = {{
            alert : state,
            showAlert
        }}
    >
    {props.children}
    </alertContext.Provider>
}

export default AlertState