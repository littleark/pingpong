import { combineReducers } from 'redux'
import ui from './ui'
import firebase from './firebase'

const mainReducer = combineReducers({
  ui,
  firebase
})

export default mainReducer
