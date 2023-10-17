import React from 'react'
import Layout from '../components/Layout'
import UserMenu from '../components/UserMenu'

const Orders = () => {
  return (
    <Layout title='your orders'>
      <div className="container-flui m-3 p-3">
        <div className="row">
            <div className="col-md-3">
                <UserMenu/>
            </div>
            <div className="col-md-9">
                All Orders
            </div>
        </div>
      </div>
    </Layout>
  )
}

export default Orders
