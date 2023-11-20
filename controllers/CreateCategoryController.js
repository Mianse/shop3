import categoryModel from '../models/categoryModel.js'
import slugify from 'slugify'
export const CreateCategoryController = async(req,res)=>{
    try {
        const {name} = req.body
        if(!name){
            return res.status(401).json({error: 'Name is required'})

        }
        const existingCategory = await categoryModel.findOne({name})
        if (existingCategory) {
            res.status(200).send({
                success: true,
                message: "category already exists"
            })
        }
        const category = await new categoryModel({name,slug: slugify(name)}).save()
        res.status(200).send({
            success: true,
            message: 'new category created',
            category,
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message: 'Error in category'
        })
    }
}

export const updateCategoryController = async(req,res)=>{
    try {
        const {name} = req.body
        const {id} = req.params;
        
        const category = await  categoryModel.findByIdAndUpdate((id),{name,slug: slugify(name)},{new: true})
        res.status(200).send({
            success:true,
            message:' category updated successfully!',
            category,
        })
        
    } catch (error) {
       console.log(error) 
       res.status(500).send({
        success: false,
        error,
        message: 'Error updating Category'
       })
    }
}

//category controller
export const categoryController = async (req,res)=>{
    try {
        const category = await categoryModel.find({})
        res.status(200).send({
            success: true,
            message:'get all categories',
            category
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message: 'Error getting categories'
        })
    }
}
//single category
export const singleCategoryController = async (req,res)=>{
    try {
   
     
        const category = await categoryModel.findOne({slug: req.params.slug});
        res.status(200).send({
            success : true,
            message: 'get all single category  successfully',
            category,
        })
        
    } catch (error) {
      console.log(error)  
      res.status(500).send({
        success:false,
        error,
        message: "error in single category"
      })
    }
}
//delete category

export const DeleteCategoryController= async (req,res)=>{
    try {
        const {id} = req.params

        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success:true,message:"delete successfuly",
        })
      
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "error deleting category"
        })
    }
}
