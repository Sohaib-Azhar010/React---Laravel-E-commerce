import React from 'react';
import Layout from './common/Layout';
import { Link } from 'react-router-dom';
import img from '../../src/assets/images/logo.png'

const About = () => {
  return (
    <Layout>
      <div className="container px-5">
        {/* Breadcrumb */}
        <div className="container my-4 px-4 py-4 bg-glossy-blue rounded">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <Link to="/" className="text-white text-decoration-none">
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item active text-white" aria-current="page">
                About Us
              </li>
            </ol>
          </nav>
        </div>

        {/* About Content */}
        <div className="row align-items-center py-5">
          <div className="col-md-6 mb-4 mb-md-0">
            <img
              loading='lazy'
              src={img}
              alt="About Us"
              className="img-fluid"
            />
          </div>
          <div className="col-md-6">
            <h2 className="fw-bold mb-3">Who We Are</h2>
            <p className="text-muted">
              <strong>Scentio</strong> is a cutting-edge multi-brand and multi-category e-commerce platform committed to delivering an unparalleled online shopping experience. From fashion and electronics to beauty and home essentials — we bring top-tier products to your fingertips.
            </p>
            <p className="text-muted">
              We aim to empower sellers and delight customers by creating a unified digital marketplace with quality, transparency, and trust at its core.
            </p>
            <div className="mt-4">
              <h5 className="fw-semibold">Why Choose Scention?</h5>
              <ul className="text-muted ps-3">
                <li>✔ Curated brands with verified quality</li>
                <li>✔ Easy-to-use platform for vendors and customers</li>
                <li>✔ Fast, reliable, and secure shopping experience</li>
                <li>✔ 24/7 support with a customer-first approach</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="row py-5">
          <div className="col text-center">
            <h3 className="fw-bold">Our Mission</h3>
            <p className="text-muted lead">
              To revolutionize e-commerce by blending seamless technology with exceptional customer satisfaction and brand integrity.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="row pb-5">
          <div className="col text-center">
            <Link to="/shop" className="btn btn-primary px-5 py-2 fs-5 shadow-sm" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              Explore Our Products
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
