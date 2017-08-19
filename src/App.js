import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from './actions'

import Messages from './views/Messages'

const mapStateToProps = state => {
  console.log("-------------->", state)
  const { user, connection, data } = state.ui

  // const messages = !data.users ? [] : data.users.find(d => {
  //   return d.user === user
  // }).connections.find(d => {
  //   return d.user === connection
  // }).messages

  const messages = state.firebase.messages || []

  const date = new Date()

  return {
    user,
    connection,
    messages,
    date
    //...state
  }
}

const mapDispatchToProps = function (dispatch) {

  actions.watchMessageChangedEvent(dispatch);

  return {
    selectUser: (user) => { dispatch(actions.selectUser(user)) },
    selectConnection: (user) => { dispatch(actions.selectConnection(user)) },
    assignTask: (id, user) => { dispatch(actions.assignTask(id, user)) },
    changeAssignedUser: (message, user) => { dispatch(actions.changeAssignedUser(message, user)) },
    getMessages: () => { dispatch(actions.getMessages()) },
  }
}

const USER = 'carlo'
const CONNECTION = 'vasu'

class App extends Component {

  componentDidMount () {
    this.props.selectUser(USER)
    this.props.selectConnection(CONNECTION)
    this.props.getMessages()
  }

  componentWillReceiveProps (nextProps) {
    console.log("componentWillReceiveProps", nextProps)
  }

  render() {

    return (
      <div className="App">
        <Messages user={this.props.user} connection={this.props.connection} messages={this.props.messages} changeAssignedUser={this.props.changeAssignedUser}/>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
