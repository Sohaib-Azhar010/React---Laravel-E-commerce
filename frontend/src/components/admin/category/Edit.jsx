import React, { useEffect, useState } from 'react';
import AdminLayout from '../AdminLayout';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { apiUrl } from '../../common/http';

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    status: '1'
  });

  useEffect(() => {
    fetch(`${apiUrl}/categories/${id}`)
      .then(res => res.json())
      .then(result => {
        if (result.status === 200) {
          setFormData({
            name: result.data.name,
            status: String(result.data.status) // ensure it's a string
          });
        } else {
          toast.error("Failed to fetch category data.");
          navigate('/admin/categories');
        }
      })
      .catch(() => {
        toast.error("Error fetching data");
        navigate('/admin/categories');
      });
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${apiUrl}/categories/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(result => {
        if (result.status === 200) {
          toast.success("Category updated successfully");
          navigate('/admin/categories');
        } else {
          toast.error(result.message || "Update failed");
        }
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  };

  return (
    <AdminLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold mb-0">Edit Category</h4>
        <Link to="/admin/categories" className="btn btn-dark">
          <i className="bi bi-arrow-left me-1"></i> Back to Categories
        </Link>
      </div>

      <div className="card p-4 shadow-sm">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label fw-bold">Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="status" className="form-label fw-bold">Status</label>
            <select
              name="status"
              className="form-select"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary">
            <i className="bi bi-save me-1"></i> Update Category
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default Edit;
