import {
  ANIMAL,
  ANIMAL_SUCCESS,
  ANIMAL_FAIL
} from 'constants/actionsType'

const initialState = {
  loading: false,
  animals: [],
  error: null
}

export default function animalReducer(state = initialState, action) {
  switch (action.type) {
    case ANIMAL:
      return {
        ...state,
        loading: true
      }
    case ANIMAL_SUCCESS: {
      const { animals } = action.payload 
      return {
        ...state,
        loading: false,
        animals
      }
    }
    case ANIMAL_FAIL: {
      const { error } = action.payload
      return {
        ...state,
        loading: false,
        error
      }
    }
    default:
      return state
  }
}