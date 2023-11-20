import  Layout  from '../components/Layout.jsx'
import {useState, useEffect} from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const CategoryProduct = () => {
    const params = useParams()
    const navigate =useNavigate()
    const [products, setProducts] = useState([])
    const [category,setCategory] = useState([])

    useEffect(()=>{
       if(params?.slug) getProductByCat()
    },[params?.slug])

    const getProductByCat = async()=>{
        try {
            const {data} = await axios.get(`/api/v1/product/product-category/${params.slug}`)
            setProducts(data?.products)
            setCategory(data?.category)
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <Layout>
        <div className="container">
            <h6 className="text-center">{category?.name}</h6>
            <h6 className="text-center">{products?.length} results found</h6>

            <div className="d-flex flex-wrap">
              {products?.map((p) =>(
                <div className="card m-2" style={{width: '18rem'}}>
                        <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                        <div className="card-body ">
                        <h5 className="card-title">{p.name}</h5>
                        <p className="card-text">{p.description.substring(0, 500)}...</p>
                        <p className="card-text">KES {p.price}</p>

                        <button  className="btn btn-primary ms-1" onClick={()=>navigate(`/product/${p.slug}`)}>more details</button>
                        <button  className="btn btn-danger ms-1" >Add to Cart</button>


                    </div>
                </div>

               ))}

          </div>

        </div>
    </Layout>
  )
}

export default CategoryProduct
