import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import Header from '../Header'
import Carousel from '../Carousel'
import PopularRestaurant from '../PopularRestaurant'
import RestaurantItem from '../RestaurantItem'
import Footer from '../Footer'
import Counter from '../Counter'

import './index.css'

let count = 1

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const carouselComponent = {
  initiaL: 'INITIAL',
  inprogress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const restaurantComponent = {
  initial: 'INITIAL',
  inprogress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    carouselData: [],
    restaurantData: [],
    carouselApiStatus: carouselComponent.initial,
    restaurantApiStatus: restaurantComponent.initial,
    sortedValue: sortByOptions[1].value,
    offSetValue: 1,
  }

  componentDidMount() {
    this.getCarousel()
    this.getRestaurant()
  }

  getCarousel = async () => {
    this.setState({carouselApiStatus: carouselComponent.inprogress})

    const jwtToken = Cookies.get('jwt_token')
    const carouselUrl = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(carouselUrl, options)
    if (response.ok === true) {
      const carouselInfo = await response.json()
      const updatedCarouselInfo = carouselInfo.offers.map(eachItem => ({
        id: eachItem.id,
        imageUrl: eachItem.image_url,
      }))
      this.setState({
        carouselData: updatedCarouselInfo,
        carouselApiStatus: carouselComponent.success,
      })
    } else {
      this.setState({carouselApiStatus: carouselComponent.failure})
    }
  }

  getRestaurant = async () => {
    const {sortedValue, offSetValue} = this.state
    this.setState({restaurantApiStatus: restaurantComponent.inprogress})

    const jwtToken = Cookies.get('jwt_token')
    const restaurantUrl = `https://apis.ccbp.in/restaurants-list?offset=${offSetValue}&limit=${9}&sort_by_rating=${sortedValue}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(restaurantUrl, options)
    if (response.ok === true) {
      const restaurantInfo = await response.json()
      const updatedRestaurantData = restaurantInfo.restaurants.map(
        eachRestaurant => ({
          name: eachRestaurant.name,
          menuType: eachRestaurant.menu_type,
          rating: eachRestaurant.user_rating.rating,
          ratingColor: eachRestaurant.user_rating.rating_color,
          imageUrl: eachRestaurant.image_url,
          id: eachRestaurant.id,
        }),
      )

      this.setState({
        restaurantApiStatus: restaurantComponent.success,
        restaurantData: updatedRestaurantData,
      })
    } else {
      this.setState({restaurantApiStatus: restaurantComponent.failure})
    }
  }

  carouselSuccess = () => {
    const {carouselData} = this.state
    return <Carousel item={carouselData} testid="restaurant-item" />
  }

  carouselInprogress = () => (
    <div className="home-new">
      <Loader
        type="TailSpin"
        height="30px"
        width="30px"
        color="#F7931E"
        testid="restaurants-offers-loader"
      />
    </div>
  )

  initiateCarousel = () => (
    <ul>
      <li>this.getCarousel()</li>
    </ul>
  )

  carouselFailure = () => (
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
      <button
        type="button"
        className="retry-button"
        onClick={this.initiateCarousel}
      >
        Retry
      </button>
    </div>
  )

  getCarouselComponent = () => {
    const {carouselApiStatus} = this.state
    switch (carouselApiStatus) {
      case carouselComponent.success:
        return this.carouselSuccess()
      case carouselComponent.inprogress:
        return this.carouselInprogress()
      case carouselComponent.failure:
        return this.carouselFailure()
      default:
        return null
    }
  }

  restaurantSuccess = () => {
    const {restaurantData} = this.state
    return (
      <ul className="ul-restaurant-item-container" testid="restaurant-item">
        {restaurantData.map(eachOne => (
          <RestaurantItem
            item={eachOne}
            key={eachOne.id}
            testid="restaurant-item"
          />
        ))}
      </ul>
    )
  }

  restaurantInprogress = () => (
    <div className="home-new">
      <Loader
        type="TailSpin"
        height="30px"
        width="30px"
        color="#F7931E"
        testid="restaurants-list-loader"
      />
    </div>
  )

  initiateRestaurant = () => {
    this.getRestaurant()
  }

  restaurantFailure = () => (
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
    const {restaurantApiStatus} = this.state
    switch (restaurantApiStatus) {
      case restaurantComponent.success:
        return this.restaurantSuccess()
      case restaurantComponent.inprogress:
        return this.restaurantInprogress()
      case restaurantComponent.failure:
        return this.restaurantFailure()
      default:
        return null
    }
  }

  updateSortItems = sortValue => {
    this.setState({sortedValue: sortValue}, this.getRestaurant)
  }

  decreaseItems = () => {
    count -= 1
    const offset = (count - 1) * 9
    if (count > 0) {
      this.setState({offSetValue: offset}, this.getRestaurant)
    }
  }

  increaseItems = () => {
    count += 1
    const offset = (count - 1) * 9
    if (count < 5) {
      this.setState({offSetValue: offset}, this.getRestaurant)
    }
  }

  render() {
    const {sortedValue, offSetValue} = this.state
    const JwtToken = Cookies.get('jwt_token')
    if (JwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <div className="home-container" testid="restaurant-item">
        <div className="home-items-container" testid="restaurant-item">
          <Header testid="restaurant-item" />
          {this.getCarouselComponent()}
          <PopularRestaurant
            sortByOptions={sortByOptions}
            updateSortItems={this.updateSortItems}
            sortedValue={sortedValue}
            testid="restaurant-item"
          />
          <hr />
          {this.getRestaurantComponent()}
          <Counter
            testid="restaurant-item"
            decreaseItems={this.decreaseItems}
            increaseItems={this.increaseItems}
            offSetValue={offSetValue}
          />
        </div>
        <Footer testid="restaurant-item" />
      </div>
    )
  }
}
export default Home
