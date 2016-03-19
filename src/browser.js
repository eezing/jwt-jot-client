
import TokenHandler from './token-handler'

export default function(key, token) {

    if (typeof key !== 'string') throw new Error('First argument must be a string - used as key when storing token in localStorage.')

    let tokenHandler = null

    if (token) {
        setStoredToken(key, token)
        tokenHandler = new TokenHandler(token)
    } else {
        let saved_token = getStoredToken(key)
        tokenHandler = saved_token ? new TokenHandler(saved_token) : undefined
    }

    this.valid = function() {
        return tokenHandler ? !tokenHandler.expired() : false
    }

    this.getToken = function() {
        return tokenHandler ? tokenHandler.getToken() : undefined
    }
}

function setStoredToken(key, token) {
    localStorage.set(key, token)
}

function getStoredToken(key) {
    return localStorage.get(key)
}