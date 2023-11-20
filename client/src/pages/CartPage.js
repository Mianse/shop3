import Layout from "../components/Layout"
import {useCart} from '../context/Cart'
import {useAuth} from '../context/auth'
import { useNavigate } from "react-router-dom"


const CartPage = () => {
  const [cart,setCart] =useCart()
  const [auth,setAuth] = useAuth()
  const navigate = useNavigate()
  //total price
  const totalPrice =()=>{
    try {
     let total = 0
      cart.map(item =>{
        total=total + item.price})
      return total.toLocaleString('en-KENYA',{
        style: "currency",
        currency: "KES",
      });
    } catch (error) {
      console.log(error)
    }
  }
  const removeCartItem =(pid)=>{
    try {
      let myCart = [...cart]
      let index = myCart.findIndex((item) => item._id === pid)
      myCart.splice(index,1)
      setCart(myCart)
      localStorage.setItem("cart",JSON.stringify(myCart))
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Layout>
        <div className="container">
            <div className="row">
               <div className="col-md-12">
                <h1 className="text-center bg-light p-2 mb-1">
                  {`hello ${auth?.token && auth?.user.name}`}
                </h1>
                <h4 className="text-center">
                    {cart.length  ? `you have ${cart.length} items in the cart  ${auth?.token ? "" :"please login to checkout"} ` :"your cart is empty" }
                </h4>
               </div>
            </div>
            <div className="row">
              <div className="col-md-9">
                    Cart item
              </div>
            
            </div>
            <div className="row ">
              <div className="col-md-8">
              {cart.map((p)=>(
                    <div className="row mb-2 p-3 card flex-row">
                        <div className="col-md-4">
                        <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} width={"50px"} height={"100px"} />

                        </div>
                        <div className="col-md-8">
                            <h4>{p.name}</h4>
                            <p>{p.description.substring(0,30)}</p>
                            <p>price: {p.price}</p>
                            <button className="btn btn-danger" onClick={()=>removeCartItem(p._id)}>Remove</button>
                        </div>
                    </div>
                  ))}
              </div>
              <div className="col-md-4 text-center">
                  <h3>Cart Summary</h3>
                  <p>Total | checkout |Payment </p>
                  <hr/>
                  <h4>Total: {totalPrice()} </h4>
                  {auth?.user?.address ? (
                    <>
                    <div className="mb-3">
                      <h4>Current address</h4>
                      <h5>{auth?.user?.address}</h5>
                      <button className="btn btn-outline-warning"
                      onClick={()=>navigate(`/dashboard/user/profile`)}
                      > 
                      update Address</button>
                    </div>
                    </>
                  ):(
                    <div className="mb-3">
                      {
                        auth?.token ? (
                          <button className="btn btn-outline-warning" onClick={()=>navigate(`/dashboard/user/profile`)}>
                              update address
                          </button>
                        ):(
                          <button className="btn btn-outline-warning" onClick={()=>navigate(`/login`,{state: "/cart"})}>please login to checkout</button>
                        )
                      }
                    </div>
                  )}
              </div>
              </div>
        </div>
    </Layout>
  )
}

export default CartPage
