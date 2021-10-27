import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import Header from '../Header'
import Footer from '../Footer'
import RestaurantDetails from '../RestaurantDetails'
import ParticularItem from '../ParticularItem'

import './index.css'

const specificRestaurantComponent = {
  initial: 'INITIAL',
  inprogress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const newArray = []

class SpecificRestaurant extends Component {
  state = {
    specificApiStatus: specificRestaurantComponent.initial,
    specificRestaurant: [],
    specificItemsDetails: [],
    cartId: '',
    isTrue: false,
  }

  componentDidMount() {
    this.getRestaurant()
  }

  getRestaurant = async () => {
    this.setState({specificApiStatus: specificRestaurantComponent.inprogress})

    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const restaurantUrl = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(restaurantUrl, options)
    if (response.ok === true) {
      const restaurantInfo = await response.json()
      const updatedRestaurantInfo = {
        costForTwo: restaurantInfo.cost_for_two,
        cuisine: restaurantInfo.cuisine,
        imageUrl: restaurantInfo.image_url,
        id: restaurantInfo.id,
        itemsCount: restaurantInfo.items_count,
        location: restaurantInfo.location,
        opensAt: restaurantInfo.opens_at,
        name: restaurantInfo.name,
        reviewsCount: restaurantInfo.reviews_count,
        rating: restaurantInfo.rating,
      }

      const foodItems = restaurantInfo.food_items.map(eachFood => ({
        cost: eachFood.cost,
        foodType: eachFood.food_type,
        imageUrl: eachFood.image_url,
        name: eachFood.name,
        rating: eachFood.rating,
        id: eachFood.id,
      }))
      this.setState({
        specificApiStatus: specificRestaurantComponent.success,
        specificRestaurant: foodItems,
        specificItemsDetails: updatedRestaurantInfo,
      })
    } else {
      this.setState({specificApiStatus: specificRestaurantComponent.failure})
    }
  }

  updateCart = id => {
    const {specificRestaurant} = this.state
    const filterItems = specificRestaurant.filter(
      eachItem => eachItem.id === id,
    )

    const getSaveItemsOne = localStorage.getItem('cartData')
    const convertSaveItemsOne = JSON.parse(getSaveItemsOne)

    const check = convertSaveItemsOne.some(
      eachFoodItem => eachFoodItem.id === id,
    )
    console.log(check)

    if (check === false) {
      const updateCartItems = filterItems.map(eachOne => ({
        cost: eachOne.cost,
        quantity: 1,
        id: eachOne.id,
        imageUrl: eachOne.imageUrl,
        name: eachOne.name,
      }))
      newArray.push(updateCartItems[0])

      localStorage.setItem('cartData', JSON.stringify(newArray))
    }

    this.setState({cartId: id, isTrue: true})
  }

  restaurantSuccess = () => {
    const {specificRestaurant, cartId, isTrue} = this.state
    return (
      <ul className="ul-restaurant-item-container">
        {specificRestaurant.map(eachOne => (
          <ParticularItem
            item={eachOne}
            key={eachOne.id}
            updateCart={this.updateCart}
            isActive={isTrue}
            cartID={cartId}
          />
        ))}
      </ul>
    )
  }

  restaurantInprogress = () => (
    <div className="home-new" testid="restaurant-details-loader">
      <Loader type="TailSpin" height="30px" width="30px" color="#F7931E" />
    </div>
  )

  initiateRestaurant = () => {
    this.getRestaurant()
  }

  restaurantFailure = () => (
    <div className="home-new">
      <img
        src="https://res.cloudinary.com/image-link-getter/image/upload/v1633514187/Layer_1_errxca.jpg"
        alt="not found"
        className="not-found-image"
      />
      <h1 className="not-found-name"> Page Not Found</h1>
      <p className="not-found-description">
        we are sorry, the page you requested could not be found Please go back
        to the homepage
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={this.initiateRestaurant}
      >
        Retry
      </button>
    </div>
  )

  getRestaurantComponent = () => {
    const {specificApiStatus} = this.state
    switch (specificApiStatus) {
      case specificRestaurantComponent.success:
        return this.restaurantSuccess()
      case specificRestaurantComponent.inprogress:
        return this.restaurantInprogress()
      case specificRestaurantComponent.failure:
        return this.restaurantFailure()
      default:
        return null
    }
  }

  render() {
    const {specificItemsDetails} = this.state

    return (
      <div className="home-container">
        <div className="home-items-container">
          <Header />
          <RestaurantDetails specificItemsDetails={specificItemsDetails} />
          {this.getRestaurantComponent()}
        </div>
        <Footer />
      </div>
    )
  }
}
export default SpecificRestaurant
