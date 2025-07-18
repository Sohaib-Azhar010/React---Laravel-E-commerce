import React from 'react'
import logo from '../../assets/images/logo.png'
import { Link } from 'react-router-dom'
import '../../assets/css/style.css'
import { useCart } from '../context/CartContext';

const Header = () => {
  const { cartCount } = useCart();
  return (
    <>
      <div className="animated-bg">
        <div className="blob"></div>
        <div className="blob"></div>
        <div className="blob"></div>
      </div>

      <header className='shadow'>
        <div className='bg-glossy-blue text-center py-3'>
          <span className='text-white'>Freshen Your Soul With Scentio</span>
        </div>
      </header>

      <nav className="navbar navbar-expand-lg navbar-light bg-light px-3 position-relative fixed-top">
        <div className="container-fluid">
          {/* Left: Logo */}
          <a className="navbar-brand" href="/">
            <img
              src={logo}
              alt="Logo"
              width="150"
              className="d-inline-block align-text-top"
            />
          </a>

          {/* Toggler for mobile view */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Content */}
          <div className="collapse navbar-collapse" id="navbarContent">
            {/* Center: Nav Links */}
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-lg-auto text-center">
              <li className="nav-item">
                <Link className="nav-link" to={'/'} >Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={'/shop'}>Shop</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={'/contact'}>Contact</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={'/about'}>About Us</Link>
              </li>
            </ul>

            {/* Right: Profile & Cart */}
            <div className="d-flex align-items-center gap-3 ms-auto">
              <Link className="text-dark position-relative" to="/cart">
                <i className="bi bi-cart fs-5"></i>
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark"
                  style={{ fontSize: '0.65rem', padding: '4px 6px' }}
                >
                  {cartCount}
                </span>
              </Link>

            </div>
          </div>
        </div>
      </nav>

    </>
  )
}

export default Header
