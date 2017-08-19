import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from './actions'


const mapStateToProps = state => {
  return {
    ...state
  }
}

const mapDispatchToProps = function (dispatch) {
  return {
    // selectAP: (ap) => { dispatch(actions.selectAP(ap)) }
  }
}

class App extends Component {
  render() {
    return (
      <div className="App"></div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
