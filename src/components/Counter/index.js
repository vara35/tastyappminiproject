import {Component} from 'react'
import {FaLessThan, FaGreaterThan} from 'react-icons/fa'

import './index.css'

class Counter extends Component {
  onDecrement = () => {
    const {decreaseItems} = this.props
    decreaseItems()
  }

  onIncrement = () => {
    const {increaseItems} = this.props
    increaseItems()
  }

  render() {
    const {offSetValue} = this.props
    return (
      <div className="greater-container" testid="restaurant-item">
        <button
          type="button"
          onClick={this.onDecrement}
          className="greater-icon"
        >
          <FaLessThan className="icon" testid="pagination-left-button" />
        </button>
        <div testid="active-page-number">{offSetValue} of 30 </div>
        <button
          type="button"
          onClick={this.onIncrement}
          className="greater-icon"
        >
          <FaGreaterThan className="icon" testid="pagination-right-button" />
        </button>
      </div>
    )
  }
}

export default Counter
