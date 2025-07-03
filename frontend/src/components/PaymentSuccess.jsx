import React, { useEffect } from 'react'
import Layout from './common/Layout'
import { useCart } from './context/CartContext'
import { clearCart as clearCartUtils } from './utils/cart'
import { Link } from 'react-router-dom'

const PaymentSuccess = () => {
  const cartContext = useCart()
  
  useEffect(() => {
    // Clear the cart when the component mounts
    if (cartContext && cartContext.clearCart) {
      // Use context clearCart if available
      cartContext.clearCart()
    } else {
      // Fallback to utils clearCart
      clearCartUtils()
      // Also manually trigger cart update event
      window.dispatchEvent(new CustomEvent('cartUpdated'))
    }
  }, [])

  return (
    <Layout>
      <div className="container text-center mt-5">
        <div className="">
          <h2 className="text-dark mb-3">🎉 Payment Successful!</h2>
          <p className="text-muted">
            Thank you for your purchase. Your order has been processed successfully.
          </p>
          <Link to={'/'}> <button className='btn btn-dark ' > Back to Homepage</button> </Link>
        </div>
      </div>
    </Layout>
  )
}

export default PaymentSuccess