import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../AdminLayout';
import { apiUrl } from '../../common/http';
import { toast } from 'react-toastify';

const ShowProducts = () => {
    const [products, setProducts] = useState([]);
    const baseUrl = apiUrl.replace('/api', '');


    const fetchProducts = async () => {
        try {
            const res = await fetch(`${apiUrl}/products`);
            const result = await res.json();
            if (result.status === 200) {
                setProducts(result.data);
            } else {
                toast.error(result.message);
            }
        } catch (err) {
            toast.error('Failed to fetch products');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            const res = await fetch(`${apiUrl}/products/${id}`, { method: 'DELETE' });
            const result = await res.json();
            if (result.status === 200) {
                toast.success(result.message);
                setProducts(products.filter(p => p.id !== id));
            } else {
                toast.error(result.message);
            }
        } catch (err) {
            toast.error('Something went wrong');
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <AdminLayout>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold mb-0">Products</h4>
                <Link to="/admin/products/create" className="btn btn-primary">
                    <i className="bi bi-plus-circle me-1"></i> Create
                </Link>
            </div>
            <div className="table-responsive bg-white rounded shadow-sm">
                <table className="table table-hover mb-0">
                    <thead className="table-light">
                        <tr>
                            <th>ID</th>
                            <th>Image</th> {/* New column */}
                            <th>Title</th>
                            <th>SKU</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Featured</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ? (
                            products.map(product => (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>
                                        {product.image ? (
                                            <img src={`${baseUrl}/uploads/products/small/${product.image}`} alt={product.title} width={30} />


                                        ) : (
                                            <span className="text-muted small">No image</span>
                                        )}
                                    </td>
                                    <td>{product.title}</td>
                                    <td>{product.sku}</td>
                                    <td>$ {product.price}</td>
                                    <td>
                                        <span className={`badge ${product.status === 1 ? 'bg-success' : 'bg-secondary'}`}>
                                            {product.status === 1 ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td>{product.is_featured === 'yes' ? 'Yes' : 'No'}</td>
                                    <td>
                                        <Link
                                            to={`/admin/products/edit/${product.id}`}
                                            className="btn btn-sm btn-outline-info me-2"
                                        >
                                            <i className="bi bi-pencil"></i>
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            className="btn btn-sm btn-outline-danger"
                                        >
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center py-4">No products found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

        </AdminLayout>
    );
};

export default ShowProducts;
