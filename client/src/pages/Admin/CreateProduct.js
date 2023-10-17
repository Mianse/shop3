import React from 'react'
import AdminMenu from '../../components/AdminMenu'
import Layout from '../../components/Layout'
const CreateProduct = () => {
  return (
    <Layout title="dashboard-createproduct">
    <div className="container-fluid m-3 p-3">
      <div className='row'>
        <div className="col-md-3">
            <AdminMenu/>
        </div>
        <diV className="col-md-9">
            <h1>create product</h1>
        </diV>
      </div>
      </div>
    </Layout>
  )
}

export default CreateProduct
