import {BsStarFill} from 'react-icons/bs'
import {BiRupee} from 'react-icons/bi'
import {Component} from 'react'

import './index.css'

class ParticularItem extends Component {
  state = {newArrayOne: 1}

  addItems = () => {
    const {item, updateCart} = this.props

    updateCart(item.id)
  }

  showQuantity = () => {
    const {cartID} = this.props

    const getSaveItemsOne = localStorage.getItem('cartData')
    const convertSaveItemsOne = JSON.parse(getSaveItemsOne)
    const getQuanityFromSaveItemsOne = convertSaveItemsOne.filter(
      eachOne => eachOne.id === cartID,
    )
    this.setState({newArrayOne: getQuanityFromSaveItemsOne[0].quantity})
  }

  updateCartSaveItems = () => {
    const {item, updateCart} = this.props
    updateCart(item.id)

    const getSaveItems = localStorage.getItem('cartData')
    const convertSaveItems = JSON.parse(getSaveItems)
    if (convertSaveItems.length > 0) {
      const getSaveItemsFromMap = convertSaveItems.map(eachFood => {
        if (eachFood.id === item.id) {
          return {...eachFood, quantity: eachFood.quantity + 1}
        }
        return eachFood
      })
      localStorage.setItem('cartData', JSON.stringify(getSaveItemsFromMap))
    }

    this.showQuantity()
  }

  removeCartSaveItems = () => {
    const {item} = this.props

    const getSaveItems = localStorage.getItem('cartData')
    const convertSaveItems = JSON.parse(getSaveItems)

    const getSaveItemsFromMap = convertSaveItems.map(eachFood => {
      if (eachFood.id === item.id) {
        return {...eachFood, quantity: eachFood.quantity - 1}
      }
      return eachFood
    })
    localStorage.setItem('cartData', JSON.stringify(getSaveItemsFromMap))
    this.showQuantity()
  }

  render() {
    const {item, isActive} = this.props
    const {newArrayOne} = this.state

    return (
      <li className="add-new">
        <div className="list-item-restaurant" testid="foodItem">
          <img
            src={item.imageUrl}
            alt="restaurant"
            className="restaurant-image"
          />
          <div className="restaurant-name-container">
            <h1 className="restaurant-name">{item.name}</h1>
            <div className="star-container">
              <BiRupee className="ratingThe" />
              <p className="particular-foodType">{item.cost}</p>
            </div>
            <div className="star-container">
              <BsStarFill className="ratingColor" />
              <p className="food-rating">{item.rating}</p>
            </div>
            {isActive ? (
              <div className="star-container">
                <div>
                  <button
                    testid="decrement-count"
                    type="button"
                    className="removeItems"
                    onClick={this.removeCartSaveItems}
                  >
                    -
                  </button>
                </div>
                <div>
                  <p testid="active-count">{newArrayOne}</p>
                </div>
                <div>
                  <button
                    testid="increment-count"
                    type="button"
                    className="removeItems"
                    onClick={this.updateCartSaveItems}
                  >
                    +
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                className="add-button"
                onClick={this.addItems}
              >
                Add
              </button>
            )}
          </div>
        </div>
      </li>
    )
  }
}

export default ParticularItem
