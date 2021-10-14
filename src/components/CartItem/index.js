import {BiRupee} from 'react-icons/bi'

import './index.css'

const count = 0

const CartItem = props => {
  const {itemCart, updateCost, itemsCount, updateItems, isTrue} = props
  updateCost(count)

  const updateItemsCount = () => {}

  return (
    <>
      <li className="cart-list">
        <div className="cart-merge">
          <img src={itemCart.imageUrl} alt="ok" className="cart-image" />
          <h1 className="cart-name">{itemCart.name}</h1>
        </div>
        <div className="cart-star-container">
          <div testid="decrement-count">
            <button
              type="button"
              className="removeItems"
              testid="decrement-quantity"
            >
              -
            </button>
          </div>
          <div testid="foodItem">0</div>
          <div testid="increment-count">
            <button
              type="button"
              className="removeItems"
              testid="increment-quantity"
              onClick={updateItemsCount}
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
          <div className="star-container">
            <div testid="decrement-count">
              <button type="button" className="removeItems">
                -
              </button>
            </div>
            <div testid="foodItem">{count}</div>
            <div testid="increment-count">
              <button
                type="button"
                className="removeItems"
                onClick={updateItemsCount}
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
    </>
  )
}
export default CartItem
