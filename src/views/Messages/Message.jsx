import React from 'react'


import Swipeable from 'react-swipeable'

const Message = (props) => {

  const swipingLeft = (e, absX) => {
    //console.log("You're Swiping to the Left...", e, absX)
    //console.log("THIS",props)
    props.assignTask(props.id, props.user)
  }
  const swipingRight = (e, absX) => {
    //console.log("You're Swiping to the Right...", e, absX)
    props.assignTask(props.id, props.connection)
  }

  let assignedTo = props.assignedTo === props.user ? 'aligned-left' : 'aligned-right'
  return <Swipeable
           onSwipedLeft={swipingLeft}
           onSwipedRight={swipingRight}
         >
           <div className="message"><div className={assignedTo}>{props.body.text}</div></div>
         </Swipeable>

}

export default Message
