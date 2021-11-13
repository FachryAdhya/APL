import { combineReducers } from 'redux'
import apiReducers from './apiReducers'

export default combineReducers({
  indonesia: apiReducers
})