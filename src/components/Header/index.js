import {Link, withRouter} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {GiHamburgerMenu} from 'react-icons/gi'
import {AiFillCloseCircle} from 'react-icons/ai'

import './index.css'

class Header extends Component {
  state = {burgerState: false}

  removeToken = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  getHamburger = () => {
    const {burgerState} = this.state
    this.setState({burgerState: !burgerState})
  }

  getHam = () => {
    this.setState({burgerState: false})
  }

  render() {
    const {burgerState} = this.state
    const {history} = this.props
    const {location} = history
    const {pathname} = location

    const homeColor = pathname !== '/cart' ? 'one' : null
    const cartColor = pathname === '/cart' ? 'one' : null
    const burgerStateOne =
      burgerState === true ? 'header-ul-container-add' : 'header-ul-remove'

    return (
      <>
        <nav className="navbar">
          <div className="image-nav-container">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/image-link-getter/image/upload/v1633350279/Vectorlogo_cxrhby.jpg"
                alt="website logo"
                className="tasty-logo"
              />
            </Link>

            <h1 className="home-tasty-name">Tasty Kitchens</h1>
          </div>
          <GiHamburgerMenu className="hamBurger" onClick={this.getHamburger} />
          <ul className="header-ul-container">
            <Link to="/" className="header-list" onClick={this.updateColor}>
              <li>
                <h1 className={`header-home ${homeColor}`}>Home</h1>
              </li>
            </Link>
            <Link
              to="/cart"
              className="header-list"
              onClick={this.updateCartColor}
            >
              <li>
                <h1 className={`header-home ${cartColor}`}>Cart</h1>
              </li>
            </Link>
            <button
              type="button"
              className="header-button"
              onClick={this.removeToken}
            >
              Logout
            </button>
          </ul>
        </nav>
        <ul className={burgerStateOne}>
          <div className="add">
            <Link to="/" className="header-list" onClick={this.updateColor}>
              <li>
                <h1 className={`header-home ${homeColor}`}>Home</h1>
              </li>
            </Link>
            <Link
              to="/cart"
              className="header-list"
              onClick={this.updateCartColor}
            >
              <li>
                <h1 className={`header-home ${cartColor}`}>Cart</h1>
              </li>
            </Link>
            <button
              type="button"
              className="header-button"
              onClick={this.removeToken}
            >
              Logout
            </button>
          </div>
          <AiFillCloseCircle className="closer" onClick={this.getHam} />
        </ul>
      </>
    )
  }
}

export default withRouter(Header)
