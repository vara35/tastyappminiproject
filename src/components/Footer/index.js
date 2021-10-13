import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'

import './index.css'

export default function Footer() {
  return (
    <div className="footer-container" testid="restaurant-item">
      <div className="footer-logo-container" testid="restaurant-item">
        <img
          src="https://res.cloudinary.com/image-link-getter/image/upload/v1633602388/Vectorfooter-icon-cap-2_ouadid.jpg"
          alt="website-footer-logo"
          className="footer-logo"
        />
        <h1 className="footer-name">Tasty Kitchens</h1>
      </div>
      <p className="footer-text">
        The only thing we are serious about is food.
      </p>
      <div className="footer-icons-container" testid="restaurant-item">
        <FaPinterestSquare
          className="footer-icon"
          testid="pintrest-social-icon"
        />

        <FaInstagram className="footer-icon" testid="instagram-social-icon" />

        <FaTwitter className="footer-icon" testid="twitter-social-icon" />

        <FaFacebookSquare
          className="footer-icon"
          testid="facebook-social-icon"
        />
      </div>
    </div>
  )
}
