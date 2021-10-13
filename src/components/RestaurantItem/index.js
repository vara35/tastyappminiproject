import {Link} from 'react-router-dom'
import {BsStarFill} from 'react-icons/bs'

import './index.css'

const RestaurantItem = props => {
  const {item} = props
  return (
    <Link to={`/restaurant/${item.id}`} className="add-new">
      <li className="list-item-restaurant ">
        <img
          src={item.imageUrl}
          alt="restaurant"
          className="restaurant-image"
        />
        <div className="restaurant-name-container" testid="restaurant-item">
          <h1 className="restaurant-name">{item.name}</h1>
          <p className="foodType">{item.menuType}</p>
          <div className="star-container" testid="restaurant-item">
            <BsStarFill className="ratingColor" />
            <p className="food-rating">{item.rating}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default RestaurantItem
