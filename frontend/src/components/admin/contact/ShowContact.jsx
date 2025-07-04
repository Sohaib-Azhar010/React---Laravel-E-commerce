import React, { useEffect, useState } from 'react';
import AdminLayout from '../AdminLayout';
import { toast } from 'react-toastify';
import { apiUrl } from '../../common/http';

const ShowContact = () => {
    const [contacts, setContacts] = useState([]);
    const [expandedId, setExpandedId] = useState(null);

    const fetchContacts = async () => {
        try {
            const res = await fetch(`${apiUrl}/admin/contacts`);
            const data = await res.json();
            setContacts(data);
        } catch (error) {
            toast.error("Failed to load contact messages");
        }
    };

    const deleteContact = async (id) => {
        try {
            if (!window.confirm('Are you sure you want to delete this contact message?')) return;
            const res = await fetch(`${apiUrl}/admin/contacts/${id}`, {
                method: 'DELETE',
            });

            if (!res.ok) throw new Error('Delete failed');
            toast.success('Deleted successfully');
            fetchContacts();
        } catch (err) {
            toast.error('Error deleting message');
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    return (
        <AdminLayout>
            <div className="container mt-4">
                <h3 className="mb-4">Contact Messages</h3>
                <table className="table table-bordered ">
                    <thead className="table-light">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Subject</th>
                            <th>Message</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((c) => (
                            <tr key={c.id}>
                                <td>{c.name}</td>
                                <td>{c.email}</td>
                                <td>{c.subject}</td>
                                <td>{c.message}</td>

                                <td>
                                    <button
                                        onClick={() => deleteContact(c.id)}
                                        className="btn btn-sm btn-outline-danger"
                                    >
                                        <i className='bi bi-trash' ></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {contacts.length === 0 && (
                            <tr>
                                <td colSpan="5" className="text-center text-muted">No contact messages yet.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
};

export default ShowContact;
