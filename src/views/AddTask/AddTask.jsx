import React, {Component} from 'react'
import './addtask.css'

class AddTask extends Component {

  constructor(props) {
    super(props)

    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth()+1
    const day = now.getDate()
    const date = `${year}-${month < 10 ? '0' : ''}${month}-${day}`

    this.state = {
      user: props.user,
      date: date,
      timestamp: +now,
      text: '',
      default: {
        date: date,
        timestamp: +now,
        text: ''
      }
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {

    this.setState({
      date: this.state.default.date,
      timestamp: this.state.default.timestamp,
      text: this.state.default.text
    })

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
              <span className="close-add-task" onClick={this.props.closeTask}>X</span>
              <div className="add-button">
                <form onSubmit={this.handleSubmit}>
                  <p>
                    <label>
                      When: <input name="date" type="date" value={this.state.date} onChange={this.handleChange}/>
                    </label>
                  </p>
                  <p>
                    <label>
                      What: <textarea name="text" onChange={this.handleChange} value={this.state.text}/>
                    </label>
                  </p>
                  <p className="t-c">
                    <button type="submit">Save</button>
                  </p>
                </form>
              </div>
          </div>
  }


}

export default AddTask
