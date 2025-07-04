import React, { useEffect, useState } from 'react';
import AdminLayout from '../AdminLayout';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, PieChart, Pie, Cell, AreaChart, Area, LineChart, Line } from 'recharts';
import { apiUrl } from '../../common/http';

const COLORS = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe', '#43e97b', '#38f9d7'];

const ShowSales = () => {
    const [salesData, setSalesData] = useState({
        monthly: [],
        weekly: [],
        byCategory: [],
        byBrand: []
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch(`${apiUrl}/dashboard-sales`);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log('Fetched data:', data);

                setSalesData(data);
            } catch (err) {
                console.error('Error fetching sales:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Enhanced custom tooltip
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="shadow-lg border-0 rounded-3 overflow-hidden">
                    <div className="bg-white p-3">
                        <p className="fw-bold mb-2 text-primary">{label}</p>
                        {payload.map((entry, index) => (
                            <p key={index} className="mb-1 small" style={{ color: entry.color }}>
                                <span className="fw-semibold">{entry.name}:</span> ${entry.value?.toLocaleString()}
                            </p>
                        ))}
                    </div>
                </div>
            );
        }
        return null;
    };

    if (loading) {
        return (
            <AdminLayout>
                <div className="container-fluid px-4 py-5">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-8 col-lg-6">
                            <div className="text-center">
                                <div className="mb-4">
                                    <div className="spinner-border text-primary" role="status" style={{ width: '4rem', height: '4rem' }}>
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                                <h3 className="fw-bold text-primary mb-3">Loading Sales Analytics</h3>
                                <p className="text-muted">Please wait while we fetch your sales data...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </AdminLayout>
        );
    }

    if (error) {
        return (
            <AdminLayout>
                <div className="container-fluid px-4 py-5">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-8 col-lg-6">
                            <div className="card border-0 shadow-sm">
                                <div className="card-body text-center p-5">
                                    <div className="mb-4">
                                        <i className="fas fa-exclamation-triangle text-danger" style={{ fontSize: '4rem' }}></i>
                                    </div>
                                    <h3 className="fw-bold text-danger mb-3">Error Loading Data</h3>
                                    <p className="text-muted mb-4">{error}</p>
                                    <button className="btn btn-primary" onClick={() => window.location.reload()}>
                                        <i className="fas fa-redo me-2"></i>Try Again
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="container-fluid px-4 py-5">
                {/* Hero Header */}
                <div className="row mb-5">
                    <div className="col-12">
                        <div className="bg-gradient-primary text-white rounded-4 p-4 p-md-5 shadow-lg">
                            <div className="row align-items-center">
                                <div className="col-md-8">
                                    <h1 className="display-5 fw-bold mb-3">Sales Analytics Dashboard</h1>
                                    <p className="lead mb-0 opacity-90">
                                        Comprehensive insights into your sales performance and trends
                                    </p>
                                </div>
                                <div className="col-md-4 text-end">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Key Metrics Cards */}
                <div className="row mb-5">
                    <div className="col-12">
                        <div className="row g-4">
                            <div className="col-xl-4 col-md-6">
                                <div className="card border-0 shadow-sm h-100 hover-lift bg-primary bg-opacity-10">
                                    <div className="card-body p-4">
                                        <div className="d-flex align-items-center">
                                            <div className="flex-grow-1 ms-3">
                                                <h6 className="text-muted mb-1 text-uppercase small">Total Revenue</h6>
                                                <h3 className="mb-0 fw-bold">
                                                    ${salesData.monthly?.reduce((sum, item) => sum + (item.total || 0), 0).toLocaleString()}
                                                </h3>
                                                <small className="text-success">
                                                    <i className="fas fa-arrow-up me-1"></i>+12.5%
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-4 col-md-6">
                                <div className="card border-0 shadow-sm h-100 hover-lift">
                                    <div className="card-body p-4 bg-success bg-opacity-10">
                                        <div className="d-flex align-items-center">
                                            <div className="flex-grow-1 ms-3">
                                                <h6 className="text-muted mb-1 text-uppercase small">Monthly Avg</h6>
                                                <h3 className="mb-0 fw-bold">
                                                    ${salesData.monthly?.length > 0 ?
                                                        Math.round(salesData.monthly.reduce((sum, item) => sum + (item.total || 0), 0) / salesData.monthly.length).toLocaleString()
                                                        : 0}
                                                </h3>
                                                <small className="text-success">
                                                    <i className="fas fa-arrow-up me-1"></i>+8.2%
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-4 col-md-6">
                                <div className="card border-0 shadow-sm h-100 hover-lift">
                                    <div className="card-body p-4 bg-warning bg-opacity-10" >
                                        <div className="d-flex align-items-center">
                                            
                                            <div className="flex-grow-1 ms-3">
                                                <h6 className="text-muted mb-1 text-uppercase small">Weekly Sales</h6>
                                                <h3 className="mb-0 fw-bold">
                                                    ${salesData.weekly?.reduce((sum, item) => sum + (item.total || 0), 0).toLocaleString()}
                                                </h3>
                                                <small className="text-warning">
                                                    <i className="fas fa-minus me-1"></i>-2.1%
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                           
                        </div>
                    </div>
                </div>

                {/* Main Charts - Side by Side */}
                <div className="row mb-5">
                    {/* Monthly Sales Trend */}
                    <div className="col-lg-8 mb-4">
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-header bg-transparent border-0 pt-4 pb-2">
                                <div className="d-flex align-items-center justify-content-between">
                                    <div>
                                        <h4 className="fw-bold mb-1">Monthly Sales Trend</h4>
                                        <p className="text-muted mb-0 small">Revenue performance over time</p>
                                    </div>
                                    <div className="dropdown">
                                        <button className="btn btn-sm btn-light rounded-pill" type="button" data-bs-toggle="dropdown">
                                            <i className="fas fa-ellipsis-h"></i>
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li><a className="dropdown-item" href="#">Export Data</a></li>
                                            <li><a className="dropdown-item" href="#">View Details</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                {salesData.monthly && salesData.monthly.length > 0 ? (
                                    <ResponsiveContainer width="100%" height={350}>
                                        <AreaChart data={salesData.monthly}>
                                            <defs>
                                                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#667eea" stopOpacity={0.8} />
                                                    <stop offset="95%" stopColor="#667eea" stopOpacity={0.1} />
                                                </linearGradient>
                                            </defs>
                                            <XAxis
                                                dataKey="month"
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: '#64748b', fontSize: 12 }}
                                            />
                                            <YAxis
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: '#64748b', fontSize: 12 }}
                                                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                                            />
                                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                            <Tooltip content={<CustomTooltip />} />
                                            <Area
                                                type="monotone"
                                                dataKey="total"
                                                stroke="#667eea"
                                                strokeWidth={3}
                                                fill="url(#colorSales)"
                                                name="Revenue"
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <div className="d-flex align-items-center justify-content-center" style={{ height: '350px' }}>
                                        <div className="text-center">
                                            <i className="fas fa-chart-area text-muted mb-3" style={{ fontSize: '3rem', opacity: 0.3 }}></i>
                                            <p className="text-muted mb-0">No monthly sales data available</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Weekly Performance */}
                    <div className="col-lg-4 mb-4">
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-header bg-transparent border-0 pt-4 pb-2">
                                <div>
                                    <h4 className="fw-bold mb-1">Weekly Performance</h4>
                                    <p className="text-muted mb-0 small">Last 7 weeks comparison</p>
                                </div>
                            </div>
                            <div className="card-body">
                                {salesData.weekly && salesData.weekly.length > 0 ? (
                                    <ResponsiveContainer width="100%" height={350}>
                                        <BarChart data={salesData.weekly}>
                                            <XAxis
                                                dataKey="week"
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: '#64748b', fontSize: 11 }}
                                            />
                                            <YAxis
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: '#64748b', fontSize: 11 }}
                                                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                                            />
                                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                            <Tooltip content={<CustomTooltip />} />
                                            <Bar
                                                dataKey="total"
                                                fill="#764ba2"
                                                radius={[8, 8, 0, 0]}
                                                name="Weekly Sales"
                                            />
                                        </BarChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <div className="d-flex align-items-center justify-content-center" style={{ height: '350px' }}>
                                        <div className="text-center">
                                            <i className="bi bi-trash text-muted mb-3" style={{ fontSize: '3rem', opacity: 0.3 }}></i>
                                            <p className="text-muted mb-0">No weekly sales data available</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>


            </div>

            <style jsx>{`
                .bg-gradient-primary {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                }
                
                .hover-lift {
                    transition: all 0.3s ease;
                }
                
                .hover-lift:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 25px rgba(0,0,0,0.1) !important;
                }
                
                .card {
                    transition: all 0.3s ease;
                }
                
                .card:hover {
                    transform: translateY(-2px);
                }
            `}</style>
        </AdminLayout>
    );
};

export default ShowSales;