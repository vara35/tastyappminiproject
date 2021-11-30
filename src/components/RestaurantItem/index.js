import {Link} from 'react-router-dom'
import {BsStarFill} from 'react-icons/bs'

import './index.css'

const RestaurantItem = props => {
  const {item} = props
  return (
    <li testid="restaurant-item" className="main-restaurant-list">
      <Link to={`/restaurant/${item.id}`} className="add-new">
        <li className="list-item-restaurant">
          <img
            src={item.imageUrl}
            alt="restaurant"
            className="restaurant-image"
          />
          <div className="restaurant-name-container">
            <h1 className="restaurant-name">{item.name}</h1>
            <p className="foodType">{item.menuType}</p>
            <p className="food-count">{item.cuisine}</p>
            <div className="star-container">
              <BsStarFill className="ratingColor" />
              <p className="food-rating">{item.rating}</p>
              <h1 className="food-review-count">{`(${item.reviewCount} reviews)`}</h1>
            </div>
          </div>
        </li>
      </Link>
    </li>
  )
}

export default RestaurantItem
