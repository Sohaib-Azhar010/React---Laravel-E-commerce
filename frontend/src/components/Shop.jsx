import React, { useEffect, useState } from 'react';
import Layout from './common/Layout';
import { Link } from 'react-router-dom';
import { apiUrl } from '../components/common/http';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const baseUrl = apiUrl.replace('/api', '');

  const fetchProducts = async () => {
    try {
      const params = new URLSearchParams();

      if (selectedCategories.length > 0) {
        selectedCategories.forEach(catId => params.append('category[]', catId));
      }

      if (selectedBrands.length > 0) {
        selectedBrands.forEach(brandId => params.append('brand[]', brandId));
      }

      const res = await fetch(`${apiUrl}/shop?${params.toString()}`);
      const result = await res.json();

      if (result.status === 200) {
        setProducts(result.data);
      } else {
        setProducts([]);
      }
    } catch (error) {
      setProducts([]);
    }
  };


  const fetchFilters = async () => {
    const [catRes, brandRes] = await Promise.all([
      fetch(`${apiUrl}/categories`),
      fetch(`${apiUrl}/brands`)
    ]);

    const catData = await catRes.json();
    const brandData = await brandRes.json();

    if (catData.status === 200) setCategories(catData.data);
    if (brandData.status === 200) setBrands(brandData.data);
  };

  const toggleCategory = (id) => {
    setSelectedCategories(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const toggleBrand = (id) => {
    setSelectedBrands(prev =>
      prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
    );
  };

  const clearFilters = () => {
    setSelectedBrands([]);
    setSelectedCategories([]);
  };

  useEffect(() => {
    fetchFilters();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategories, selectedBrands]);

  return (
    <Layout>
      <div className="container px-5">
        <div className="container my-4 px-4 py-4 bg-glossy-blue rounded">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <Link to="/" className="text-white text-decoration-none">Home</Link>
              </li>
              <li className="breadcrumb-item active text-white" aria-current="page">Shop</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container px-5">
        <div className="row">
          {/* Filter Sidebar */}
          <div className="col-md-3 mb-4">
            <div className="bg-light p-4 rounded shadow-sm">
              <h5 className="fw-bold mb-3">Categories</h5>
              <ul className="list-unstyled">
                {categories.map(cat => (
                  <li key={cat.id}>
                    <input
                      type="checkbox"
                      className="form-check-input me-2"
                      checked={selectedCategories.includes(cat.id)}
                      onChange={() => toggleCategory(cat.id)}
                    />
                    <label>{cat.name}</label>
                  </li>
                ))}
              </ul>

              <hr />

              <h5 className="fw-bold mb-3">Brands</h5>
              <ul className="list-unstyled">
                {brands.map(brand => (
                  <li key={brand.id}>
                    <input
                      type="checkbox"
                      className="form-check-input me-2"
                      checked={selectedBrands.includes(brand.id)}
                      onChange={() => toggleBrand(brand.id)}
                    />
                    <label>{brand.name}</label>
                  </li>
                ))}
              </ul>

              <button className="btn btn-sm btn-outline-secondary mt-2" onClick={clearFilters}>Clear All</button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="col-md-9">
            <div className="row g-2">
              {products.length > 0 ? (
                products.map(product => (
                  <div key={product.id} className="col-12 col-md-6 col-lg-4" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
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
                            <h6 className="card-title">{product.title}</h6>
                            <div className="price text-dark">
                              ${product.price}
                              {product.compare_price && (
                                <span className="old-price ms-2">${product.compare_price}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
                <div className="col-12">
                  <p className="text-muted text-center">No products found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
