import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import '../../assets/css/admin.css'; // Custom CSS
import { AdminAuthContext } from '../context/AdminAuth';

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { logout } = useContext(AdminAuthContext)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="admin-wrapper d-flex min-vh-100 bg-light position-relative">
      {/* Overlay (only on small screens when sidebar is open) */}
      {isSidebarOpen && (
        <div
          className="sidebar-overlay d-md-none"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`admin-sidebar bg-white border-end p-4 shadow-sm ${
          isSidebarOpen ? 'show' : ''
        }`}
      >
        <div className="d-flex align-items-center mb-4">
          <img src={logo} alt="Logo" width="150" className="mx-auto" />
        </div>

        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <Link to="/admin/dashboard" className="nav-link text-dark fw-semibold hover-effect">
              <i className="bi bi-speedometer2 me-2"></i>Dashboard
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/admin/categories" className="nav-link text-dark fw-semibold hover-effect">
              <i className="bi bi-list-ul me-2"></i>Categories
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/admin/brands" className="nav-link text-dark fw-semibold hover-effect">
              <i className="bi bi-tags me-2"></i>Brands
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/admin/users" className="nav-link text-dark fw-semibold hover-effect">
              <i className="bi bi-box-seam me-2"></i>Products
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/admin/users" className="nav-link text-dark fw-semibold hover-effect">
              <i className="bi bi-bag-check me-2"></i>Orders
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/admin/users" className="nav-link text-dark fw-semibold hover-effect">
              <i className="bi bi-people me-2"></i>Users
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/admin/users" className="nav-link text-dark fw-semibold hover-effect">
              <i className="bi bi-truck me-2"></i>Shipping
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/admin/users" className="nav-link text-dark fw-semibold hover-effect">
              <i className="bi bi-key me-2"></i>Change Password
            </Link>
          </li>
          <hr />
          <li className="nav-item mt-2">
            <button className="btn btn-outline-white w-50" onClick={logout}>
              <i className="bi bi-box-arrow-right me-2"></i>Logout
            </button>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="admin-main flex-grow-1 p-4 bg-light">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-center">
            {/* Toggle button on small screens */}
            <button
              className="btn btn-outline-secondary d-md-none me-3"
              onClick={toggleSidebar}
            >
              <i className="bi bi-list"></i>
            </button>
            <h3 className="fw-bold mb-0">Admin Dashboard</h3>
          </div>
          <button className="btn btn-outline-dark d-none d-md-block" onClick={logout}>
            <i className="bi bi-box-arrow-right me-2"></i>Logout
          </button>
        </div>

        <div className="bg-white p-4 rounded shadow-sm">{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
