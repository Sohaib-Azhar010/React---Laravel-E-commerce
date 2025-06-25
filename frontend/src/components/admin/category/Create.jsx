import React from 'react';
import AdminLayout from '../AdminLayout';
import { useForm } from 'react-hook-form';
import { apiUrl } from '../../common/http';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const Create = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const res = await fetch(`${apiUrl}/categories`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await res.json();

            if (result.status === 200) {
                toast.success('Category created successfully!');
                navigate('/admin/categories');
            } else {
                toast.error(result.message || 'Failed to create category');
            }
        } catch (err) {
            toast.error('Server error');
        }
    };

    return (
        <AdminLayout>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold mb-0">Create Category</h4>
                <div>
                    <Link to="/admin/categories" className="btn btn-dark me-2">
                        <i className="bi bi-arrow-left me-1"></i> Back to Categories
                    </Link>
                </div>
            </div>


            <div className="card p-4 shadow-sm bg-white rounded">
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Name Field */}
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label fw-semibold">
                            Category Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                            placeholder="Enter category name"
                            {...register('name', { required: 'Category name is required' })}
                        />
                        {errors.name && (
                            <div className="invalid-feedback">{errors.name.message}</div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="btn btn-primary">
                        <i className="bi bi-check-circle me-2"></i> Create Category
                    </button>
                </form>
            </div>
        </AdminLayout>
    );
};

export default Create;
