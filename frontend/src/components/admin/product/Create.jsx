import React, { useState, useEffect } from 'react';
import AdminLayout from '../AdminLayout';
import { toast } from 'react-toastify';
import { apiUrl } from '../../common/http';
import { Link, useNavigate } from 'react-router-dom';

const CreateProduct = () => {
    const navigate = useNavigate();
    const [galleryIds, setGalleryIds] = useState([]);
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const imgData = new FormData();
        imgData.append("image", file);

        try {
            const res = await fetch(`${apiUrl}/temp-images`, {
                method: "POST",
                body: imgData,
            });

            const result = await res.json();

            if (result.status === 200) {
                toast.success("Image uploaded successfully");
                setGalleryIds(prev => [...prev, result.data.id]);
            } else {
                toast.error(result.message || "Image upload failed");
            }
        } catch (err) {
            console.error("Upload Error:", err);
            toast.error("Image upload failed");
        }
    };



    const [form, setForm] = useState({
        title: '',
        price: '',
        compare_price: '',
        description: '',
        short_description: '',
        image: '',
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const fetchMetaData = async () => {
        try {
            const [catRes, brandRes] = await Promise.all([
                fetch(`${apiUrl}/categories`),
                fetch(`${apiUrl}/brands`),
            ]);
            const catData = await catRes.json();
            const brandData = await brandRes.json();
            if (catData.status === 200) setCategories(catData.data);
            if (brandData.status === 200) setBrands(brandData.data);
        } catch (error) {
            toast.error('Failed to load categories or brands');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        for (const key in form) {
            formData.append(key, form[key]);
        }

        galleryIds.forEach((id) => formData.append("gallery[]", id));


        // if (imageFile) {
        //     formData.append('image', imageFile);
        // }

        try {
            const res = await fetch(`${apiUrl}/products`, {
                method: 'POST',
                body: formData,
            });

            const result = await res.json();
            if (result.status === 200) {
                toast.success(result.message);
                navigate('/admin/products');
            } else {
                toast.error(result.message || 'Validation failed');
            }
        } catch (error) {
            toast.error('Something went wrong');
        }
    };

    useEffect(() => {
        fetchMetaData();
    }, []);

    return (
        <AdminLayout>

            <div className="container" style={{ maxWidth: '910px' }}>
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4 className="fw-bold mb-0">Create Product</h4>
                    <div>
                        <Link to="/admin/products" className="btn btn-dark me-2">
                            <i className="bi bi-arrow-left me-1"></i> Back
                        </Link>
                    </div>
                </div>

                <div className="card p-4 shadow-sm bg-white rounded">
                    <form onSubmit={handleSubmit}  >
                        <div className="row g-3" >
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
                                <input type="number" className="form-control" name="compare_price" value={form.compare_price} onChange={handleChange} />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">SKU</label>
                                <input type="text" className="form-control" name="sku" value={form.sku} onChange={handleChange} required />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Barcode</label>
                                <input type="text" className="form-control" name="barcode" value={form.barcode} onChange={handleChange} />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Quantity</label>
                                <input type="number" className="form-control" name="qty" value={form.qty} onChange={handleChange} />
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
                                <select name="brand_id" className="form-select" value={form.brand_id} onChange={handleChange}>
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
                                <textarea name="short_description" className="form-control" value={form.short_description} onChange={handleChange}></textarea>
                            </div>

                            <div className="col-12">
                                <label className="form-label">Description</label>
                                <textarea name="description" className="form-control" value={form.description} onChange={handleChange}></textarea>
                            </div>

                            {/* Optional Image input for future */}
                            <div className="col-12">
                                <label className="form-label">Image</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    name="image"
                                    onChange={handleImageUpload}
                                />

                            </div>

                            <div className="col-12 text-end">
                                <button className="btn btn-primary" type="submit">
                                    <i className="bi bi-save me-1"></i> Save Product
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

            </div>



        </AdminLayout>
    );
};

export default CreateProduct;
