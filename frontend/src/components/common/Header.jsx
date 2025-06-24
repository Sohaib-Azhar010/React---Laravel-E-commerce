import React from 'react'
import logo from '../../assets/images/logo.png'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <>
      <header className='shadow'>
        <div className='bg-glossy-blue text-center py-3'>
          <span className='text-white'>Your Fashion Partner</span>
        </div>
      </header>

      <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
        <div className="container-fluid">
          {/* Left: Logo */}
          <a className="navbar-brand" href="/">
            <img
              src={logo}
              alt="Logo"
              width="100"
              height="40"
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

          {/* Navbar content */}
          <div className="collapse navbar-collapse justify-content-between" id="navbarContent">
            {/* Center: Nav Links */}
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="/men">Men</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/women">Women</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/kids">Kids</a>
              </li>
            </ul>

            {/* Right: Profile & Cart */}
            <div className="d-flex align-items-center gap-3">
              <a href="/profile" className="text-dark">
                <i className="bi bi-person fs-5"></i>
              </a>
              <Link className='text-dark' to='/cart'><i className="bi bi-cart fs-5"></i></Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header
