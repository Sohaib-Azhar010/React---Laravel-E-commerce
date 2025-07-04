import React, { useEffect, useState } from 'react';
import AdminLayout from '../AdminLayout';
import { toast } from 'react-toastify';
import { apiUrl } from '../../common/http';

const ShowShipped = () => {
  const [shippedOrders, setShippedOrders] = useState([]);

  const fetchShipped = async () => {
    try {
      const res = await fetch(`${apiUrl}/shippeds`);
      const data = await res.json();
      setShippedOrders(data);
    } catch (error) {
      toast.error("Failed to load shipped data.");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchShipped();
  }, []);

  return (
    <AdminLayout>
      <div className="container mt-4">
        <h3 className="mb-4">Shipped Orders</h3>
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Item</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Shipped At</th>
              </tr>
            </thead>
            <tbody>
              {shippedOrders.map((shipped, index) => (
                <tr key={shipped.id}>
                  <td>{index + 1}</td>
                  <td>{shipped.order?.id}</td>
                  <td>{shipped.order?.name}</td>
                  <td>{shipped.order_item?.title}</td>
                  <td>{shipped.order_item?.quantity}</td>
                  <td>${shipped.order_item?.price}</td>
                  <td>{new Date(shipped.created_at).toLocaleString()}</td>
                </tr>
              ))}
              {shippedOrders.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center">No shipped orders found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ShowShipped;
