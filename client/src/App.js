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
function App() {
  return (
    <>
   <Routes>
    <Route path="/" element={<HomePage/>}/>  {/*home page*/}
    <Route path="/dashboard" element={<PrivateRoute/>}>
      <Route path="user" element={<Dashboard/>}/>
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
