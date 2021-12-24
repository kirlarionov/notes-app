import {
   GET_TODOS_REQUEST, GET_TODOS_SUCCESS, GET_TODOS_FAILURE,
   ADD_TODO_FAILURE, ADD_TODO_REQUEST, ADD_TODO_SUCCESS,
   REMOVE_TODO_REQUEST, REMOVE_TODO_SUCCESS, REMOVE_TODO_FAILURE,
   EDIT_TODO_REQUEST, EDIT_TODO_SUCCESS, EDIT_TODO_FAILURE,
   TOGGLE_STATUS_TODO_SUCCESS, TOGGLE_STATUS_TODO_FAILURE
} from '../types'

const initialState = {
   fetching: false,
   data: {},
   error: null
}

export const todosReducer = (state = initialState, { type, payload }) => {
   switch (type) {

      //                            GET
      case GET_TODOS_REQUEST:
         return {
            ...state,
            fetching: "GET"
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

      //                            ADD
      case ADD_TODO_REQUEST:
         return {
            ...state,
            fetching: "ADD"
         }
      case ADD_TODO_SUCCESS:
         return {
            ...state,
            fetching: false,
            data: {
               ...state.data,
               [payload.id]: payload
            }
         }
      case ADD_TODO_FAILURE:
         return {
            ...state,
            error: payload
         }

      //                            REMOVE
      case REMOVE_TODO_REQUEST:
         return {
            ...state,
            fetching: "REMOVE"
         }
      case REMOVE_TODO_SUCCESS:
         const { [payload]: removedNote, ...newState } = state.data
         return {
            ...state,
            fetching: false,
            data: {
               ...newState
            }
         }
      case REMOVE_TODO_FAILURE:
         return {
            ...state,
            error: payload
         }

      //                            EDIT
      case EDIT_TODO_REQUEST:
         return {
            ...state,
            fetching: true
         }
      case EDIT_TODO_SUCCESS:
         const { id, title } = payload
         return {
            ...state,
            fetching: false,
            data: {
               ...state.data,
               [id]: {
                  ...state.data[id],
                  title
               }
            }
         }
      case EDIT_TODO_FAILURE:
         return {
            ...state,
            error: payload
         }

      //                         TOGGLE
      case TOGGLE_STATUS_TODO_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               [payload.id]: {
                  ...state.data[payload.id],
                  done: payload.done
               }
            }
         }
      case TOGGLE_STATUS_TODO_FAILURE:
         return {
            ...state,
            error: payload
         }
      default:
         return state
   }
}



