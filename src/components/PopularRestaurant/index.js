import {BsFilterLeft} from 'react-icons/bs'

import './index.css'

const PopularRestaurant = props => {
  const {
    updateSortItems,
    sortByOptions,
    sortedValue,
    updateSearchResult,
  } = props

  const SortItemsFunction = event => {
    updateSortItems(event.target.value)
  }

  const showSearch = event => {
    updateSearchResult(event.target.value)
  }

  return (
    <div className="popular-bar-container">
      <div className="popular-container">
        <h1 className="popular-text">Popular Restaurants</h1>
        <p className="popular-name">
          Select Your favourite restaurant special dish and make your day
          happy...
        </p>
      </div>
      <input
        type="search"
        className="search-bar"
        placeholder="Search "
        onChange={showSearch}
      />
      <div className="icon-bar-container">
        <BsFilterLeft />
        <div className="dropDown-container">
          <p className="sort">Sort By</p>
          <select
            className="drop-down"
            onChange={SortItemsFunction}
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
