import { GET_TODOS_REQUEST, GET_TODOS_SUCCESS, GET_TODOS_FAILURE } from '../types'
import { getTodos as fetchGetTodos } from '../../services/todos'

export const getTodos = () => {
   return (dispatch) => {
      dispatch(getTodosRequest())
      fetchGetTodos()
         .then(data => dispatch(getTodosSuccess(data)))
         .catch(err => dispatch(getTodosFailure(err)))
   }
}

export const getTodosRequest = () => ({
   type: GET_TODOS_REQUEST,
})

export const getTodosSuccess = (payload) => ({
   type: GET_TODOS_SUCCESS,
   payload
})

export const getTodosFailure = (payload) => ({
   type: GET_TODOS_FAILURE,
   payload
})