import {Component} from 'react'
import Slider from 'react-slick'
import './index.css'

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
    }
    const {item} = this.props

    return (
      <div className="carousel-item" testid="restaurant-item">
        <Slider {...settings}>
          {item.map(eachItem => (
            <div className="new" key={eachItem.id} testid="restaurant-item">
              <img
                src={eachItem.imageUrl}
                alt="offer"
                className="carouselImage"
              />
            </div>
          ))}
        </Slider>
      </div>
    )
  }
}
