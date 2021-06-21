import React, { createContext, useReducer } from 'react';
import jwtDecode from 'jwt-decode';

const INITIAL_STATE = {
    user: null
}

if(localStorage.getItem('linkedinToken')) {
    const decodedToken = jwtDecode(localStorage.getItem('linkedinToken'));

    if(decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem('linkedinToken');
    }else {
        INITIAL_STATE.user = decodedToken;
    }
}

const AuthContext = createContext({
    user: null, 
    login: (data) => {},
    logout: () => {}
});

function authReducer(state, action) {
    switch(action.type) {
        case 'LOGIN': 
            return {
                ...state,
                user: action.payload
            }
        case 'LOGOUT':
            return {
                ...state,
                user: null
            }
        default :
            return state
    }
}

function AuthProvider(props) {
    const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);

    const login = userData => {
        localStorage.setItem('linkedinToken', userData.token);
        dispatch({
            type: 'LOGIN',
            payload: userData
        });
    }

    const logout = () => {
        localStorage.removeItem('linkedinToken');
        dispatch({
            type: 'LOGOUT'
        });
    }

    return (
        <AuthContext.Provider 
            value={{ user: state.user, login, logout }}
            {...props}
        />
    )

}

export {
    AuthProvider,
    AuthContext
}