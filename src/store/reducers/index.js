import { todosReducer } from './todos'
import { combineReducers } from 'redux'

export const rootReducer = combineReducers({ todos: todosReducer })