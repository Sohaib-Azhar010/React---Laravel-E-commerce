import React, { useContext } from 'react'
import { AdminAuthContext } from '../context/AdminAuth'
import { Link } from 'react-router-dom'
import AdminLayout from './AdminLayout'

const Dashboard = () => {
  const { logout } = useContext(AdminAuthContext)

  return (

    <AdminLayout>
      <div className="row g-4">
        {/* Users Card */}
        <div className="col-md-4">
          <div
            className="card text-white shadow border-0"
            style={{
              background: "linear-gradient(135deg, #667eea, #764ba2)",
              borderRadius: "16px",
            }}
          >
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <h6 className="text-uppercase opacity-75">Total Subscribers</h6>
                <h2 className="fw-bold mb-1">0</h2>
                <a href="/admin/users" className="text-white text-decoration-none small">
                  View all users →
                </a>
              </div>
              <div className="bg-white bg-opacity-25 rounded-circle p-3">
                <i className="bi bi-people-fill fs-3 text-white"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Orders Card */}
        <div className="col-md-4">
          <div
            className="card text-white shadow border-0"
            style={{
              background: "linear-gradient(135deg, #43cea2, #185a9d)",
              borderRadius: "16px",
            }}
          >
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <h6 className="text-uppercase opacity-75">Total Orders</h6>
                <h2 className="fw-bold mb-1">0</h2>
                <a href="/admin/orders" className="text-white text-decoration-none small">
                  View all orders →
                </a>
              </div>
              <div className="bg-white bg-opacity-25 rounded-circle p-3">
                <i className="bi bi-bag-check-fill fs-3 text-white"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Products Card */}
        <div className="col-md-4">
          <div
            className="card text-white shadow border-0"
            style={{
              background: "linear-gradient(135deg, #ff758c, #ff7eb3)",
              borderRadius: "16px",
            }}
          >
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <h6 className="text-uppercase opacity-75">Total Products</h6>
                <h2 className="fw-bold mb-1">0</h2>
                <a href="/admin/products" className="text-white text-decoration-none small">
                  View all products →
                </a>
              </div>
              <div className="bg-white bg-opacity-25 rounded-circle p-3">
                <i className="bi bi-box-seam fs-3 text-white"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="row g-4 mt-2">
        {/* Categories Card */}
        <div className="col-md-6">
          <div
            className="card text-white shadow border-0"
            style={{
              background: "linear-gradient(135deg, #36D1DC, #5B86E5)",
              borderRadius: "16px",
            }}
          >
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <h6 className="text-uppercase opacity-75">Total Categories</h6>
                <h2 className="fw-bold mb-1">0</h2>
                <a href="/admin/categories" className="text-white text-decoration-none small">
                  View all categories →
                </a>
              </div>
              <div className="bg-white bg-opacity-25 rounded-circle p-3">
                <i className="bi bi-grid-fill fs-3 text-white"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Brands Card */}
        <div className="col-md-6">
          <div
            className="card text-white shadow border-0"
            style={{
              background: "linear-gradient(135deg, #F7971E, #FFD200)",
              borderRadius: "16px",
            }}
          >
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <h6 className="text-uppercase opacity-75">Total Brands</h6>
                <h2 className="fw-bold mb-1">0</h2>
                <a href="/admin/brands" className="text-white text-decoration-none small">
                  View all brands →
                </a>
              </div>
              <div className="bg-white bg-opacity-25 rounded-circle p-3">
                <i className="bi bi-tags-fill fs-3 text-white"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New Row for Additional Cards */}
      <div className="row g-4 mt-2">
        {/* Total Sales Card */}
        <div className="col-md-4">
          <div
            className="card text-white shadow border-0"
            style={{
              background: "linear-gradient(135deg,rgb(28, 62, 50),rgb(140, 239, 122))",
              borderRadius: "16px",
            }}
          >
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <h6 className="text-uppercase opacity-75">Total Sales</h6>
                <h2 className="fw-bold mb-1">$0</h2>
                <a href="/admin/sales" className="text-white text-decoration-none small">
                  View sales report →
                </a>
              </div>
              <div className="bg-white bg-opacity-25 rounded-circle p-3">
                <i className="bi bi-currency-dollar fs-3 text-white"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Messages Card */}
        <div className="col-md-4">
          <div
            className="card text-white shadow border-0"
            style={{
              background: "linear-gradient(135deg, #fc466b, #3f5efb)",
              borderRadius: "16px",
            }}
          >
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <h6 className="text-uppercase opacity-75">Total Messages</h6>
                <h2 className="fw-bold mb-1">0</h2>
                <a href="/admin/messages" className="text-white text-decoration-none small">
                  View all messages →
                </a>
              </div>
              <div className="bg-white bg-opacity-25 rounded-circle p-3">
                <i className="bi bi-chat-dots-fill fs-3 text-white"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Subscribers Card */}
        <div className="col-md-4">
          <div
            className="card text-white shadow border-0"
            style={{
              background: "linear-gradient(135deg,rgb(237, 65, 117),rgb(254, 137, 64))",
              borderRadius: "16px",
            }}
          >
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <h6 className="text-uppercase opacity-75">Shipped</h6>
                <h2 className="fw-bold mb-1">0</h2>
                <a href="/admin/subscribers" className="text-white text-decoration-none small">
                  View all shipped →
                </a>
              </div>
              <div className="bg-white bg-opacity-25 rounded-circle p-3">
                <i className="bi bi-truck fs-3 text-white"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default Dashboard
