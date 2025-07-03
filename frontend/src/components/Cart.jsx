import React, { useEffect, useState } from 'react';
import Layout from './common/Layout';
import { Link } from 'react-router-dom';
import { getCart, saveCart, removeFromCart } from './utils/cart';


const Cart = () => {
    const [cartItems, setCartItems] = useState({});

    useEffect(() => {
        const items = getCart();
        setCartItems(items);
    }, []);

    const handleQuantityChange = (id, quantity) => {
        const updated = { ...cartItems };
        updated[id].quantity = parseInt(quantity);
        setCartItems(updated);
        saveCart(updated);
    };

    const handleRemove = (id) => {
        const updated = { ...cartItems };
        delete updated[id];
        setCartItems(updated);
        saveCart(updated);
    };

    const cartArray = Object.values(cartItems);
    const subtotal = cartArray.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = 5;
    const total = subtotal + shipping;



    return (
        <Layout>
            <div className="container px-5">
                <div className="container my-4 px-4 py-4 bg-glossy-blue rounded">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mb-0">
                            <li className="breadcrumb-item">
                                <Link to='/' className="text-white text-decoration-none">Home</Link>
                            </li>
                            <li className="breadcrumb-item active text-white" aria-current="page">Cart</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <div className="container px-5">
                <div className="col-md-12">
                    <h2 className='border-bottom pb-3'>Cart</h2>
                    {cartArray.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        <table className='table'>
                            <tbody>
                                {cartArray.map((item) => (
                                    <tr key={item.id} className="align-middle">
                                        <td width={100}>
                                            <img src={item.image} alt={item.title} className='w-100' />
                                        </td>

                                        <td width={600}>
                                            <div className="d-flex flex-column justify-content-center">
                                                <h5 className="mb-2">{item.title}</h5>
                                                <div className="d-flex align-items-center">
                                                    <span className="me-2">${item.price}</span>
                                                </div>
                                            </div>
                                        </td>

                                        <td width={130}>
                                            <div className="input-group quantity-control" style={{ maxWidth: '130px' }}>
                                                <button
                                                    className="btn btn-outline-secondary"
                                                    type="button"
                                                    onClick={() =>
                                                        handleQuantityChange(item.id, Math.max(1, item.quantity - 1))
                                                    }
                                                >
                                                    −
                                                </button>

                                                <input
                                                    type="text"
                                                    className="form-control text-center"
                                                    value={item.quantity}
                                                    readOnly
                                                />

                                                <button
                                                    className="btn btn-outline-secondary"
                                                    type="button"
                                                    onClick={() =>
                                                        handleQuantityChange(item.id, item.quantity + 1)
                                                    }
                                                >
                                                    +
                                                </button>
                                            </div>

                                        </td>

                                        <td>
                                            <button onClick={() => handleRemove(item.id)} className="btn btn-sm btn-outline-dark">
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {cartArray.length > 0 && (
                    <div className="row">
                        <div className="col-md-8"></div>
                        <div className="col-md-4">
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

                                <button className="btn btn-primary w-100">
                                    Proceed to Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    )
}


export default Cart
