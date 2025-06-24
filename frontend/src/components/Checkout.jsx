import React, { useState } from 'react'
import Layout from './common/Layout'
import { Link } from 'react-router-dom'
import ProductImgOne from '../assets/images/Mens/seven.jpg'


const Checkout = () => {
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const handlePaymentMethod = (e) => {
        setPaymentMethod(e.target.value);
    };
    return (
        <Layout>
            <div className="container px-5">
                <div className="container my-4 px-4 py-4 bg-glossy-blue rounded">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mb-0">
                            <li className="breadcrumb-item">
                                <Link to='/' className="text-white text-decoration-none" >Home</Link>
                            </li>
                            <li className="breadcrumb-item active text-white" aria-current="page">Checkout</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <div className="container px-5">
                <div className="row">
                    <div className="col-md-7">
                        <h3 className='border-bottom pb-2'>Billing Details</h3>
                        <form action="" className='mt-3'>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input type="text" className='form-control' placeholder='Name' />
                                    </div>

                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input type="email" className='form-control' placeholder='Email' />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <textarea name="" className='form-control' rows={3} placeholder='Address' id=""></textarea>
                                </div>

                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input type="text" className='form-control' placeholder='City' />
                                    </div>

                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input type="text" className='form-control' placeholder='State' />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input type="text" className='form-control' placeholder='ZIP Code' />
                                    </div>

                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input type="text" className='form-control' placeholder='Mobile No.' />
                                    </div>
                                </div>

                            </div>
                        </form>

                    </div>
                    <div className="col-md-5">
                        <h3>Billing Items</h3>
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
                                        <span className='text-secondary'>x 1</span>
                                    </td>


                                </tr>
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
                                        <span className='text-secondary'>x 1</span>
                                    </td>


                                </tr>

                            </tbody>

                        </table>

                        <div className="row">

                            <div className="col-md-12">
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

                                    {/* Payment Method */}
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Payment Method</label>

                                        <div className="form-check">
                                            <input
                                                className="form-check-input text-primary"
                                                type="radio"
                                                name="paymentMethod"
                                                id="stripe"
                                                value={'stripe'}
                                                checked={paymentMethod == 'stripe'}
                                                onClick={handlePaymentMethod}

                                            />
                                            <label className="form-check-label" htmlFor="stripe">
                                                Stripe
                                            </label>
                                        </div>

                                        <div className="form-check">
                                            <input
                                                className="form-check-input text-primary"
                                                type="radio"
                                                name="paymentMethod"
                                                id="cod"
                                                value={'cod'}
                                                checked={paymentMethod == 'cod'}
                                                onClick={handlePaymentMethod}
                                            />
                                            <label className="form-check-label" htmlFor="cod">
                                                Cash on Delivery (COD)
                                            </label>
                                        </div>
                                    </div>

                                    <button className="btn btn-primary w-100">
                                        Place Order
                                    </button>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </Layout>
    )
}

export default Checkout
