import {Routes,Route} from 'react-router-dom'
import HomePage from './pages/HomePage.js';
import About from './pages/About.js';
import Contact from './pages/Contact.js';
import PageNotFound from './pages/PageNotFound.js';
import Policy from './pages/Policy.js';
import Register from './pages/auth/Register.js';
import Login from "./pages/auth/Login.js"
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './user/Dashboard.js';
import PrivateRoute from './components/Routes/PrivateRoute.js';
import ForgotPassword from './pages/auth/ForgotPassword.js' 
import AdminRoute from './components/Routes/AdminRoute.js'; 
import AdminDashboard from './pages/Admin/AdminDashboard.js';
import CreateCategory from './pages/Admin/CreateCategory.js';
import CreateProduct from './pages/Admin/CreateProduct.js';
import Users from './pages/Admin/Users.js';
import Profile from './user/Profile.js';
import Orders from './user/Orders.js';
import Products from './pages/Admin/Products.js';
import UpdateProduct from './pages/Admin/UpdateProduct.js';
function App() {
  return (
    <>
   <Routes>
    <Route path="/" element={<HomePage/>}/>  {/*home page*/}
    <Route path="/dashboard" element={<PrivateRoute/>}>
      <Route path="user" element={<Dashboard/>}/>
      <Route path="user/profile" element={<Profile/>}/>
      <Route path="user/orders" element={<Orders/>}/>

</Route>
<Route path="/dashboard" element={<AdminRoute/>}>
      <Route path="admin" element={<AdminDashboard/>}/>
      <Route path="admin/create-category" element={<CreateCategory/>}/>
      <Route path="admin/create-product" element={<CreateProduct/>}/>
      <Route path="admin/product/:slug" element={<UpdateProduct/>}/>

      <Route path="admin/users" element={<Users/>}/>
      <Route path="admin/products" element={<Products/>}/>

</Route>
    <Route path="/register" element={<Register/>}/>  {/*Register page*/}
    <Route path="/login" element={<Login/>}/>  {/*home page*/}
    <Route path="/about" element={<About/>}/>  {/*about page*/}
    <Route path="/contact" element={<Contact/>}/>  {/*home page*/}
    <Route path="/forgot password" element={<ForgotPassword/>}/>  {/*home page*/}

    <Route path="/policy" element={<Policy/>}/>  {/*home page*/}
    <Route path="*" element={<PageNotFound/>}/>  {/*home page*/}
   </Routes>
      
    </>
  );
}

export default App;
