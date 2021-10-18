import {BsStarFill} from 'react-icons/bs'
import {BiRupee} from 'react-icons/bi'

import './index.css'

const ParticularItem = props => {
  const {item, updateCart, isActive} = props
  const addItems = () => {
    updateCart(item.id)
  }

  return (
    <li className="add-new">
      <div className="list-item-restaurant">
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
              <div testid="decrement-count">
                <button type="button" className="removeItems">
                  -
                </button>
              </div>
              <div testid="active-count">1</div>
              <div testid="increment-count">
                <button type="button" className="removeItems">
                  +
                </button>
              </div>
            </div>
          ) : (
            <button type="button" className="add-button" onClick={addItems}>
              Add
            </button>
          )}
        </div>
      </div>
    </li>
  )
}

export default ParticularItem
