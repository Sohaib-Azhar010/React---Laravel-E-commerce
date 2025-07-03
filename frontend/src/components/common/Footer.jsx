import React from 'react'
import logo2 from '../../assets/images/logo-white.png'
import { Link } from 'react-router-dom'


const Footer = () => {
  return (
    <>
     <footer className="bg-glossy-blue text-white p-5 ">
      <div className="container">
        <div className="row text-center text-md-start">
          {/* Brand & Slogan */}
          <div className="col-md-3 mb-4">
            <img src={logo2} alt="Pure Wear Logo" width={150} />
          </div>
          {/* Quick Links */}
          <div className="col-md-3 mb-4">
            <h5 className="fw-bold">Pages</h5>
            <ul className="list-unstyled">
              <li> <Link className="text-white text-decoration-none" to={'/'}>Home</Link> </li>
              <li> <Link className="text-white text-decoration-none" to={'/shop'}>Shop</Link></li>
              <li> <Link className="text-white text-decoration-none" to={'/contact'}>Contact</Link></li>
              <li> <Link className="text-white text-decoration-none" to={'/about'}>About Us</Link></li>
            </ul>
          </div>

          <div className="col-md-3 mb-4">
            <h5 className="fw-bold">Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link className="text-white text-decoration-none" to={'/admin/login'}>Admin</Link> </li>
            </ul>
          </div>

          {/* Social Media Icons */}
          <div className="col-md-3 mb-4">
            <h5 className="fw-bold">Follow Us</h5>
            <div className="d-flex justify-content-center justify-content-md-start gap-3 mt-3">
              <a href="#" className="text-white fs-5"><i className="bi bi-facebook"></i></a>
              <a href="#" className="text-white fs-5"><i className="bi bi-instagram"></i></a>
              <a href="#" className="text-white fs-5"><i className="bi bi-twitter"></i></a>
              <a href="#" className="text-white fs-5"><i className="bi bi-linkedin"></i></a>
            </div>
          </div>
        </div>

        <hr className="border-secondary" />
        <div className="text-center small text-white">
          &copy; {new Date().getFullYear()} Scentio. All rights reserved.
        </div>
      </div>
    </footer>
      
    </>
  )
}

export default Footer
