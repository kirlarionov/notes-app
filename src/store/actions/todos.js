import {
   GET_TODOS_REQUEST, GET_TODOS_SUCCESS, GET_TODOS_FAILURE,
   ADD_TODO_FAILURE, ADD_TODO_REQUEST, ADD_TODO_SUCCESS,
   REMOVE_TODO_REQUEST, REMOVE_TODO_SUCCESS, REMOVE_TODO_FAILURE,
   EDIT_TODO_REQUEST, EDIT_TODO_SUCCESS, EDIT_TODO_FAILURE,
   TOGGLE_STATUS_TODO_SUCCESS, TOGGLE_STATUS_TODO_FAILURE
} from '../types'
import {
   getTodos as fetchGetTodos,
   addTodo as fetchAddTodo,
   removeTodo as fetchRemoveTodo,
   updateTodo as fetchUpdateTodo
} from '../../services/todos'


export const getTodos = () => {
   return (dispatch) => {
      dispatch(getTodosRequest())
      fetchGetTodos()
         .then(data => {
            dispatch(getTodosSuccess(data))
         })
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
// -----------------------------------------------------------------------------
export const addTodo = (data) => {
   return (dispatch) => {
      dispatch(addTodoRequest())
      fetchAddTodo(data)
         .then(data => dispatch(addTodoSuccess(data)))
         .catch(err => dispatch(addTodoFailure(err)))
   }
}

export const addTodoRequest = () => ({
   type: ADD_TODO_REQUEST,
})

export const addTodoSuccess = (payload) => ({
   type: ADD_TODO_SUCCESS,
   payload
})

export const addTodoFailure = (payload) => ({
   type: ADD_TODO_FAILURE,
   payload
})

export const removeTodo = (id) => {
   return (dispatch) => {
      dispatch(removeTodoRequest())
      fetchRemoveTodo(id)
         .then(data => dispatch(removeTodoSuccess(data.id)))
         .catch(err => dispatch(removeTodoFailure(err)))
   }
}

export const removeTodoRequest = () => ({
   type: REMOVE_TODO_REQUEST,
})

export const removeTodoSuccess = (payload) => ({
   type: REMOVE_TODO_SUCCESS,
   payload
})

export const removeTodoFailure = (payload) => ({
   type: REMOVE_TODO_FAILURE,
   payload
})

export const updateTodo = (id, title) => {
   return (dispatch) => {
      dispatch(updateTodoRequest())
      fetchUpdateTodo(id, { title })
         .then(dispatch(updateTodoSuccess({ id, title })))
         .catch(err => dispatch(updateTodoFailure(err)))
   }
}

export const updateTodoRequest = () => ({
   type: EDIT_TODO_REQUEST,
})

export const updateTodoSuccess = (payload) => ({
   type: EDIT_TODO_SUCCESS,
   payload
})

export const updateTodoFailure = (payload) => ({
   type: EDIT_TODO_FAILURE,
   payload
})

export const toggleStatusHandle = (id, data) => {
   return (dispatch) => {
      fetchUpdateTodo(id, data)
         .then(dispatch(toggleTodoSuccess({ id, done: data.done })))
         .catch(err => dispatch(toggleTodoFailure(err)))
   }
}

export const toggleTodoSuccess = (payload) => ({
   type: TOGGLE_STATUS_TODO_SUCCESS,
   payload
})

export const toggleTodoFailure = (payload) => ({
   type: TOGGLE_STATUS_TODO_FAILURE,
   payload
})