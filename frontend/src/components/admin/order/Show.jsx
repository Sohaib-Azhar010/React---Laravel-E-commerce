import React, { useEffect, useState } from 'react';
import AdminLayout from '../AdminLayout';
import { apiUrl } from '../../common/http';
import { toast } from 'react-toastify';
import '../../../assets/css/orders.css'

const OrderShow = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingOrder, setUpdatingOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${apiUrl}/orders`);
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingOrder(orderId);
    try {
      await fetch(`${apiUrl}/orders/${orderId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });
      await fetchOrders();
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setUpdatingOrder(null);
    }
  };

  const markAsShipped = async (orderId) => {
    setUpdatingOrder(orderId);
    try {
      await fetch(`${apiUrl}/orders/${orderId}/ship`, {
        method: 'POST',
      });
      toast('Order marked as shipped.');
      await fetchOrders();
    } catch (error) {
      console.error('Error marking as shipped:', error);
    } finally {
      setUpdatingOrder(null);
    }
  };

  const downloadPDF = (orderId) => {
    window.open(`${apiUrl}/orders/${orderId}/receipt`, '_blank');
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      pending: 'bg-warning text-dark',
      paid: 'bg-success text-white',
      shipped: 'bg-info text-white',
      cancelled: 'bg-danger text-white'
    };
    return statusClasses[status] || 'bg-secondary text-white';
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="container mt-4">
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="container-fluid mt-4">
        {/* Header */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h2 className="mb-1 text-dark fw-bold">Order Management</h2>
                <p className="text-muted mb-0">Manage and track all customer orders</p>
              </div>
              <div className="d-flex gap-2">
                <button 
                  className="btn btn-outline-dark"
                  onClick={fetchOrders}
                  disabled={loading}
                >
                  <i className="fas fa-sync-alt me-2"></i>
                  Refresh
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Orders Grid */}
        <div className="row">
          {orders.length === 0 ? (
            <div className="col-12">
              <div className="text-center py-5">
                <i className="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
                <h4 className="text-muted">No orders found</h4>
                <p className="text-muted">Orders will appear here when customers place them.</p>
              </div>
            </div>
          ) : (
            orders.map(order => (
              <div key={order.id} className="col-12 col-lg-6 col-xl-4 mb-4">
                <div className="card shadow-sm border-0 h-100">
                  {/* Card Header */}
                  <div className="card-header bg-white border-0 pb-0">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h5 className="card-title mb-1 text-primary fw-bold">
                          Order #{order.id}
                        </h5>
                        <small className="text-muted">
                          <i className="fas fa-calendar-alt me-1"></i>
                          {new Date(order.created_at).toLocaleDateString()}
                        </small>
                      </div>
                      <span className={`badge ${getStatusBadge(order.payment_status)} px-3 py-2`}>
                        {order.payment_status?.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="card-body">
                    {/* Customer Info */}
                    <div className="mb-3">
                      <div className="d-flex align-items-center mb-2">
                        <i className="fas fa-user text-primary me-2"></i>
                        <strong className="text-dark">{order.name}</strong>
                      </div>
                      <div className="d-flex align-items-center">
                        <i className="fas fa-dollar-sign text-success me-2"></i>
                        <span className="h5 mb-0 text-success fw-bold">${order.total}</span>
                      </div>
                      <div className="d-flex align-items-center">
                        <i className="fas fa-dollar-sign text-success me-2"></i>
                        <span className="mb-0 text-primary text-uppercase">{order.payment_method}</span>
                      </div>
                    </div>

                    {/* Status Selector */}
                    <div className="mb-3">
                      <label className="form-label fw-semibold text-dark">
                        <i className="fas fa-edit me-1"></i>
                        Update Status
                      </label>
                      <select
                        className="form-select"
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        defaultValue={order.payment_status}
                        disabled={updatingOrder === order.id}
                      >
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                        <option value="shipped">Shipped</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                      {updatingOrder === order.id && (
                        <div className="mt-2">
                          <div className="spinner-border spinner-border-sm text-primary me-2" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                          <small className="text-muted">Updating...</small>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="d-flex gap-2 mb-3">
                      <button 
                        className="btn btn-outline-info btn-sm flex-fill"
                        onClick={() => downloadPDF(order.id)}
                      >
                        <i className="fas fa-download me-1"></i>
                        Receipt
                      </button>
                      <button 
                        className="btn btn-outline-primary btn-sm flex-fill"
                        onClick={() => markAsShipped(order.id)}
                        disabled={updatingOrder === order.id}
                      >
                        <i className="fas fa-shipping-fast me-1"></i>
                        Ship
                      </button>
                    </div>

                    {/* Order Items Accordion */}
                    <div className="accordion accordion-flush" id={`accordion-${order.id}`}>
                      <div className="accordion-item">
                        <h2 className="accordion-header" id={`heading-${order.id}`}>
                          <button
                            className="accordion-button collapsed px-0 py-2"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#collapse-${order.id}`}
                            aria-expanded="false"
                            aria-controls={`collapse-${order.id}`}
                          >
                            <i className="fas fa-list me-2"></i>
                            <span className="fw-semibold">View Items ({order.items?.length || 0})</span>
                          </button>
                        </h2>
                        <div
                          id={`collapse-${order.id}`}
                          className="accordion-collapse collapse"
                          aria-labelledby={`heading-${order.id}`}
                          data-bs-parent={`#accordion-${order.id}`}
                        >
                          <div className="accordion-body px-0 pt-0">
                            {order.items?.length ? (
                              <div className="list-group list-group-flush">
                                {order.items.map(item => (
                                  <div key={item.id} className="list-group-item px-0 py-2 border-0">
                                    <div className="d-flex justify-content-between align-items-start">
                                      <div className="flex-grow-1">
                                        <h6 className="mb-1 text-dark">{item.title}</h6>
                                        <small className="text-muted">
                                          Quantity: {item.quantity} × ${item.price}
                                        </small>
                                      </div>
                                      <span className="fw-bold text-success">
                                        ${(item.quantity * item.price).toFixed(2)}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-muted mb-0">No items found</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

     
    </AdminLayout>
  );
};

export default OrderShow;