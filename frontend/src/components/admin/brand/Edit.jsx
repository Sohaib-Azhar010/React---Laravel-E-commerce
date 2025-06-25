import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { apiUrl } from '../../common/http';
import AdminLayout from '../AdminLayout';

const EditBrand = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm();

  // Fetch existing brand data
  const fetchBrand = async () => {
    try {
      const res = await fetch(`${apiUrl}/brands/${id}`);
      const result = await res.json();
      if (result.status === 200) {
        setValue('name', result.data.name);
        setValue('status', result.data.status.toString());
        setLoading(false);
      } else {
        toast.error(result.message);
        navigate('/admin/brands');
      }
    } catch (err) {
      toast.error('Failed to fetch brand');
      navigate('/admin/brands');
    }
  };

  useEffect(() => {
    fetchBrand();
  }, []);

  const onSubmit = async (data) => {
    try {
      const res = await fetch(`${apiUrl}/brands/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await res.json();
      if (result.status === 200) {
        toast.success('Brand updated successfully');
        navigate('/admin/brands');
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  if (loading) return <AdminLayout><p>Loading...</p></AdminLayout>;

  return (
    <AdminLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold mb-0">Edit Brand</h4>
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

          <div className="mb-3">
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

          <button type="submit" className="btn btn-primary">
            <i className="bi bi-save me-1"></i> Update Brand
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default EditBrand;
