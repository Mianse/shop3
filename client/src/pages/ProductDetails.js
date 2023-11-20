import React,{useState,useEffect} from 'react'
import Layout from '../components/Layout'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const ProductDetails = () => {
    const params =useParams()
    const[product,setProduct] = useState([])
    const [relatedProducts,setRelatedProducts] = useState([])

    useEffect(()=>{
        if(params?.slug) getProduct()
    },[params?.slug])

    //get product
    const getProduct = async()=>{
        try {
            const {data} = await axios.get(`/api/v1/product/get-product/${params.slug}`)
            setProduct(data?.product)
            getSimilarProducts(data?.product._id, data?.product.category._id)
        } catch (error) {
          console.log(error)  
        }
    }

    //get related products
    const getSimilarProducts = async(pid,cid)=>{
        try {
            const {data} = await axios.get(`/api/v1/product/related-product/${pid}/${cid}`)
            setRelatedProducts(data?.products)
        } catch (error) {
            console.log(error)
            
        }
    }
  return (
    <Layout title="product Details">
      <div className="row container">
        <div className="col-md-6 mt-2">
        <img src={`/api/v1/product/product-photo/${product._id}`} className="card-img-top" alt={product.name} height={"350"} width={"350px"} />
 
        </div>
        <div className="col-md-6 ">
            <h2 className="text-center">Product details</h2>
            <h6>name: {product?.name}</h6>
            <h6>description: {product?.description}</h6>
            <h6>price: {product?.price}</h6>
            <h6>category: {product?.category?.name}</h6>


            <button  class="btn btn-secondary ms-1" >Add to Cart</button>



        </div>

      </div>
      <hr/>
      <div className='row container'>
        {relatedProducts.length < 1 && (<h6 className='text-center'>No similar products found</h6>)}
        <h6>Similar Products</h6>
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) =>(
                <div className="card m-2" style={{width: '18rem'}}>
                        <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                        <div className="card-body ">
                        <h5 className="card-title">{p.name}</h5>
                        <p className="card-text">{p.description.substring(0, 500)}...</p>
                        <p className="card-text">KES {p.price}</p>

                        <button  className="btn btn-danger ms-1" >Add to Cart</button>


                    </div>
</div>

               ))}

          </div>
      </div>
    </Layout>
  )
}

export default ProductDetails
