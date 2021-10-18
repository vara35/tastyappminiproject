import {BsFilterLeft} from 'react-icons/bs'

import './index.css'

const PopularRestaurant = props => {
  const {updateSortItems, sortByOptions, sortedValue} = props

  const SortItemsFuntion = event => {
    updateSortItems(event.target.value)
  }
  return (
    <div className="popular-bar-container" testid="restaurant-item">
      <div className="popular-container" testid="restaurant-item">
        <h1 className="popular-text">Popular Restaurants</h1>
        <p className="popular-name">
          Select Your favourite restaurant special dish and make your day
          happy...
        </p>
      </div>
      <div className="icon-bar-container" testid="restaurant-item">
        <BsFilterLeft />
        <div className="dropDown-container" testid="restaurant-item">
          <p className="sort">Sort By</p>
          <select
            className="drop-down"
            onChange={SortItemsFuntion}
            value={sortedValue}
          >
            {sortByOptions.map(eachItem => (
              <option
                value={eachItem.value}
                key={eachItem.id}
                className="option"
              >
                {eachItem.displayText}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

export default PopularRestaurant
