import { combineReducers } from "redux"
import { LOGIN, LOGOUT, REGISTER, GET_IMAGES } from './types'

const initialState = {
    authToken: null,
    registerResponse: null,
    loginResponse: null,
    logout: true,
    images: []
}

const reduser = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER: 
            return {
                ...state, 
                registerResponse: action.payload.response
            }
        case LOGIN: 
            return {
                ...state, 
                authToken: action.payload.authToken, 
                loginResponse: action.payload.loginResponse, 
                logout: false
            }
        case LOGOUT: 
            return {
                ...state, 
                authToken: null,
                registerResponse: null,
                loginResponse: null,
                logout: true,
            }
        case GET_IMAGES: 
            return {
                ...state, 
                images: action.payload.images,
            }
        default: return state
    }
}

export const rootReducer = combineReducers({
    root: reduser
})