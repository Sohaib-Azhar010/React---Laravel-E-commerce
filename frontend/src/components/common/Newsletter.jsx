import React, { useState } from 'react';
import '../../assets/css/style.css';

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Subscribed with: ${email}`);
    setEmail('');
  };

  return (
    <div className="newsletter-section">
      {/* Bubbles animation layer */}
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="bubble"></div>

      {/* Content overlay */}
      <div className="overlay text-center container text-white">
        <h2 className="mb-3 fw-bold">Subscribe to Our Newsletter</h2>
        <p className="mb-4">Get the latest updates, offers, and news straight to your inbox.</p>
        <form onSubmit={handleSubscribe} className="row justify-content-center">
          <div className="col-md-6 col-sm-8 mb-2">
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-primary btn-lg px-4">
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;
