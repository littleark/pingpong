import {
  SELECT_TIMESTAMPS,
  REQUEST_DATA,
  RECEIVE_DATA,
  SELECT_USER,
  SELECT_CONNECTION,
  ASSIGN_TASK
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

function assignTask(data, action) {
  console.log("ASSIGN TASK", data, action)

  data.users.forEach(d => {
      d.connections.forEach(c => {
          c.messages.forEach(m => {
            if(m.id === action.id) {
              m.assignedTo = action.user
            }
          })
      })
  })
  return {
    data
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
    case SELECT_USER:
        return Object.assign({}, state, {user:action.user})
    case SELECT_CONNECTION:
        return Object.assign({}, state, {connection:action.user})
    case RECEIVE_DATA:
    case REQUEST_DATA:
      return Object.assign({}, state, {
        ...getData(state[action.timestamps], action)
      })
    case ASSIGN_TASK:
      return Object.assign({}, state, {
        ...assignTask(state.data, action)
      })
    default:
      return state
  }
}

export default ui
