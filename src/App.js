import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from './actions'

import Messages from './views/Messages'

const mapStateToProps = state => {
  console.log("-------------->", state)
  const { user, connection, data } = state.ui
  const messages = !data.users ? [] : data.users.find(d => {
    return d.user === user
  }).connections.find(d => {
    return d.user === connection
  }).messages

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
  return {
    selectUser: (user) => { dispatch(actions.selectUser(user)) },
    selectConnection: (user) => { dispatch(actions.selectConnection(user)) },
    assignTask: (id, user) => { dispatch(actions.assignTask(id, user)) }
  }
}

const USER = 'carlo'
const CONNECTION = 'vasu'

class App extends Component {

  componentDidMount () {
    this.props.selectUser(USER)
    this.props.selectConnection(CONNECTION)
  }

  componentWillReceiveProps (nextProps) {
    console.log("componentWillReceiveProps", nextProps)
  }

  render() {

    return (
      <div className="App">
        <Messages user={this.props.user} connection={this.props.connection} messages={this.props.messages} assignTask={this.props.assignTask}/>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
