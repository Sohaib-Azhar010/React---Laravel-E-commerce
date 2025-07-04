import React, { useEffect, useState } from 'react';
import AdminLayout from '../AdminLayout';
import { toast } from 'react-toastify';
import { apiUrl } from '../../common/http';

const ShowNewsletter = () => {
    const [subscribers, setSubscribers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchSubscribers = async () => {
        try {
            const response = await fetch(`${apiUrl}/newsletters`);
            const data = await response.json();
            setSubscribers(data);
        } catch (error) {
            toast.error('Failed to load newsletter data.');
        } finally {
            setLoading(false);
        }
    };

    const deleteSubscriber = async (id) => {
        if (!window.confirm('Are you sure you want to delete this subscriber?')) return;

        try {
            const res = await fetch(`${apiUrl}/newsletters/${id}`, {
                method: 'DELETE',
            });

            if (!res.ok) throw new Error('Failed to delete subscriber');

            toast.success('Subscriber removed');
            setSubscribers(subscribers.filter(sub => sub.id !== id));
        } catch (error) {
            toast.error('Error deleting subscriber.');
        }
    };

    useEffect(() => {
        fetchSubscribers();
    }, []);

    return (
        <AdminLayout>
            <div className="container py-4">
                <h3 className="mb-4">Newsletter Subscribers</h3>

                {loading ? (
                    <p>Loading...</p>
                ) : subscribers.length === 0 ? (
                    <p>No subscribers found.</p>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead className="table-light">
                                <tr>
                                    <th>#</th>
                                    <th>Email</th>
                                    <th>Subscribed At</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody >
                                {subscribers.map((sub, index) => (
                                    <tr key={sub.id}>
                                        <td>{index + 1}</td>
                                        <td>{sub.email}</td>
                                        <td>{new Date(sub.created_at).toLocaleString()}</td>
                                        <td>
                                            <button
                                                className="btn btn-outline-danger btn-sm"
                                                onClick={() => deleteSubscriber(sub.id)}
                                            >
                                                <i className="bi bi-trash"></i> 
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default ShowNewsletter;
