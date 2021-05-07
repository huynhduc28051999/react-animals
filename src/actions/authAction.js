import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from 'constants/actionsType'
import { CLIENT_ID, CLIENT_SECRET } from 'constants/appURL'
import axiosClient from 'tools/axiosClient'

export const loginRequest = ({ email, password }) => {
  // to do 
  return dispatch => {
    dispatch(login())
    axiosClient
      .post('/v2/oauth2/token', {
        grant_type: 'client_credentials',
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET
      })
      .then(res => {
        dispatch(loginSuccess(res.data))
        localStorage.setItem('access-token', res.data.access_token)
      })
      .catch(err => {
        dispatch(loginFail(err))
      })
  }
}

const loginSuccess = data => ({
  type: LOGIN_SUCCESS,
  payload: {
    ...data
  }
})

const login = () => ({
  type: LOGIN
})

const loginFail = error => ({
  type: LOGIN_FAIL,
  payload: {
    error
  }
})

export const logoutRequest = () => {
  return dispatch => {
    dispatch(logout())
    localStorage.clear('access-token')
  }
}

const logout = () => ({
  type: LOGOUT
})
