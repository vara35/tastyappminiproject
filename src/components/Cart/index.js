import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import Footer from '../Footer'
import CartItem from '../CartItem'

import './index.css'

const specificRestaurantComponent = {
  initial: 'INITIAL',
  inprogress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
  payed: 'PAYED',
}

class Cart extends Component {
  state = {
    cartApiStatus: specificRestaurantComponent.initial,
    itemsCount: 1,
    cartIdentify: '',
  }

  componentDidMount() {
    this.getCart()
  }

  getCart = () => {
    this.setState({cartApiStatus: specificRestaurantComponent.inprogress})
    this.setState({cartApiStatus: specificRestaurantComponent.success})
  }

  updateCost = cost => {
    console.log(cost)
  }

  updateState = () => {
    const setArray = [
      {
        cost: '',
        foodType: '',
        id: '',
        imageUrl: '',
        name: '',
        rating: '',
      },
      {
        cost: '',
        foodType: '',
        id: '',
        imageUrl: '',
        name: '',
        rating: '',
      },
    ]
    localStorage.setItem('cartData', JSON.stringify([]))
    this.setState({cartApiStatus: specificRestaurantComponent.payed})
  }

  updateItems = id => {
    this.setState(prev => ({itemsCount: prev.itemsCount + 1, cartIdentify: id}))
  }

  cartSuccess = () => {
    const {itemsCount, cartIdentify} = this.state
    const getValues = localStorage.getItem('cartData')
    const convert = JSON.parse(getValues)

    return convert.length > 0 ? (
      <>
        <div className="cart-section-container" testid="restaurant-item">
          <div className="first-section-container" testid="restaurant-item">
            <div className="name-con" testid="restaurant-item">
              <h1 className="item-name">Item</h1>
              <h1 className="item-name">Quantity</h1>
              <h1 className="item-name">Price</h1>
            </div>
            <ul className="cart-ul-container">
              {convert.map(eachOne => (
                <CartItem
                  testid="restaurant-item"
                  itemCart={eachOne}
                  updateCost={this.updateCost}
                  itemsCount={itemsCount}
                  updateItems={this.updateItems}
                  key={eachOne.id}
                  isTrue={cartIdentify === eachOne.id}
                />
              ))}
            </ul>
            <div className="order-container" testid="restaurant-item">
              <p testid="total-price">Order Total : </p>
              <div testid="restaurant-item">
                <p>0</p>
                <button
                  type="button"
                  className="place-order-button"
                  onClick={this.updateState}
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer testid="restaurant-item" />
      </>
    ) : (
      <div className="cart-bottom-container" testid="restaurant-item">
        <img
          src="https://res.cloudinary.com/image-link-getter/image/upload/v1633884154/OBJECTSbowl_xqhwmy.jpg"
          alt="empty cart"
          className="cart-bowl"
        />
        <p className="cart-noProduct">No Orders Yet!</p>
        <p className="cart-your">
          Your cart is empty. Add something from the menu.
        </p>
        <Link to="/">
          <button type="button" className="order">
            Order Now
          </button>
        </Link>
      </div>
    )
  }

  cartInprogress = () => (
    <div className="home-new" testid="restaurants-list-loader">
      <Loader type="TailSpin" height="30px" width="30px" color="#F7931E" />
    </div>
  )

  restaurantPayed = () => (
    <div className="payed-container" testid="restaurant-item">
      <div className="payed-bottom-container" testid="restaurant-item">
        <img
          src="https://res.cloudinary.com/image-link-getter/image/upload/v1634020176/Vectorsucces_mkuizy.jpg"
          alt="success"
          className="success"
        />
        <h1 className="payment-name">Payment Successful</h1>
        <p className="payment-status">
          Thank you for ordering Your payment is successfully completed.
        </p>
        <Link to="/">
          <button type="button" className="order">
            Go To Home Page
          </button>
        </Link>
      </div>
    </div>
  )

  cartFailure = () => (
    <div className="home-new" testid="restaurant-item">
      <img
        src="https://res.cloudinary.com/image-link-getter/image/upload/v1633514187/Layer_1_errxca.jpg"
        alt="not found"
        className="not-found-image"
      />
      <h1 className="not-found-name"> Page Not Found</h1>
      <p className="not-found-description">
        we are sorry, the page you requested could not be found Please go back
        to the homepage
      </p>
      <button type="button" className="retry-button">
        Retry
      </button>
    </div>
  )

  getCartComponent = () => {
    const {cartApiStatus} = this.state
    switch (cartApiStatus) {
      case specificRestaurantComponent.success:
        return this.cartSuccess()
      case specificRestaurantComponent.inprogress:
        return this.cartInprogress()
      case specificRestaurantComponent.failure:
        return this.cartFailure()
      case specificRestaurantComponent.payed:
        return this.restaurantPayed()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="cart-container" testid="restaurant-item">
        <Header testid="restaurant-item" />
        {this.getCartComponent()}
      </div>
    )
  }
}

export default Cart
