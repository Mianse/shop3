import express from 'express'
import {registerController ,loginController, testController} from '../controllers/authController.js'
import {requiresignIn} from '../middleware/authMiddleware.js'
import { isAdmin } from '../middleware/authMiddleware.js'
//router object
const router = new express.Router()

//routing
//register user
router.post('/register', registerController)

//login user
router.post('/login',loginController)

//test route
router.get('/test',requiresignIn,isAdmin,testController)

export default router