import React, { useState } from 'react';
import Layout from './common/Layout';
import { Link } from 'react-router-dom';
import ContactForm from './common/ContactForm';

const Contact = () => {
  
  return (
    <Layout>
      <div className="container px-5">
        <div className="container my-4 px-4 py-4 bg-glossy-blue rounded">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <Link to='/' className="text-white text-decoration-none">Home</Link>
              </li>
              <li className="breadcrumb-item active text-white" aria-current="page">Contact</li>
            </ol>
          </nav>
        </div>
      </div>

      <ContactForm/>

      
    </Layout>
  );
};

export default Contact;
