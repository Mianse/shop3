import express from 'express'
import { isAdmin, requiresignIn } from '../middleware/authMiddleware.js'
import { createProductController, getProductsController,getSingleProductController,getProductPhotoController,deleteProductController,updateProductController} from '../controllers/createProductController.js'
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

export default router