import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from 'constants/actionsType'

const initialState = {
  loading: false,
  isAuthenticated: localStorage.getItem("access-token") ? true: false,
  error: null
}

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loading: true
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        isAuthenticated: true
      }
    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        isAuthenticated: false
      }
    case LOGOUT: {
      return {
        ...state,
        isAuthenticated: false
      }
    }
    default:
      return state
  }
}