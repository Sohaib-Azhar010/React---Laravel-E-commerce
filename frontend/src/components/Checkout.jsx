import React, { useState , useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Layout from './common/Layout';
import { clearCart } from './utils/cart';
import { loadStripe } from '@stripe/stripe-js';
import { apiUrl } from './common/http';
import { toast } from 'react-toastify';
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx"); // Replace with your Stripe publishable key

const Checkout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { items = [], subtotal = 0, shipping = 0, total = 0 } = location.state || {};
    const [loading, setLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        mobile: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handlePaymentMethod = (e) => {
        setPaymentMethod(e.target.value);
    };

    const handlePlaceOrder = async () => {
        setLoading(true);

        const orderData = {
            ...formData,
            payment_method: paymentMethod,
            items,
            subtotal,
            shipping,
            total,
        };

        try {
            const res = await fetch(`${apiUrl}/order`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(orderData),
            });

            const text = await res.text();

            let data;
            try {
                data = JSON.parse(text);
            } catch (err) {
                throw new Error("Failed to parse JSON. Raw response: " + text);
            }

            if (!res.ok) {
                throw new Error(data.message || "Order failed.");
            }

            if (paymentMethod === 'stripe') {
                const stripe = await stripePromise;
                await stripe.redirectToCheckout({
                    sessionId: data.sessionId,
                });
                return;
            }

            clearCart();
            toast("Order placed successfully!");
            navigate('/payment-success');
            

        } catch (error) {
            console.error("Order Error:", error);
            toast("Something went wrong: " + error.message);
        } finally {
            setLoading(false);
        }

        clearCart();
    };

    return (
        <Layout>
            <div className="container px-5">
                <div className="container my-4 px-4 py-4 bg-glossy-blue rounded">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mb-0">
                            <li className="breadcrumb-item">
                                <Link to='/' className="text-white text-decoration-none">Home</Link>
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
                        <div className='mt-3'>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            className='form-control'
                                            placeholder='Name'
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input
                                            type="email"
                                            className='form-control'
                                            placeholder='Email'
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <textarea
                                        className='form-control'
                                        rows={3}
                                        placeholder='Address'
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                    ></textarea>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            className='form-control'
                                            placeholder='City'
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            className='form-control'
                                            placeholder='State'
                                            name="state"
                                            value={formData.state}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            className='form-control'
                                            placeholder='ZIP Code'
                                            name="zip"
                                            value={formData.zip}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            className='form-control'
                                            placeholder='Mobile No.'
                                            name="mobile"
                                            value={formData.mobile}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5">
                        <h3>Billing Items</h3>
                        <table className='table'>
                            <tbody>
                                {items.map((item, index) => (
                                    <tr key={index} className="align-middle">
                                        <td width={100}>
                                            <img src={item.image} width={70} alt={item.title} className="img-fluid" />
                                        </td>
                                        <td width={600}>
                                            <div className="d-flex flex-column justify-content-center">
                                                <h5 className="mb-2">{item.title}</h5>
                                                <div className="d-flex align-items-center">
                                                    <span className="me-2">${item.price}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td width={100}>
                                            <span className='text-secondary'>x {item.quantity}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card shadow-sm p-4 bg-light rounded">
                                    <h5 className="mb-4 fw-bold">Order Summary</h5>
                                    <div className="d-flex justify-content-between mb-2">
                                        <span>Subtotal</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="d-flex justify-content-between mb-2">
                                        <span>Shipping</span>
                                        <span>${shipping.toFixed(2)}</span>
                                    </div>
                                    <hr />
                                    <div className="d-flex justify-content-between mb-3 fw-bold">
                                        <span>Total</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Payment Method</label>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input text-primary"
                                                type="radio"
                                                name="paymentMethod"
                                                id="stripe"
                                                value="stripe"
                                                checked={paymentMethod === 'stripe'}
                                                onChange={handlePaymentMethod}
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
                                                value="cod"
                                                checked={paymentMethod === 'cod'}
                                                onChange={handlePaymentMethod}
                                            />
                                            <label className="form-check-label" htmlFor="cod">
                                                Cash on Delivery (COD)
                                            </label>
                                        </div>
                                    </div>
                                    <button
                                        className="btn btn-primary w-100"
                                        onClick={handlePlaceOrder}
                                        disabled={loading}
                                    >
                                        {loading ? "Placing..." : "Place Order"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Checkout;