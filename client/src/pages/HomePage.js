import {useEffect,useState} from "react"
import Layout from "../components/Layout.jsx"
import axios from 'axios'
import toast from 'react-hot-toast'
import { Checkbox } from "antd"
const HomePage = () => {
  const [products,setProducts] = useState([])
  const [categories,setCategories] = useState([])
  const [checked,setChecked] =useState([])


  //filter categories
  const handleFilter =(value,id)=>{
      let all=[...checked]
      if(value){
        all.push(id)
      }else{
        all=all.filter((item)=> item!== id )
      }
      setChecked(all)
  }

  //get all categories
  const getAllCategories = async()=>{
try {
  const {data} = await axios.get('/api/v1/category/get-category')
  setCategories(data.category)
} catch (error) {
  console.log(error)
  toast.error('something went wrong')
}
  
  }

  useEffect(()=>{
    getAllCategories()
  },[])

  //get All Prooducts
  const getAllProducts = async()=>{
    try {
      const {data} = await axios.get('/api/v1/product/get-product')
      setProducts(data.products)
    } catch (error) {
      console.log(error)
      toast.error("something went wrong")
      
    }
  }
  useEffect(()=>{
    getAllProducts()
  },[])
  return (
  <Layout title={"Best deals"}>
    <div className="row mt-3">
      <div className="col-md-2">
        <h6 className="text-center">filter by categories</h6>
        <div className="d-flex flex-column" >
        {categories.map(c => (
          <Checkbox key={c._id} onChange={(e)=>handleFilter(e.target.checked,c._id)}>
            {c.name}
            </Checkbox>
        ))}
        </div>
       
        </div>
        <div className="col-md-9">
          {JSON.stringify(checked,null,4)}
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
          {products?.map((p) =>(
                <div className="card m-2" style={{width: '18rem'}}>
                        <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                        <div className="card-body ">
                        <h5 className="card-title">{p.name}</h5>
                        <p className="card-text">{p.description}</p>
                        <button  class="btn btn-primary ms-1">more details</button>
                        <button  class="btn btn-secondary ms-1">ADD TO CART</button>

                    </div>
</div>

               ))}

          </div>
        </div>
      </div>
    
      
  
    </Layout>
  )
}

export default HomePage
