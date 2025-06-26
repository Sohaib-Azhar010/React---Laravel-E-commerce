import React, { useEffect, useState } from 'react';
import AdminLayout from '../AdminLayout';
import { Link } from 'react-router-dom';
import { apiUrl } from '../../common/http';
import { toast } from 'react-toastify';

const ShowCategories = () => {
    const [categories, setCategories] = useState([]);

    // Fetch categories from API
    const fetchCategories = async () => {
        try {
            const res = await fetch(`${apiUrl}/categories`);
            const data = await res.json();
            if (data.status === 200) {
                setCategories(data.data);
            } else {
                toast.error('Failed to load categories.');
            }
        } catch (error) {
            toast.error('An error occurred while fetching categories.');
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this category?')) return;

        try {
            const res = await fetch(`${apiUrl}/categories/${id}`, {
                method: 'DELETE',
            });

            const result = await res.json();

            if (result.status === 200) {
                toast.success(result.message);
                setCategories(categories.filter((cat) => cat.id !== id));
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error('Something went wrong');
        }
    };


    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <AdminLayout>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold mb-0">Categories</h4>
                <Link to="/admin/categories/create" className="btn btn-primary">
                    <i className="bi bi-plus-circle me-1"></i> Create
                </Link>
            </div>

            <div className="table-responsive">
                <table className="table table-bordered table-hover shadow-sm">
                    <thead className="table-light">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.length > 0 ? (
                            categories.map((cat) => (
                                <tr key={cat.id}>
                                    <td>{cat.id}</td>
                                    <td>{cat.name}</td>
                                    <td>
                                        <span className={`badge ${cat.status === 1 ? 'bg-success' : 'bg-secondary'}`}>
                                            {cat.status === 1 ? 'Active' : 'Inactive'}
                                        </span>

                                    </td>
                                    <td>
                                        <Link to={`/admin/categories/edit/${cat.id}`} className="btn btn-sm btn-outline-info me-2">
                                            <i className="bi bi-pencil"></i>
                                        </Link>
                                        <button
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() => handleDelete(cat.id)}
                                        >
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center text-muted">
                                    No categories found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
};

export default ShowCategories;
