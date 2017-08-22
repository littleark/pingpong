import React, { Component } from 'react';
import Swipeable from 'react-swipeable'

//const Message = (props) => {
class Message extends Component {
  constructor (props) {
    super(props)
    this.state = props
  }

  swipedLeft(e, absX) {
    let {user} = this.props
    this.setState({
      assignedTo: user
    })
    this.props.changeAssignedUser(this.props, this.props.user)
  }
  swipedRight(e, absX) {
    let {connection} = this.props
    this.setState({
      assignedTo: connection
    })
    this.props.changeAssignedUser(this.props, this.props.connection)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      assignedTo: nextProps.assignedTo,
      body: nextProps.body
    })
  }

  render() {

    let {assignedTo, body, user} = this.state
    let assignedToClass = (assignedTo === user) ? 'aligned-left' : 'aligned-right'

    return <Swipeable
             onSwipedLeft={this.swipedLeft.bind(this)}
             onSwipedRight={this.swipedRight.bind(this)}
           >
             <div className="message"><div className={assignedToClass}>{body ? body.text : ''}</div></div>
           </Swipeable>
  }



}

export default Message
