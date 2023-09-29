import {Routes,Route} from 'react-router-dom'
import HomePage from './pages/HomePage.js';
import About from './pages/About.js';
import Contact from './pages/Contact.js';
import PageNotFound from './pages/PageNotFound.js';
import Policy from './pages/Policy.js';
import Register from './pages/auth/Register.js';
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  
function App() {
  return (
    <>
   <Routes>
    <Route path="/" element={<HomePage/>}/>  {/*home page*/}
    <Route path="/register" element={<Register/>}/>  {/*home page*/}
    <Route path="/about" element={<About/>}/>  {/*about page*/}
    <Route path="/contact" element={<Contact/>}/>  {/*home page*/}
    <Route path="/policy" element={<Policy/>}/>  {/*home page*/}
    <Route path="/pagenotfound" element={<PageNotFound/>}/>  {/*home page*/}
   </Routes>
      
    </>
  );
}

export default App;
