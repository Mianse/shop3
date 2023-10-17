import productModel from "../models/productModel.js"
import slugify from "slugify"
import fs from 'fs'

export const createProductController = async (req,res)=>{
    try {
        const {name, description, price,quantity,category,shipping} = req.fields
        const {photo} = req.files
        //validation
        if(!name){
            return res.status(401).send({error:"Name is required!"})
        }
        if(!description){
            return res.status(401).send({error:"description is required!"})
        }
        if(!price){
            return res.status(401).send({error:"Price is required!"})
        }
        if(!quantity){
            return res.status(401).send({error:"quantity is required!"})
        }
        if(!category){
            return res.status(401).send({error:"category is required!"})
        }
        if(photo && photo.size > 1000000){
            return res.status(500).send({error : 'photo is required and should be less than'})
        }
        const products = new productModel({...req.fields, slug: slugify(name)})
        if(photo){
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save()
        res.status(201).send({
            success:true,
            message:'successfully created a product',
            products,
        })
    } catch (error) {
       console.log(error) 
       res.status(500).send({
        success : false,
        error,
        message: "Error creating product"
       })
    }
}

export const getProductsController = async (req,res)=>{
    try {
        const products = await productModel.find({}).populate('category').select('-photo').limit(12).sort({createdAt: -1})
        res.status(201).send({
            success: true,
            countTotal: products.length,
            message :"Successfully fetched all the Products",
            products,
        })
    } catch (error) {
     console.log(error)  
     res.status(500).send({
        success: false,
        error,
        message :" Error getting all the Products",

     })
    }
}

export const getSingleProductController = async(req,res)=>{
    try {
        const product = await productModel.findOne({slug: req.params.slug}).select('-photo').populate('category')
        res.status(200).send({
            success: true,
            message:"Successfully fetched single product",
            product,
        })
    } catch (error) {
       console.log(error) 
       res.status(500).send({
        success : false,
        error,
        message: "error in getting single product controller"
       })
    }
}

export const getProductPhotoController = async (req,res)=>{
    try {
        
    } catch (error) {
     console.log(error)  ,
     res.status(500).send({
        success: false,
        message: "error in fetching product photo"
     })
    }
}