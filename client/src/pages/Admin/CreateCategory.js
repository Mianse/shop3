import React,{useEffect,useState} from 'react'
import  Layout from '../../components/Layout'
import  AdminMenu  from '../../components/AdminMenu'
import axios from 'axios'
import toast from 'react-hot-toast'
import CategoryForm from '../../components/form/CategoryForm'
const CreateCategory = () => {
  const [categories,setCategories]= useState([])
  const [name,setName] = useState("")
  //handle form
  const handleSubmit= async(e)=>{
    e.preventDefault()
    try {
      const {data} = await axios.post('/api/v1/category/create-category', {name})
      if(data?.success){
        toast.success(`${name} is created`)
        getAllCategories()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("something went wrong in input form")
    }
  }


 const getAllCategories = async(req,res)=>{
  try {
    const {data} = await axios.get('/api/v1/category/get-category')
    if(data.success){
      setCategories(data.category)
    }
  } catch (error) {
    console.log(error)
    toast.error('something went wrong in getting categories')
  }
 }
 useEffect(()=>{
  getAllCategories()
 },[])
  
  return (
    <Layout >
    <div className="container-fluid m-3 p-3">
    <div className='row'>
        <div className="col-md-3">
            <AdminMenu/>
        </div>
        <div className="col-md-9">
            <h1>Manage Category</h1>
            <div className="p3 w-50">
              <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName}/>
            </div>
            <div className="w-75">
            <table className="table">
  <thead>
    <tr>
  
      <th scope="col">Name</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
    
    
      {categories?.map((c)=>(
        <>
      <tr>
      <td Key={c._id}>{c.name}</td>

      <td >
        <button className="btn btn-primary">Edit</button>
        <button className="btn btn-danger">Delete</button>
      </td>


      </tr>
        
      
        </>
        
      ))}
    
  </tbody>
</table>
            </div>
        </div>
      </div>
      </div>
    </Layout>
  )
}

export default CreateCategory
