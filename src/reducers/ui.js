import {
  SELECT_TIMESTAMPS,
  REQUEST_DATA,
  RECEIVE_DATA
} from '../actions'

function getData(
  state = {
    isFetching: false,
    data: {}
  },
  action
) {
  switch (action.type) {
    case REQUEST_DATA:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_DATA:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.data,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

const ui = (state = [], action) => {
  switch (action.type) {
    // case 'INITIALIZE':
    //   return {
    //     statuses: action.statuses,
    //     ...action.data
    //   }
    case SELECT_TIMESTAMPS:
      return Object.assign({}, state, {timestamps:action.timestamps})
    case RECEIVE_DATA:
    case REQUEST_DATA:
      return Object.assign({}, state, {
        ...getData(state[action.timestamps], action)
      })
    default:
      return state
  }
}

export default ui
