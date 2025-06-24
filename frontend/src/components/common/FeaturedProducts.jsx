import React from 'react'
import card_image from '../../assets/images/Mens/seven.jpg'
import { Link } from 'react-router-dom'

const FeaturedProducts = () => {
  return (
    <div className="container p-5">
                <h2 className="text-center mb-4 ">Featured Products</h2>
    
                <div className="row justify-content-center">
                    <div className="col-12 col-md-6 col-lg-3">
                        <Link to='/product'>
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
                                        $45
                                        <span className="old-price">$55</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </Link>
                    </div>
                    <div className="col-12 col-md-6 col-lg-3">
                        <Link to='/product'>
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
                                        $45
                                        <span className="old-price">$55</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </Link>
                    </div>
                    <div className="col-12 col-md-6 col-lg-3">
                        <Link to='/product'>
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
                                        $45
                                        <span className="old-price">$55</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </Link>
                    </div>
                    <div className="col-12 col-md-6 col-lg-3">
                        <Link to='/product'>
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
                                        $45
                                        <span className="old-price">$55</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </Link>
                    </div>
                    
                </div>
            </div>
  )
}

export default FeaturedProducts
