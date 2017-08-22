import fetch from 'isomorphic-fetch'
import database from './database'

export const SELECT_TIMESTAMPS = 'SELECT_TIMESTAMPS'

export function selectTimestamps(timestamps) {
  return {
    type: SELECT_TIMESTAMPS,
    timestamps
  }
}

export const SELECT_USER = 'SELECT_USER'

export function selectUser(user) {
  return {
    type: SELECT_USER,
    user
  }
}

export const SELECT_CONNECTION = 'SELECT_CONNECTION'

export function selectConnection(user) {
  return {
    type: SELECT_CONNECTION,
    user
  }
}

//JUST FOR ui.js
export const ASSIGN_TASK = 'ASSIGN_TASK'
export function assignTask(id,user) {
  return {
    type: ASSIGN_TASK,
    id,
    user
  }
}

export const ADD_TASK = 'ADD_TASK'
export function addTask(user) {
  return {
    type: ADD_TASK,
    user
  }
}

export const REQUEST_DATA = 'REQUEST_DATA'
function requestData (timestamps) {
  return {
    type: REQUEST_DATA,
    timestamps
  }
}

export const RECEIVE_DATA = 'RECEIVE_DATA'
function receiveData (timestamps, json) {
  return {
    type: RECEIVE_DATA,
    timestamps,
    data: json,
    receivedAt: Date.now()
  }
}


export function fetchData(timestamps) {
  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

  return function (dispatch) {
    // First dispatch: the app state is updated to inform
    // that the API call is starting.

    dispatch(requestData(timestamps))

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.

    //return fetch(`https://www.reddit.com/r/reactjs.json`)

    return fetch(process.env.PUBLIC_URL + '/data/messages.json')
      .then(
        response => response.json(),
        // Do not use catch, because that will also catch
        // any errors in the dispatch and resulting render,
        // causing an loop of 'Unexpected batch number' errors.
        // https://github.com/facebook/react/issues/6895
        error => console.log('An error occured.', error)
      )
      .then(json => {
          // We can dispatch many times!
          // Here, we update the app state with the results of the API call.
          console.log("!!!!!!!!!!!!!!")
          console.log(timestamps, json)
          dispatch(receiveData(timestamps, json))
        }
      )
  }
}


// Watch listeners
export function watchMessageChangedEvent(dispatch) {
  database.ref('/messages').on('child_changed', (snap) => {
    console.log("CHILD CHANGED")
    //console.log(snap.val())
    dispatch(getMessageChangedAction(snap.val()))
  })
}
export const GET_MESSAGE_CHANGED = 'GET_MESSAGE_CHANGED'
function getMessageChangedAction(message) {
  return {
    type: GET_MESSAGE_CHANGED,
    message
  }
}

export function watchMessageAddedEvent(dispatch) {
  database.ref('/messages').limitToLast(100).on('child_added', (snap) => {
    console.log("watchMessageAddedEvent")
    //console.log(snap.val())
    dispatch(getMessageAddedAction(snap.key, snap.val()))
  })
}
export const GET_MESSAGE_ADDED = 'GET_MESSAGE_ADDED'
function getMessageAddedAction(key, message) {
  console.log("getMessageAddedAction", key, message)
  return {
    type: GET_MESSAGE_ADDED,
    key,
    message
  }
}

export function changeAssignedUser(message, user) {
  console.log("changeAssignedUser",message)
  const {body, createdBy, id, timestamp} = message

  let postData = {
      body: body,
      createdBy,
      id,
      timestamp,
      assignedTo: user
  }

  var updates = {};
  updates['/messages/' + message.fbKey] = postData;

  return dispatch => {
    database.ref().update(updates)
  }
}

export function addNewTask(task) {



  let newPostKey = database.ref().child('messages').push().key

  console.log("newPostKey", newPostKey)

  let postData = task
  postData.id = newPostKey

  var updates = {}
  updates['/messages/' + newPostKey] = postData

  return dispatch => {
      dispatch(getMessageAddedAction(newPostKey, postData))
      return database.ref().update(updates)
  }

}

export function getMessages() {
  return dispatch => {

    dispatch(getMessagesRequestedAction())

    let query = database.ref("messages").orderByKey();
    return query.once("value")
                .then(function(snapshot) {
                  let messages = []
                  snapshot.forEach(function(childSnapshot) {
                    // key will be "ada" the first time and "alan" the second time
                    let key = childSnapshot.key;
                    // childData will be the actual contents of the child
                    let childData = childSnapshot.val();

                    //console.log(key,childData)
                    messages.push({'fbKey':key, ...childData})

                })
                dispatch(getMessagesFulfilledAction(messages))
              })
              .catch((error) => {
                console.log(error);
                dispatch(getMessagesRejectedAction())
              })
  }
}

export const GET_MESSAGES_REQUESTED = 'GET_MESSAGES_REQUESTED'
function getMessagesRequestedAction() {
  return {
    type: 'GET_MESSAGES_REQUESTED'
  };
}

export const GET_MESSAGES_REJECTED = 'GET_MESSAGES_REJECTED'
function getMessagesRejectedAction() {
  return {
    type: GET_MESSAGES_REJECTED
  }
}

export const GET_MESSAGES_FULFILLED = 'GET_MESSAGES_FULFILLED'
function getMessagesFulfilledAction(messages) {
  return {
    type: GET_MESSAGES_FULFILLED,
    messages
  };
}
