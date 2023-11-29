import mongoose from "mongoose"
import productModel from "../models/productModel.js"
import categoryModel from "../models/categoryModel.js"
import orderModel from "../models/orderModel.js"
import slugify from "slugify"
import fs from 'fs'
import braintree from "braintree"
import dotenv from 'dotenv'

dotenv.config();

//payment gateway
var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
  });

export const createProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;

        // Validation
        if (!name || !description || !price || !quantity || !category) {
            return res.status(400).send({ error: "All fields are required!" });
        }

        if (photo && photo.size > 1000000000) {
            return res.status(400).send({ error: 'Photo size should be less than 1GB' });
        }

        

        const products = new productModel({
            name,
            description,
            price,
            quantity,
            category,
            shipping,
            slug: slugify(name)
        });

        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }

        await products.save();

        res.status(201).send({
            success: true,
            message: 'Successfully created a product',
            products,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error creating product"
        });
    }
};

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
        
        const  product = await productModel.findById(req.params.pid).select('photo')
        if(product.photo.data){
            res.set('content-type',product.photo.contentType)
            return res.status(200).send(product.photo.data)
        }

    } catch (error) {
     console.log(error)  ,
     res.status(500).send({
        success: false,
        message: "error in fetching product photo"
     })
    }
}

export const deleteProductController = async(req,res)=>{
    try {
        await productModel.findByIdAndDelete(req.params.pid).select('-photo')
        res.status(200).send({
            success:true,
            message:"successfully deleted a product"
        })
        
    } catch (error) {
       console.log(error)
       res.status(500).send({
        success:false,
        error,
        message: "error in deleting product"
       })
    }
}

export const updateProductController = async (req, res) => {
    try {
        const {name, description, price,category,quantity} = req.fields
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
            return res.status(401).send({error:"Category is required!"})
        }
        
        if(photo && photo.size > 1000000){
            return res.status(500).send({error : 'photo is required and should be less than'})
        }
       
          
        const products = await  productModel.findByIdAndUpdate( req.params.pid, {...req.fields, slug: slugify(name)},{new: true})

        if(photo){
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save()
        res.status(201).send({
            success:true,
            message:'successfully updated a product',
            products,
        })
    
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: 'Error in updating product',
      });
    }
  };

  export const productFilterController = async(req,res)=>{
    try {
        const {radio,checked} = req.body
        let args = {}
        if(checked.length > 0) args.category = checked
        if(radio.length) args.price = {kshgte: radio[0],kshlte: radio[1]}
        const products = await productModel.find(args)
        res.status(200).send({
            success:true,
            products,
        })
    } catch (error) {
       console.log(error) 
       res.status(400).send({
        success: false,
        message: 'error in filter',
        error,
       })
    }        
  }
   
  //product count controller
  export const getCountOfProductsController = async(req,res)=>{
    try {
        const total = await productModel.find({}).estimatedDocumentCount()
        res.status(200).send({
            success: true,
            total,
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success:false,
            message: "problem when counting product",
            error
        })
    }
  }

  //product List per page controller

  export const productListController = async(req,res)=>{
    try {
        const perPage = 3
        const page = req.params.page ? req.params.page : 1
        const products = await productModel
        .find({})
        .select('-photo')
        .skip((page-1) * perPage)
        .limit(perPage)
        .sort({createdAt: -1})
        res.status(200).send({
            success: true,
            products,
        })
    } catch (error) {
       console.log(error) 
       res.status(400).send({
        success: false,
        message: 'error in list control',
        error,
       })
    }
  }

  //search product
  export const searchProductController = async(req,res)=>{
    try {
        const {keyword} = req.params
        const results = await productModel.find({$or:[
            {name:{$regex: keyword,$options: "i"}},
            {description:{$regex: keyword,$options: "i"}}

        ]
            
        }).select("-photo")
        res.json(results)
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "Error in search Product controller",
            error,
        })
    }
  }

  //similar product
  export const relatedProductController = async(req,res)=>{
    try {
        const {pid,cid} = req.params
        const products = await productModel.find({
            category: cid,
            _id:{$ne: pid}
        }).select("-photo").limit(3).populate("category")
        res.status(200).send({
            success:true,
            products
        })
    } catch (error) {
      console.log(error) 
      res.status(400).send({
        success: false,
        message: 'error in similar product controller',
        error,
      }) 
    }
  }

  //product category controller
export const  ProductCategoryController =async(req,res)=>{
    try {
        const category =await categoryModel.findOne({slug: req.params.slug})
        const products = await productModel.find({category}).populate("category")
        res.status(200).send({
            success:true,
            products,
            category
        })
    } catch (error) {
        console.log(error)
        res.status(401).send({
            success: false,
            message: "Error while getting product category",
            error,
        })
    }
}

//payment gateway api
//token
export const braintreeTokenController = async (req, res) => {
    try {
      gateway.clientToken.generate({}, function (err, response) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.send(response);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  //payment
  export const brainTreePaymentController = async (req, res) => {
  
    try {
      const { nonce, cart } = req.body;
      let total = 0;
      cart.map((i) => {
        total += i.price;
      });
      let newTransaction = gateway.transaction.sale(
        {
          amount: total,
          paymentMethodNonce: nonce,
          options: {
            submitForSettlement: true,
          },
        },
        function (error, result) {
          
          if (result) {
            const order = new orderModel({
              products: cart,
              payment: result,
              buyer: req.user._id,
            }).save();
            res.json({ ok: true });
          } else {
            res.status(500).send(error);
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  