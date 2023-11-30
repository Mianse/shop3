import express from 'express'
import {registerController ,loginController, testController,forgotPasswordController,updateProfileController,getOrdersController,getallOrdersController,orderStatusController} from '../controllers/authController.js'
import {requiresignIn} from '../middleware/authMiddleware.js'
import { isAdmin } from '../middleware/authMiddleware.js'
//router object
const router = new express.Router()

//routing
//register user
router.post('/register', registerController)

//login user
router.post('/login',loginController)

//forgt password
router.post('/forgot-password',forgotPasswordController)

//test route
router.get('/test',requiresignIn,isAdmin,testController)

//protected User route auth
router.get("/user-auth", requiresignIn, (req, res) => {
    res.status(200).send({ ok: true });
  });
  //protected Admin route auth
  router.get("/admin-auth", requiresignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
  });
//update profile
router.put('/profile',requiresignIn,updateProfileController)

//get orders
router.get('/orders',requiresignIn,getOrdersController)
export default router

//GET ALL ORDERS
router.get('/All-orders',requiresignIn,isAdmin,getallOrdersController)

//order status update
router.put('/order-status/:orderId',requiresignIn,isAdmin,orderStatusController)