import {BiRupee} from 'react-icons/bi'
import {Component} from 'react'

import './index.css'

class CartItem extends Component {
  state = {newArrayOne: 0}

  componentDidMount() {
    this.showQuantity()
  }

  showQuantity = () => {
    const {itemCart} = this.props

    const getSaveItemsOne = localStorage.getItem('cartData')
    const convertSaveItemsOne = JSON.parse(getSaveItemsOne)
    if (convertSaveItemsOne.length > 0) {
      const getQuantityFromSaveItemsOne = convertSaveItemsOne.filter(
        eachOne => eachOne.id === itemCart.id,
      )
      if (getQuantityFromSaveItemsOne.length > 0) {
        this.setState({newArrayOne: getQuantityFromSaveItemsOne[0].quantity})
      }
    }
  }

  updateItemsCount = () => {
    const {itemCart, getCostFun} = this.props

    const getSaveItems = localStorage.getItem('cartData')
    const convertSaveItems = JSON.parse(getSaveItems)
    const getSaveItemsFromMap = convertSaveItems.map(eachFood => {
      if (eachFood.id === itemCart.id) {
        return {...eachFood, quantity: eachFood.quantity + 1}
      }
      return eachFood
    })
    localStorage.setItem('cartData', JSON.stringify(getSaveItemsFromMap))
    this.showQuantity()
    getCostFun()
  }

  removeCartSaveItems = () => {
    const {itemCart, getCostFun, changeState} = this.props

    const getSaveItems = localStorage.getItem('cartData')
    const convertSaveItems = JSON.parse(getSaveItems)

    const getSaveItemsFromMap = convertSaveItems.map(eachFood => {
      if (eachFood.id === itemCart.id) {
        if (eachFood.quantity > 1) {
          return {...eachFood, quantity: eachFood.quantity - 1}
        }
        return []
      }
      return eachFood
    })

    const getValueFromFilters = getSaveItemsFromMap.filter(
      eachFilter => eachFilter.length !== 0,
    )
    if (getValueFromFilters.length > 0) {
      localStorage.setItem('cartData', JSON.stringify(getValueFromFilters))
      changeState()
    } else {
      localStorage.setItem('cartData', JSON.stringify([]))
      changeState()
    }
    this.showQuantity()
    getCostFun()
  }

  render() {
    const {itemCart} = this.props
    const {newArrayOne} = this.state

    return (
      <div testid="cartItem">
        <li className="cart-list">
          <div className="cart-merge">
            <img src={itemCart.imageUrl} alt="Items" className="cart-image" />
            <h1 className="cart-name">{itemCart.name}</h1>
          </div>
          <div className="cart-star-container">
            {/* <h1 className="cart-name-mobile">{itemCart.name}</h1> */}
            <div className="cart-star-con">
              <div>
                <button
                  type="button"
                  className="removeItems"
                  testid="decrement-quantity"
                  onClick={this.removeCartSaveItems}
                >
                  -
                </button>
              </div>
              <div>
                <p testid="item-quantity">{newArrayOne}</p>
              </div>
              <div>
                <button
                  type="button"
                  className="removeItems"
                  testid="increment-quantity"
                  onClick={this.updateItemsCount}
                >
                  +
                </button>
              </div>
            </div>

            {/* <div className="hide-button">
              <BiRupee className="color" />
              <p className="color">{itemCart.cost}</p>
            </div> */}
          </div>
          <div className="mobile-cart-merge">
            <BiRupee className="color" />
            <p className="color">{itemCart.cost}</p>
          </div>
        </li>
      </div>
    )
  }
}

export default CartItem
