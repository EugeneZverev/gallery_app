import { LOGIN, LOGOUT, REGISTER, GET_IMAGES } from './types'

const SERVER = 'https://sheltered-hollows-87382.herokuapp.com'

export function makeLogin(email, password) {
    return async dispatch => {
        const url = `${SERVER}/api/user/login`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        const loginResponse = await response.text()
        const authToken = response.headers.get('auth-token')

        dispatch({
            type: LOGIN,
            payload: {
                authToken,
                loginResponse
            }
        })

        return { loginResponse }
    }
}
export function makeLogout() {
    return {
        type: LOGOUT
    }
}
export function makeRegister(email, password) {
    return async dispatch => {
        const url = `${SERVER}/api/user/register`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        const responseText = await response.text()

        dispatch({
            type: REGISTER,
            payload: {
                response: responseText
            }
        })

        return { responseText }
    }
}

export function getImages(token) {
    return async dispatch => {
        const url = `${SERVER}/api/images`
        const response = await fetch(url, {
            headers: {
                'auth-token': token
            }
        })
        const images = await response.json()

        dispatch({
            type: GET_IMAGES,
            payload: {
                images
            }
        })

        return { action: 'get images' }
    }
}