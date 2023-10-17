import React from 'react'
import { NavLink } from 'react-router-dom'

function AdminMenu() {
  return (
    <>
  
  <div class="list-group">
 <h1>Admin Panel</h1>
  <NavLink to="/dashboard/admin/create-category" class="list-group-item list-group-item-action">Create Category</NavLink>
  <NavLink to="/dashboard/admin/create-product" class="list-group-item list-group-item-action">Create Product</NavLink>
  <NavLink to="/dashboard/admin/users" class="list-group-item list-group-item-action">Users</NavLink>
</div>
    </>
  )
}

export default AdminMenu
