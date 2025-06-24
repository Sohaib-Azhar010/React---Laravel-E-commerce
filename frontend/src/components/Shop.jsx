import React from 'react'
import Layout from './common/Layout'
import card_image from '../assets/images/Mens/eight.jpg'


const Shop = () => {
  return (
    <>
      <Layout>
        <div className="container px-5">
          <div className="container my-4 px-4 py-4 bg-glossy-blue rounded">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0">
                <li className="breadcrumb-item">
                  <a href="#" className="text-white text-decoration-none">Home</a>
                </li>
                <li className="breadcrumb-item active text-white" aria-current="page">Shop</li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="container px-5">
          <div className="row">
            <div className="col-md-3 mb-4">
              <div className="bg-light p-4 rounded shadow-sm">
                {/* Category Filter */}
                <h5 className="fw-bold mb-3">Categories</h5>
                <ul className="list-unstyled">
                  <li><input type="checkbox" className="form-check-input me-2" id="men" /> <label htmlFor="men">Men</label></li>
                  <li><input type="checkbox" className="form-check-input me-2" id="women" /> <label htmlFor="women">Women</label></li>
                  <li><input type="checkbox" className="form-check-input me-2" id="kids" /> <label htmlFor="kids">Kids</label></li>
                </ul>

                <hr />

                {/* Brand Filter */}
                <h5 className="fw-bold mb-3">Brands</h5>
                <ul className="list-unstyled">
                  <li><input type="checkbox" className="form-check-input me-2" id="nike" /> <label htmlFor="nike">Nike</label></li>
                  <li><input type="checkbox" className="form-check-input me-2" id="adidas" /> <label htmlFor="adidas">Adidas</label></li>
                  <li><input type="checkbox" className="form-check-input me-2" id="puma" /> <label htmlFor="puma">Puma</label></li>
                  <li><input type="checkbox" className="form-check-input me-2" id="zara" /> <label htmlFor="zara">Zara</label></li>
                </ul>
              </div>
            </div>

            <div className="col-md-9">
              <div className="row g-1">
                <div className="col-12 col-md-6 col-lg-3">
                  <div className="card product-card h-100">
                    <img
                      src={card_image}
                      className="card-img-top product-img"
                      alt="Classic Denim Jacket"
                    />
                    <div className="card-body d-flex flex-column justify-content-between">
                      <div>
                        <h5 className="card-title">Classic Denim Jacket</h5>
                        <div className="price text-dark">
                          $45 <span className="old-price">$55</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Repeat more cards */}
                <div className="col-12 col-md-6 col-lg-3">
                  <div className="card product-card h-100">
                    <img
                      src={card_image}
                      className="card-img-top product-img"
                      alt="Classic Denim Jacket"
                    />
                    <div className="card-body d-flex flex-column justify-content-between">
                      <div>
                        <h5 className="card-title">Classic Denim Jacket</h5>
                        <div className="price text-dark">
                          $45 <span className="old-price">$55</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                 <div className="col-12 col-md-6 col-lg-3">
                  <div className="card product-card h-100">
                    <img
                      src={card_image}
                      className="card-img-top product-img"
                      alt="Classic Denim Jacket"
                    />
                    <div className="card-body d-flex flex-column justify-content-between">
                      <div>
                        <h5 className="card-title">Classic Denim Jacket</h5>
                        <div className="price text-dark">
                          $45 <span className="old-price">$55</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                 <div className="col-12 col-md-6 col-lg-3">
                  <div className="card product-card h-100">
                    <img
                      src={card_image}
                      className="card-img-top product-img"
                      alt="Classic Denim Jacket"
                    />
                    <div className="card-body d-flex flex-column justify-content-between">
                      <div>
                        <h5 className="card-title">Classic Denim Jacket</h5>
                        <div className="price text-dark">
                          $45 <span className="old-price">$55</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                 <div className="col-12 col-md-6 col-lg-3">
                  <div className="card product-card h-100">
                    <img
                      src={card_image}
                      className="card-img-top product-img"
                      alt="Classic Denim Jacket"
                    />
                    <div className="card-body d-flex flex-column justify-content-between">
                      <div>
                        <h5 className="card-title">Classic Denim Jacket</h5>
                        <div className="price text-dark">
                          $45 <span className="old-price">$55</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                 <div className="col-12 col-md-6 col-lg-3">
                  <div className="card product-card h-100">
                    <img
                      src={card_image}
                      className="card-img-top product-img"
                      alt="Classic Denim Jacket"
                    />
                    <div className="card-body d-flex flex-column justify-content-between">
                      <div>
                        <h5 className="card-title">Classic Denim Jacket</h5>
                        <div className="price text-dark">
                          $45 <span className="old-price">$55</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>





                {/* ... more cards ... */}
              </div>
            </div>

          </div>

        </div>





      </Layout>
    </>
  )
}

export default Shop
