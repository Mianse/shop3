
import { NavLink } from "react-router-dom"
const UserMenu = () => {
  return (
    <>
      <div class="list-group">
 <h1>DashBoard</h1>
  <NavLink to="/dashboard/user/profile" class="list-group-item list-group-item-action">Profile</NavLink>
  <NavLink to="/dashboard/user/orders" class="list-group-item list-group-item-action">orders</NavLink>
</div>
    </>
  )
}

export default UserMenu
