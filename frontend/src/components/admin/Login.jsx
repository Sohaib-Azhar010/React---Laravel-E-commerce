import React, { useContext, useState } from 'react'
import Layout from '../common/Layout'
import { useForm } from 'react-hook-form';
import { apiUrl } from '../common/http';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AdminAuthContext } from '../context/AdminAuth';


const Login = () => {


    const {login} = useContext (AdminAuthContext);


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();

    const onsubmit = async (data) => {
        console.log(data);
        const res = await fetch(`${apiUrl}/admin/login`,{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(data)
        }).then(res => res.json()).then(result=>{
            console.log(result);
            if(result.status == 200){
                const adminInfo = {
                    token : result.token,
                    id : result.id,
                    name : result.name
                }
                localStorage.setItem('adminInfo',JSON.stringify(adminInfo))
                login(adminInfo);
                navigate('/admin/dashboard');
                toast.success("Welcome to dashboard!");
            } else{
                toast.error(result.message)
            }
        })
        ;
    }

    return (
        <Layout>
            <div className="container d-flex justify-content-center align-items-center min-vh-100">
                <div className="col-md-6">
                    <div className="card shadow p-4">
                        <h3 className="text-center mb-4">Admin Login</h3>

                        <form onSubmit={handleSubmit(onsubmit)}>
                            <div className="mb-3">
                                <label htmlFor="" className="form-label fw-bold">Email</label>
                                <input
                                    {
                                    ...register('email', {
                                        required: "The email field is required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Invalid email address"
                                        }
                                    })
                                    }
                                    type="text"
                                    id="email"
                                    className={`form-control ${errors.email && 'is-invalid'}`}
                                    placeholder="Enter your email"


                                />
                                {
                                    errors.email && <p className='invalid-feedback'>{errors.email?.message}</p>
                                }
                            </div>

                            <div className="mb-3">
                                <label htmlFor="password" className="form-label fw-bold">Password</label>
                                <input
                                    {
                                    ...register("password", {
                                        required: "The password field is required"
                                    })
                                    }
                                    type="password"
                                    id="password"
                                    className={`form-control ${errors.password && 'is-invalid'}`}
                                    placeholder="Enter your password"

                                />
                                {
                                    errors.password && <p className='invalid-feedback'>{errors.password?.message}</p>
                                }
                            </div>

                            <div className="d-grid mb-3">
                                <button type="submit" className="btn btn-primary">Login</button>
                            </div>

                            
                        </form>
                    </div>
                </div>
            </div>

        </Layout>
    )
}

export default Login
