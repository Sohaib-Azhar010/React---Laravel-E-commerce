import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiUrl } from '../common/http';
import { toast } from 'react-toastify';

const FeaturedProducts = () => {
    const [products, setProducts] = useState([]);
    const baseUrl = apiUrl.replace('/api', '');

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const res = await fetch(`${apiUrl}/featured-products`);
                const result = await res.json();
                if (result.status === 200) {
                    setProducts(result.data);
                } else {
                    toast.error(result.message);
                }
            } catch (err) {
                toast.error('Failed to load featured products');
            }
        };

        fetchFeatured();
    }, []);

    return (
        <div className="container p-5">
            <h2 className="text-center mb-4">Featured Products</h2>
            <div className="row justify-content-center">
                {products.map(product => (
                    <div className="col-12 col-md-6 col-lg-3 mb-4" key={product.id}>
                        <Link to={`/product/${product.id}`}>
                            <div className="card product-card h-100">
                                <img
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
                                                <span className="old-price ms-2">${product.compare_price}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturedProducts;
