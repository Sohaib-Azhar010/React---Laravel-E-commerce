import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import AdminLayout from '../AdminLayout';
import { toast } from 'react-toastify';
import { apiUrl } from '../../common/http';

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: '',
        price: '',
        compare_price: '',
        description: '',
        short_description: '',
        category_id: '',
        brand_id: '',
        qty: '',
        sku: '',
        barcode: '',
        status: 1,
        is_featured: 'no',
    });

    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [imageFile, setImageFile] = useState(null);




    useEffect(() => {
        fetch(`${apiUrl}/products/${id}`)
            .then((res) => res.json())
            .then((res) => {
                console.log(res); // ✅ optional debug
                if (res.status === 200 && res.data) {
                    const product = res.data.product;
                    setForm({
                        title: product.title || '',
                        price: product.price || '',
                        compare_price: product.compare_price || '',
                        description: product.description || '',
                        short_description: product.short_description || '',
                        category_id: product.category_id || '',
                        brand_id: product.brand_id || '',
                        qty: product.qty || '',
                        sku: product.sku || '',
                        barcode: product.barcode || '',
                        status: product.status !== undefined ? product.status : 1,
                        is_featured: product.is_featured || 'no',
                        image : product.image || 'no image found',
                    });
                } else {
                    toast.error(res.message || 'Failed to load product data');
                }
            });

        fetch(`${apiUrl}/categories`)
            .then((res) => res.json())
            .then((res) => setCategories(res.data || []));

        fetch(`${apiUrl}/brands`)
            .then((res) => res.json())
            .then((res) => setBrands(res.data || []));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        for (const key in form) {
            if (form[key] !== null && form[key] !== undefined && key !== 'image') {
                data.append(key, form[key]);
            }
        }

        // ✅ Only append image if a new file is selected
        if (imageFile) {
            data.append("image", imageFile);
        }

        try {
            const res = await fetch(`${apiUrl}/products/${id}`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'X-HTTP-Method-Override': 'PUT',
                },
                body: data,
            });

            const result = await res.json();

            if (result.status === 200) {
                toast.success(result.message);
                navigate('/admin/products');
            } else {
                toast.error(result.message || 'Failed to update product');
            }
        } catch (error) {
            toast.error('Something went wrong');
        }
    };




    return (
        <AdminLayout>
            <div className="container" style={{ maxWidth: '960px' }}>
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4 className="fw-bold mb-0">Edit Product</h4>
                    <Link to="/admin/products" className="btn btn-dark">
                        <i className="bi bi-arrow-left me-1"></i> Back
                    </Link>
                </div>

                <div className="card p-4 shadow-sm bg-white rounded">
                    <form onSubmit={handleSubmit}>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label">Title</label>
                                <input type="text" className="form-control" name="title" value={form.title} onChange={handleChange} required />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Price</label>
                                <input type="number" className="form-control" name="price" value={form.price} onChange={handleChange} required />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Compare Price</label>
                                <input type="number" className="form-control" name="compare_price" value={form.compare_price || ''} onChange={handleChange} />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">SKU</label>
                                <input type="text" className="form-control" name="sku" value={form.sku} onChange={handleChange} required />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Barcode</label>
                                <input type="text" className="form-control" name="barcode" value={form.barcode || ''} onChange={handleChange} />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Quantity</label>
                                <input type="number" className="form-control" name="qty" value={form.qty || ''} onChange={handleChange} />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Category</label>
                                <select name="category_id" className="form-select" value={form.category_id} onChange={handleChange} required>
                                    <option value="">Select Category</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Brand</label>
                                <select name="brand_id" className="form-select" value={form.brand_id || ''} onChange={handleChange}>
                                    <option value="">Select Brand (optional)</option>
                                    {brands.map(brand => (
                                        <option key={brand.id} value={brand.id}>{brand.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Status</label>
                                <select name="status" className="form-select" value={form.status} onChange={handleChange}>
                                    <option value={1}>Active</option>
                                    <option value={0}>Inactive</option>
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Featured</label>
                                <select name="is_featured" className="form-select" value={form.is_featured} onChange={handleChange}>
                                    <option value="no">No</option>
                                    <option value="yes">Yes</option>
                                </select>
                            </div>
                            <div className="col-12">
                                <label className="form-label">Short Description</label>
                                <textarea name="short_description" className="form-control" value={form.short_description || ''} onChange={handleChange}></textarea>
                            </div>
                            <div className="col-12">
                                <label className="form-label">Description</label>
                                <textarea name="description" className="form-control" value={form.description || ''} onChange={handleChange}></textarea>
                            </div>
                            <div className="col-10">
                                <label className="form-label">Image</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    name="image"
                                    onChange={(e) => setImageFile(e.target.files[0])}
                                />
                            </div>
                            <div className="col-2">
                                {form.image && (
                                    <div className="mb-2">
                                        <img
                                            src={`${apiUrl.replace('/api', '')}/uploads/products/small/${form.image}`}
                                            alt="Current"
                                            width={100}
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="col-12 text-end">
                                <button className="btn btn-primary" type="submit">
                                    <i className="bi bi-save me-1"></i> Update Product
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
};

export default EditProduct;
