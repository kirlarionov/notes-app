import { GET_TODOS_REQUEST, GET_TODOS_SUCCESS, GET_TODOS_FAILURE } from '../types'

const initialState = {
   fetching: false,
   data: {},
   error: null
}

export const todosReducer = (state = initialState, { type, payload }) => {
   switch (type) {
      case GET_TODOS_REQUEST:
         return {
            ...state,
            fetching: true
         }
      case GET_TODOS_SUCCESS:
         return {
            ...state,
            fetching: false,
            data: payload.reduce((prev, current) => ({
               ...prev,
               [current.id]: current
            }), {})
         }
      case GET_TODOS_FAILURE:
         return {
            ...state,
            error: payload
         }
      default:
         return state
   }
}
