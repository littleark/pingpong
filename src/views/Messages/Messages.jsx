import React from 'react'

import Message from './Message'

import './messages.css'

const Messages = (props) => {


  const dates = []
  const messagesAndDates = []

  props.messages.forEach(message => {
    const timestamp = new Date(message.timestamp)
    const year = timestamp.getFullYear()
    const month = timestamp.getMonth()+1
    const day = timestamp.getDate()
    const date = `${year}-${month < 10 ? '0' : ''}${month}-${day}`

    if(dates.indexOf(date) === -1) {
      dates.push(date)
      messagesAndDates.push(<span className="timeline-date">{date}</span>)
    }

    messagesAndDates.push(<Message key={message.id} {...message} user={props.user} connection={props.connection}  changeAssignedUser={props.changeAssignedUser} />)
  })

  const addTask = (e) => {
    props.addTask(props.user)
  }

  return <div className="messages-view">
    <div className="messages-header">
      <div className="name-header user-header">{props.user}</div>
      <div className="name-header connection-header">{props.connection}</div>
    </div>
    <div className="messages-container">
      <div className="messages">
        {messagesAndDates}
      </div>
    </div>
    <div className="add-button">
      <button onClick={addTask}>+</button>
    </div>
  </div>

}

export default Messages
