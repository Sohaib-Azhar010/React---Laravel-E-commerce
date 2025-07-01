import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiUrl } from '../../components/common/http';

const LatestProducts = () => {
  const [products, setProducts] = useState([]);
  const baseUrl = apiUrl.replace('/api', '');

  useEffect(() => {
    fetch(`${apiUrl}/latest-products`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 200) {
          // ✅ Only keep products that have an image
          const filtered = data.data.filter(p => p.image);
          setProducts(filtered);
        }
      })
      .catch(() => {
        console.error("Failed to load latest products");
      });
  }, []);

  return (
    <div className="container p-5">
      <h2 className="text-center mb-4">New Arrivals</h2>
      <div className="row justify-content-center">
        {products.map(product => (
          <div key={product.id} className="col-12 col-md-6 col-lg-3 mb-4" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <Link to={`/product/${product.id}`}>
              <div className="card product-card h-100">
                <img
                  loading='lazy'
                  src={`${baseUrl}/uploads/products/small/${product.image}`}
                  className="card-img-top product-img"
                  alt={product.title}
                />
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title">{product.title}</h5>
                    <div className="price text-dark">
                      ${product.price}
                      {product.compare_price && (
                        <span className="old-price ms-2 text-muted">
                          ${product.compare_price}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
        {products.length === 0 && (
          <p className="text-center">No latest products available.</p>
        )}
      </div>
    </div>
  );
};

export default LatestProducts;
