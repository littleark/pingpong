import {
  GET_MESSAGES_REQUESTED,
  GET_MESSAGES_REJECTED,
  GET_MESSAGES_FULFILLED,
  ADD_TASK,
  GET_MESSAGE_CHANGED,
  GET_MESSAGE_ADDED
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

function addTask(messages = [], action) {
  console.log("ADD A TASK", messages, action)
  const newMessages = messages

  if(!newMessages.find(d => d.fbKey === action.key)) {
    newMessages.push({'fbKey':action.key, ...action.message})
  }

  return {
    'messages': newMessages
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
    case ADD_TASK:
      alert("ADD_TASK")
      return state
      return Object.assign({}, state, {
        ...addTask(state.messages, action),
        lastUpdated: new Date()
      })
    case GET_MESSAGE_ADDED:
      return Object.assign({}, state, {
        ...addTask(state.messages, action),
        lastUpdated: new Date()
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
