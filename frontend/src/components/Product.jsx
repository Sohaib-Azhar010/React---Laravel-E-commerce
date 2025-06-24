import React, { useState } from 'react'
import Layout from './common/Layout'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Thumbs, FreeMode, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { Rating } from 'react-simple-star-rating'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import ProductImgOne from '../assets/images/Mens/seven.jpg'
import ProductImgTwo from '../assets/images/Mens/two.jpg'
import ProductImgThre from '../assets/images/Mens/three.jpg'

const Product = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [rating, setRating] = useState(4)

  return (
    <Layout>
      <div className="container px-5">
        <div className="container my-4 px-4 py-4 bg-glossy-blue rounded">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <Link to='/' className="text-white text-decoration-none" >Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to='/shop' className="text-white text-decoration-none" >Shop</Link>
              </li>
              <li className="breadcrumb-item active text-white" aria-current="page">Product Title</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container product-detail px-5">
        <div className="row">
          <div className="col-md-5">
            <div className="row">
              <div className="col-2">
                <Swiper
                  style={{
                    '--swiper-navigation-color': '#000',
                    '--swiper-pagination-color': '#000',
                  }}
                  onSwiper={setThumbsSwiper}
                  loop={true}
                  direction={`vertical`}
                  spaceBetween={10}
                  slidesPerView={6}
                  freeMode={true}
                  watchSlidesProgress={true}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="mySwiper mt-2"
                >

                  <SwiperSlide>
                    <div className='content'>
                      <img
                        src={ProductImgOne}
                        alt=""
                        height={100}
                        className='w-100' />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className='content'>
                      <img
                        src={ProductImgOne}
                        alt=""
                        height={100}
                        className='w-100' />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className='content'>
                      <img
                        src={ProductImgOne}
                        alt=""
                        height={100}
                        className='w-100' />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className='content'>
                      <img
                        src={ProductImgOne}
                        alt=""
                        height={100}
                        className='w-100' />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className='content'>
                      <img
                        src={ProductImgOne}
                        alt=""
                        height={100}
                        className='w-100' />
                    </div>
                  </SwiperSlide>
                </Swiper>

              </div>
              <div className="col-10">
                <Swiper
                  style={{
                    '--swiper-navigation-color': '#000',
                    '--swiper-pagination-color': '#000',
                  }}
                  loop={true}
                  spaceBetween={0}
                  navigation={true}
                  thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="mySwiper2"
                >

                  <SwiperSlide >
                    <div className='content'>
                      <img
                        src={ProductImgTwo}
                        alt=""
                        className='w-100' />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide >
                    <div className='content'>
                      <img
                        src={ProductImgThre}
                        alt=""
                        className='w-100' />
                    </div>
                  </SwiperSlide>
                </Swiper>

              </div>
            </div>
          </div>

          <div className="col-md-7">
            <h2>Product Title</h2>
            <div className="d-flex">
              <Rating
                readonly
                initialValue={rating}
                size={20}
              />
              <span className='pt-1 ps-2'>10 Reviews</span>
            </div>

            <div className="pricing mt-2">
              <div className="price text-dark">
                $45
                <span className="old-price">$55</span>
              </div>
            </div>

            <div className='mt-2'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />
              Ut consequuntur unde maxime molestias minima, quisquam vero ab consectetu. <br />
              neque aut ipsam quod sapiente! Qui incidunt quo inventore dolor consectetur tempora.
            </div>

            <div className="sizes mt-3">
              <span className='me-2'>Select Size:</span>
              <button className='btn btn-size ms-1'>S</button>
              <button className='btn btn-size ms-1'>M</button>
              <button className='btn btn-size ms-1'>L</button>
              <button className='btn btn-size ms-1'>XL</button>
            </div>

            <div className="add-to-cart mt-4">
              <button className='btn btn-primary text-uppercase'>Add to Cart</button>
            </div>

            <hr />

            <p>SKU: 112233</p>


          </div>
        </div>

        <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="mb-3 mt-5"
      >
        <Tab eventKey="home" title="Description">
          Tab content for Description
        </Tab>
        <Tab eventKey="profile" title="Reviews (10)">
          Tab content for Reviews
        </Tab>
       
      </Tabs>
      </div>

      
    </Layout>

  )
}

export default Product
