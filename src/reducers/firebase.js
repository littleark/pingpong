import {
  GET_MESSAGES_REQUESTED,
  GET_MESSAGES_REJECTED,
  GET_MESSAGES_FULFILLED,
  ASSIGN_TASK,
  GET_MESSAGE_CHANGED
} from '../actions'

function assignTask(messages, action) {
  console.log("ASSIGN TASK", messages, action)

  messages.forEach(m => {
    if(m.id === action.id) {
      m.assignedTo = action.user
    }
  })

  return {
    messages
  }
}

function updateTask(messages, action) {
  console.log("UPDATE TASK", messages, action)

  messages.forEach(m => {
    if(m.id === action.message.id) {
      m.assignedTo = action.message.assignedTo
      m.body = action.message.body
    }
  })

  return {
    messages
  }
}

const firebaseReducer = (state = [], action) => {
  switch (action.type) {
    // case 'INITIALIZE':
    //   return {
    //     statuses: action.statuses,
    //     ...action.data
    //   }
    case GET_MESSAGES_REQUESTED:
      return Object.assign({}, state, {
        inProgress: true,
        error: '',
        success: ''
      })
    case GET_MESSAGES_REJECTED:
      return Object.assign({}, state, {
        inProgress: false,
        error: 'Error in getting messages.'
      })
    case GET_MESSAGES_FULFILLED:
      const newState = Object.assign({}, state, {
        inProgress: false,
        success: 'Got messages.',
        messages: action.messages
      })
      return newState
    case ASSIGN_TASK:
      return Object.assign({}, state, {
        ...assignTask(state.messages, action)
      })
    case GET_MESSAGE_CHANGED:
      return Object.assign({}, state, {
        ...updateTask(state.messages, action),
        lastUpdated: new Date()
      })
    default:
      return state
  }
}

export default firebaseReducer
