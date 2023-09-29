import {NavLink,Link} from 'react-router-dom'
import {GiShoppingBag} from 'react-icons/gi'

const Header = () => {
  return (
    <>
       <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link to="/" className="navbar-brand" ><GiShoppingBag/>Ecommerce Shop</Link >
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      <li className="nav-item">
          <NavLink to="/" className="nav-link active" >Home</NavLink >
        </li>
        <li className="nav-item">
          <NavLink to="/categories" className="nav-link active" >Categories</NavLink >
        </li>
        <li className="nav-item">
          <NavLink to="/login" className="nav-link active" >Login</NavLink >
        </li>
        <li className="nav-item">
          <NavLink to="/register" className="nav-link  active" >Signup</NavLink >
        </li>
        <li className="nav-item">
          <NavLink to="/cart" className="nav-link active" >Cart (0)</NavLink >
        </li>
        
      </ul>
     
    </div>
  </div>
</nav>

    </>
  )
}

export default Header
