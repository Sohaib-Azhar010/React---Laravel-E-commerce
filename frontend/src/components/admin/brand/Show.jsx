import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../AdminLayout';
import { toast } from 'react-toastify';
import { apiUrl } from '../../common/http';

const ShowBrands = () => {
  const [brands, setBrands] = useState([]);

  const fetchBrands = async () => {
    try {
      const res = await fetch(`${apiUrl}/brands`);
      const result = await res.json();
      if (result.status === 200) {
        setBrands(result.data);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('Failed to fetch brands');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this brand?')) return;

    try {
      const res = await fetch(`${apiUrl}/brands/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await res.json();
      if (result.status === 200) {
        toast.success(result.message);
        setBrands(brands.filter((brand) => brand.id !== id));
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  return (
    <AdminLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold mb-0">Brands</h4>
        <Link to="/admin/brands/create" className="btn btn-primary">
          <i className="bi bi-plus-circle me-1"></i> Create New Brand
        </Link>
      </div>

      <div className="table-responsive bg-white rounded shadow-sm">
        <table className="table table-hover mb-0">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Status</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {brands.length > 0 ? (
              brands.map((brand) => (
                <tr key={brand.id}>
                  <td>{brand.id}</td>
                  <td>{brand.name}</td>
                  <td>
                    <span
                      className={`badge ${
                        brand.status == 1 ? 'bg-success' : 'bg-secondary'
                      }`}
                    >
                      {brand.status == 1 ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>{new Date(brand.created_at).toLocaleDateString()}</td>
                  <td>
                    <Link
                      to={`/admin/brands/edit/${brand.id}`}
                      className="btn btn-sm btn-outline-info me-2"
                    >
                      <i className="bi bi-pencil"></i>
                    </Link>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(brand.id)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No brands found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default ShowBrands;
