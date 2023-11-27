import mongoose from  'mongoose'

const orderSchema =  new mongoose.Schema({
   products:[{
    type:mongoose.objectId,
    ref:'Product',
   }],
   payment:{},
   buyer:{
    type: mongoose.objectId,
    ref:'User'
   },
   status:{
    type : String ,
    enum: ['not processed','processing','shipped','delivered','cancel']
   },

},{
    timestamps: true
})

export default mongoose.model('order',orderSchema)
