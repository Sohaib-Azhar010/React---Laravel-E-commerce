import React from 'react'
import banner1 from '../../assets/images/banner1.jpg'
import banner2 from '../../assets/images/banner2.jpg'
import '../../assets/css/style.css'

const Hero = () => {
  return (
    <>
      <div id="mainCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="carousel-img-wrapper">
              <img
                src={banner1}
                className="img-fluid d-block w-100"
                alt="Slide 1"
              />
            </div>
          </div>
          <div className="carousel-item">
            <div className="carousel-img-wrapper">
              <img
                src={banner2}
                className="img-fluid d-block w-100"
                alt="Slide 2"
              />
            </div>
          </div>

        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#mainCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#mainCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

    </>
  )
}

export default Hero
