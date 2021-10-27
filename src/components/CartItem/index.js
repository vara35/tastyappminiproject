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
    const getQuanityFromSaveItemsOne = convertSaveItemsOne.filter(
      eachOne => eachOne.id === itemCart.id,
    )
    this.setState({newArrayOne: getQuanityFromSaveItemsOne[0].quantity})
  }

  updateItemsCount = () => {
    const {itemCart} = this.props

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
  }

  removeCartSaveItems = () => {
    const {itemCart} = this.props

    const getSaveItems = localStorage.getItem('cartData')
    const convertSaveItems = JSON.parse(getSaveItems)

    const getSaveItemsFromMap = convertSaveItems.map(eachFood => {
      if (eachFood.id === itemCart.id) {
        if (eachFood.quantity > 0) {
          return {...eachFood, quantity: eachFood.quantity - 1}
        }

        // const remove = convertSaveItems.filter(
        //   eachNew => eachNew.id !== itemCart.id,
        // )
      }
      return eachFood
    })
    localStorage.setItem('cartData', JSON.stringify(getSaveItemsFromMap))
    this.showQuantity()
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
          <div className="mobile-cart-merge">
            <BiRupee className="color" />
            <p className="color">{itemCart.cost}</p>
          </div>
          <div className="mobile-cart-view">
            <h1 className="cart-name-one">{itemCart.name}</h1>
            <div className="star-container">
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
                  onClick={this.updateItemsCount}
                  testid="increment-quantity"
                >
                  +
                </button>
              </div>
            </div>
            <div className="cart-merge">
              <BiRupee className="color" />
              <p className="color">{itemCart.cost}</p>
            </div>
          </div>
        </li>
      </div>
    )
  }
}

export default CartItem
