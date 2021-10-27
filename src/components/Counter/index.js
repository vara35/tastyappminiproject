import {Component} from 'react'
import {FaLessThan, FaGreaterThan} from 'react-icons/fa'

import './index.css'

class Counter extends Component {
  state = {activeCount: 1}

  onDecrement = () => {
    const {activeCount} = this.state
    const {decreaseItems} = this.props
    if (activeCount > 1) {
      this.setState(prevState => ({activeCount: prevState.activeCount - 1}))
      decreaseItems()
    }
  }

  onIncrement = () => {
    const {increaseItems} = this.props
    const {activeCount} = this.state
    if (activeCount < 4) {
      this.setState(prevState => ({activeCount: prevState.activeCount + 1}))
      increaseItems()
    }
  }

  render() {
    const {activeCount} = this.state
    return (
      <div className="greater-container">
        <button
          type="button"
          onClick={this.onDecrement}
          className="greater-icon"
          testid="pagination-left-button"
        >
          <FaLessThan className="icon" />
        </button>
        <div testid="active-page-number">
          <p>
            <span>{activeCount}</span> of 4
          </p>
        </div>
        <button
          type="button"
          onClick={this.onIncrement}
          className="greater-icon"
          testid="pagination-right-button"
        >
          <FaGreaterThan className="icon" />
        </button>
      </div>
    )
  }
}

export default Counter
