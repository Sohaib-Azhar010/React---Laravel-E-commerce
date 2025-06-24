import React from 'react'
import Layout from './common/Layout'
import { Link } from 'react-router-dom'
import ProductImgOne from '../assets/images/Mens/seven.jpg'

const Cart = () => {
    return (
        <Layout>
            <div className="container px-5">
                <div className="container my-4 px-4 py-4 bg-glossy-blue rounded">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mb-0">
                            <li className="breadcrumb-item">
                                <Link to='/' className="text-white text-decoration-none" >Home</Link>
                            </li>
                            <li className="breadcrumb-item active text-white" aria-current="page">Cart</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <div className="container px-5">
                <div className="col-md-12">
                    <h2 className='border-bottom pb-3'>Cart</h2>
                    <table className='table'>
                        <tbody>
                            <tr className="align-middle">
                                {/* Product Image */}
                                <td width={100}>
                                    <img src={ProductImgOne} width={70} alt="" className="img-fluid" />
                                </td>

                                {/* Title + Price + Size */}
                                <td width={600}>
                                    <div className="d-flex flex-column justify-content-center">
                                        <h5 className="mb-2">Product Title</h5>
                                        <div className="d-flex align-items-center">
                                            <span className="me-2">$45</span>
                                            <button className="btn btn-sm btn-outline-secondary">M</button>
                                        </div>
                                    </div>
                                </td>

                                {/* Quantity */}
                                <td width={100}>
                                    <input type="number" value={1} className="form-control text-center" />
                                </td>

                                {/* Delete Button */}
                                <td >
                                    <button className="btn btn-sm btn-outline-dark">
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </td>
                            </tr>

                        </tbody>

                    </table>
                </div>

                <div className="row">
                    <div className="col-md-8">

                    </div>
                    <div className="col-md-4">
                        <div className="card shadow-sm p-4 bg-light rounded">
                            <h5 className="mb-4 fw-bold">Order Summary</h5>

                            <div className="d-flex justify-content-between mb-2">
                                <span>Subtotal</span>
                                <span>$90.00</span>
                            </div>

                            <div className="d-flex justify-content-between mb-2">
                                <span>Shipping</span>
                                <span>$5.00</span>
                            </div>

                            <hr />

                            <div className="d-flex justify-content-between mb-3 fw-bold">
                                <span>Total</span>
                                <span>$95.00</span>
                            </div>

                            <button className="btn btn-primary w-100">
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Cart
