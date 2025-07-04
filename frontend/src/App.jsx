import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Shop from './components/Shop'
import Product from './components/Product'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import Login from './components/admin/Login'
import { ToastContainer, toast } from 'react-toastify';
import Dashboard from './components/admin/Dashboard'
import { AdminRequireAuth } from './components/admin/AdminRequireAuth'
import { AdminAuthProvider } from './components/context/AdminAuth'
import ShowCategories from './components/admin/category/Show'
import CreateCategory from './components/admin/category/Create';
import EditCategory from './components/admin/category/Edit';
import ShowBrands from './components/admin/brand/Show'
import CreateBrand from './components/admin/brand/Create';
import EditBrand from './components/admin/brand/Edit';
import ShowProducts from './components/admin/product/Show';
import CreateProduct from './components/admin/product/Create';
import EditProduct from './components/admin/product/Edit';
import Contact from './components/Contact'
import About from './components/About'
import '../src/assets/css/app.css'
import { CartProvider } from './components/context/CartContext'
import PaymentSuccess from './components/PaymentSuccess'
import PaymentCancel from './components/PaymentCancel'
import OrderShow from './components/admin/order/Show'
import ShowShipped from './components/admin/shipped/ShowShipped'



function App() {


  return (
    <>
      <AdminAuthProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/shop' element={<Shop />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/checkout' element={<Checkout />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/about' element={<About />} />
              <Route path='/admin/login' element={<Login />} />
              <Route path="/payment-success" element={<PaymentSuccess />} />
              <Route path="/payment-cancel" element={<PaymentCancel />} />
              <Route path='/admin/dashboard' element={
                <AdminRequireAuth>
                  <Dashboard />
                </AdminRequireAuth>
              } />
              <Route path='/admin/categories' element={
                <AdminRequireAuth>
                  <ShowCategories />
                </AdminRequireAuth>
              } />
              <Route path='/admin/categories/create' element={
                <AdminRequireAuth>
                  <CreateCategory />
                </AdminRequireAuth>
              } />
              <Route path='/admin/categories/edit/:id' element={
                <AdminRequireAuth>
                  <EditCategory />
                </AdminRequireAuth>
              } />
              <Route path='/admin/brands' element={
                <AdminRequireAuth>
                  <ShowBrands />
                </AdminRequireAuth>
              } />
              <Route path='/admin/brands/create' element={
                <AdminRequireAuth>
                  <CreateBrand />
                </AdminRequireAuth>
              } />
              <Route path='/admin/brands/edit/:id' element={
                <AdminRequireAuth>
                  <EditBrand />
                </AdminRequireAuth>
              } />
              <Route path='/admin/products' element={
                <AdminRequireAuth>
                  <ShowProducts />
                </AdminRequireAuth>
              } />
              <Route path='/admin/products/create' element={
                <AdminRequireAuth>
                  <CreateProduct />
                </AdminRequireAuth>
              } />
              <Route path='/admin/products/edit/:id' element={
                <AdminRequireAuth>
                  <EditProduct />
                </AdminRequireAuth>
              } />

              <Route path='/admin/orders' element={
                <AdminRequireAuth>
                  <OrderShow />
                </AdminRequireAuth>
              } />

              <Route path='/admin/shipped' element={
                <AdminRequireAuth>
                  <ShowShipped />
                </AdminRequireAuth>
              } />




            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AdminAuthProvider>
      <ToastContainer />

    </>
  )
}

export default App
