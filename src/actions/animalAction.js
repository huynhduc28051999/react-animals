import { ANIMAL_SUCCESS, ANIMAL, ANIMAL_FAIL } from 'constants/actionsType'
import axiosClient from 'tools/axiosClient'

const animalSuccess = data => ({
  type: ANIMAL_SUCCESS,
  payload: {
    animals: data
  }
})

const animal = () => ({
  type: ANIMAL
})

const animalFail = error => ({
  type: ANIMAL_FAIL,
  payload: {
    error
  }
})

export const getAnimals = ({ page, limit }) => {
  return dispatch => {
    dispatch(animal())
    axiosClient
      .get('/v2/animals', {
        params: {
          page,
          limit
        }
      })
      .then(res => {
        dispatch(animalSuccess(res.data))
      })
      .catch(err => {
        dispatch(animalFail(err))
      })
  }
}