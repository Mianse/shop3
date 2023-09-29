import Layout from '../../components/Layout'
import {React ,useState} from 'react'
import {toast} from 'react-toastify'
const Register = () => {
    const [name,setName] =useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [phone,setPhone] = useState("")
    const [address,setAddress] = useState("")
    const handleSubmit =(e)=>{
        e.preventDefault()
        console.log(name,email,password,address)
        toast.success('registered successfuly')
    }
  return (
    <Layout title={"Register"}>
     <div className="register">
        <h1>Register Page</h1>
 <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <input type="name" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter Your name"  className="form-control" id="exampleInputEmail1" required  />
    
  </div>
  <div className="mb-3">
    <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Your email"  className="form-control" id="exampleInputEmail1" required />
    
  </div>
  <div className="mb-3">
    <input type="address" value={address} onChange={(e)=>setAddress(e.target.value)} placeholder="enter your address" className="form-control" id="exampleInputPassword1" required />
  </div>
  <div className="mb-3">
    <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="please enter your password"className="form-control" id="exampleInputPassword1" required />
  </div>
  <div className="mb-3">
    <input type="phone" value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="Enter phone  number" className="form-control" id="exampleInputPassword1" required />
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>

     </div>
    </Layout>
  )
}

export default Register
