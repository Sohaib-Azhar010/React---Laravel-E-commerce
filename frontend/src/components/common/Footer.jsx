import React from 'react'
import logo2 from '../../assets/images/logo-white.png'
import { Link } from 'react-router-dom'


const Footer = () => {
  return (
    <>
     <footer className="bg-glossy-blue text-white p-5 mt-5">
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
              <li> <Link to={'/'}><a href="" className="text-white text-decoration-none">Home</a></Link> </li>
              <li> <Link to={'/shop'}><a href="" className="text-white text-decoration-none">Shop</a></Link></li>
              <li> <Link to={'/contact'}><a href="" className="text-white text-decoration-none">Contact</a></Link></li>
              <li> <Link to={'/about'}><a href="" className="text-white text-decoration-none">About Us</a></Link></li>
            </ul>
          </div>

          <div className="col-md-3 mb-4">
            <h5 className="fw-bold">Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to={'/admin/login'}><a href="" className="text-white text-decoration-none">Admin</a></Link> </li>
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
          &copy; {new Date().getFullYear()} Pure Wear. All rights reserved.
        </div>
      </div>
    </footer>
      
    </>
  )
}

export default Footer
