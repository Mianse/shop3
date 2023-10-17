import React from 'react'
import Layout from '../components/Layout'
import UserMenu from '../components/UserMenu'

const Profile = () => {
  return (
    <Layout title="user-profile">
      <div className="container-fluid m-3 p-3">
        <div className="row">
            <div className="col-md-3">
                <UserMenu/>
            </div>
            <div className="col-md-3"><h6>profile</h6></div>

        </div>
      </div>
    </Layout>
  )
}

export default Profile
