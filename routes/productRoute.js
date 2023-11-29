import express from 'express'
import { isAdmin, requiresignIn } from '../middleware/authMiddleware.js'
import { createProductController, getProductsController,getSingleProductController,getProductPhotoController,deleteProductController,updateProductController,productFilterController,getCountOfProductsController,productListController,searchProductController,relatedProductController,ProductCategoryController,braintreeTokenController, brainTreePaymentController} from '../controllers/createProductController.js'
import formidable from 'express-formidable'

const router = express.Router()

// routes
router.post('/create-product',requiresignIn,isAdmin,formidable(),createProductController)

//update routes
router.put('/update-product/:pid',requiresignIn,isAdmin,formidable(),updateProductController)


//get products
router.get('/get-product',getProductsController)

//get single product
router.get('/get-product/:slug',getSingleProductController,)

//get photo 
router.get('/product-photo/:pid',getProductPhotoController)

//delete product
router.delete('/delete-product/:pid',requiresignIn,isAdmin, deleteProductController)

//filter
router.post('/product-filter',productFilterController)

//product count
router.get('/product-count', getCountOfProductsController)

//product list base on dage
router.get('/product-list/:page', productListController)

// search product 
router.get('/search/:keyword',searchProductController)

// related products
router.get('/related-product/:pid/:cid',relatedProductController)

//wise category product
router.get('/product-category/:slug',ProductCategoryController)

//payment route
//token
router.get('/braintree/token',braintreeTokenController)

//payment
router.post('/braintree/payment',requiresignIn, brainTreePaymentController)


export default router