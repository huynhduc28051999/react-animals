import { combineReducers } from "redux"
import authReducer from './authReducer'
import animalReducer from './animalReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  animal: animalReducer
})
export default rootReducer