import React from 'react'
import  Layout from '../../components/Layout'
import  AdminMenu  from '../../components/AdminMenu'

const CreateCategory = () => {
  return (
    <Layout >
    <div className="container-fluid m-3 p-3">
    <div className='row'>
        <div className="col-md-3">
            <AdminMenu/>
        </div>
        <diV className="col-md-9">
            <h1>Create Category</h1>
        </diV>
      </div>
      </div>
    </Layout>
  )
}

export default CreateCategory
