import express from 'express'
import { isAdmin, requiresignIn } from '../middleware/authMiddleware.js'
import { createProductController, getProductsController,getSingleProductController,getProductPhotoController} from '../controllers/createProductController.js'
import formidable from 'express-formidable'

const router = express.Router()

// routes
router.post('/create-product',requiresignIn,isAdmin,formidable(),createProductController)

//get products
router.get('/get-product',getProductsController)

//get single product
router.get('/get-product/:slug',getSingleProductController,)

//get photo 
router.get('/product-photo/:id',getProductPhotoController)

export default router