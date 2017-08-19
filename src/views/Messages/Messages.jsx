import React from 'react'

import Message from './Message'

import './messages.css'

const Messages = (props) => {



  const messages = props.messages.map(message => {

     return <Message key={message.id} {...message} user={props.user} connection={props.connection}  assignTask={props.assignTask}/>
  })

  return <div className="messages-view">
    <div className="messages-header">
      <div className="name-header user-header">{props.user}</div>
      <div className="name-header connection-header">{props.connection}</div>
    </div>
    <div className="messages">
      {messages}
    </div>
  </div>

}

export default Messages
