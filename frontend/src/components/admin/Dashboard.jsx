import React, { useContext } from 'react'
import Layout from '../common/Layout'
import { AdminAuthContext } from '../context/AdminAuth'

const Dashboard = () => {
  const {logout} = useContext(AdminAuthContext);

  return (
    <Layout>
        <h1>Dashboard</h1>
        <button className='btn btn-danger' onClick={logout}>Logout</button>
    </Layout>
  )
}

export default Dashboard
