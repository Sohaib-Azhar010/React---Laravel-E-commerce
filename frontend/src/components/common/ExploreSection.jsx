import React from 'react';
import { Link } from 'react-router-dom';
import scentionImgLeft from '../../assets/images/b1.jpg'; // Replace with your actual image path
import scentionImgRight from '../../assets/images/b2.png'; // Replace with your actual image path

const ExploreSection = () => {
  return (
    <section className="scention-section p-5 bg-white">
      <div className="container">
        <div className="row align-items-center">

          {/* Left Image - hidden on small screens */}
          <div className="col-md-3 d-none d-md-block text-center">
            <img
              src={scentionImgLeft}
              alt="Scention Side Left"
              className="img-fluid rounded shadow"
            />
          </div>

          {/* Center Content */}
          <div className="col-md-6 text-center py-4">
            <h2 className="fw-bold">About Scentio</h2>
            <p className="lead mt-3">
              Scentio is your one-stop multi-brand, multi-category shopping destination.
              Discover quality, variety, and value – all in one elegant platform.
            </p>
            <Link to="/shop" className="btn btn-primary px-4 py-2 mt-5 w-100" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              Explore Products
            </Link>
          </div>

          {/* Right Image - hidden on small screens */}
          <div className="col-md-3 d-none d-md-block text-center">
            <img
              src={scentionImgRight}
              alt="Scention Side Right"
              className="img-fluid rounded shadow"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreSection;
