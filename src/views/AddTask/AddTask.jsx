import React, {Component} from 'react'
import './addtask.css'

class AddTask extends Component {

  constructor(props) {
    super(props)

    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth()+1
    const day = now.getDate()

    this.state = {
      user: props.user,
      date: `${year}-${month < 10 ? '0' : ''}${month}-${day}`
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
  }

  handleSubmit(e) {
    e.preventDefault()
    console.log(this.props, this.state)
    const {user, connection} = this.props
    const {text, timestamp} = this.state
    this.props.addTask({
      user,
      connection,
      createdBy: user,
      body: {
        text
      },
      assignedTo: user,
      timestamp
    })
  }

  handleChange(e) {
    e.preventDefault()

    const name = e.target.name
    let value = e.target.value

    let stateObj = {
      [name]: value
    }

    if(name==='date') {
      stateObj.timestamp = +new Date(value)
    }
    this.setState(stateObj)
  }

  render() {



    return <div className={`add-task-view ${this.props.status}`}>
              <h1>Add new task</h1>
              <div className="add-button">
                <form onSubmit={this.handleSubmit}>
                  <p>
                    <label>
                      When: <input name="date" type="date" value={this.state.date} onChange={this.handleChange}/>
                    </label>
                  </p>
                  <p>
                    <label>
                      What: <textarea name="text" onChange={this.handleChange}/>
                    </label>
                  </p>
                  <p>
                    <button type="submit">Send</button>
                  </p>
                </form>
              </div>
          </div>
  }


}

export default AddTask
