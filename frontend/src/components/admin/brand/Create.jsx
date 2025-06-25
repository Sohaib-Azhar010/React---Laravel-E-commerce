import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import { apiUrl } from '../../common/http';
import AdminLayout from '../AdminLayout';

const CreateBrand = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await fetch(`${apiUrl}/brands`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      if (result.status === 200) {
        toast.success(result.message || 'Brand created successfully');
        reset();
        navigate('/admin/brands');
      } else {
        toast.error(result.message || 'Something went wrong');
      }

    } catch (error) {
      toast.error('Failed to create brand');
    }
  };

  return (
    <AdminLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold mb-0">Create Brand</h4>
        <Link to="/admin/brands" className="btn btn-dark">
          <i className="bi bi-arrow-left-circle me-1"></i> Back to Brands
        </Link>
      </div>

      <div className="bg-white p-4 rounded shadow-sm">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label fw-semibold">Brand Name</label>
            <input
              id="name"
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              placeholder="Enter brand name"
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name.message}</div>
            )}
          </div>

          <div className="mb-3 d-none">
            <label htmlFor="status" className="form-label fw-semibold">Status</label>
            <select
              id="status"
              className="form-select"
              {...register('status')}
              defaultValue="1"
            >
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary text-light">
            <i className="bi bi-check-circle me-1"></i> Save Brand
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default CreateBrand;
