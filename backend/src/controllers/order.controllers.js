import {ApiError } from "../utils/ApiError.js"
import { ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler } from "../utils/asyncHandler.js"
import {Order} from "../models/order.model.js"
import {Product} from "../models/product.model.js" 
import { isValidObjectId } from "mongoose"

//create order
const createOrder = asyncHandler(async(req, res)=>{
    const {shippingInfo, orderItems, paymantInfo, itemsPrice, packagingFee, deliveryCharges,discount, totalPrice} = req.body
      

    // if(!shippingInfo || !orderItems || !paymantInfo || !itemsPrice || !packagingFee || !discount || !totalPrice ,!deliveryCharges ){
    //      throw new ApiError(401, "all files are requied ")
    //  }
     
    const order = await Order.create({ 
        shippingInfo, 
        orderItems, 
        paymantInfo,
        itemsPrice,
        packagingFee,
        discount,
        deliveryCharges, 
        totalPrice,
        paidAt: Date.now(), 
        user: req.user?._id, 
    }); 

    if(!order){
        throw new ApiError(500, "Something went wrong while creating order")
    }
    return res
    .status(200)
    .json(new ApiResponse(200, {order: order}, "order created successfully"))
})

//get singal order
const getSingalOrder = asyncHandler(async(req, res)=>{
   const {id} = req.params

   if(!isValidObjectId(id)){
    throw new ApiError(404, "invaild id")
   }

   const order = await Order.findById(id).populate(
  "user",
  ["fullName", "email"]
   )

   if(!order){
    throw new ApiError(404," order not found ")
   }
   return res
   .status(200)
   .json(new ApiResponse(200, order, "order fetched successfully"))
})

// get all orders by admin

const getAllOrders = asyncHandler(async(req, res)=>{

    const orders = await Order.find()
     
    if(!orders){
        throw new ApiError(401, "not found any order")
    }

    let totalAmout = 0
     
    orders.forEach((order)=>{
        totalAmout += order.totalPrice
    })
    return res
    .status(200)
    .json(new ApiResponse(200, {totalAmout, orders}, "fetched all orders successfully"))

})

// get orders by logged in user

const getOrderByUser = asyncHandler(async(req, res)=>{

    const myorder = await Order.find({user: req.user._id})
    return res
    .status(200)
.json(new ApiResponse(200,{ myorder:myorder}, "fetched order successfully"))

})


// stockUpdate function +
 async function stockUpdate(id,quantity){
    const product = await Product.findById(id)
    product.stock -= quantity
    await product.save({validateBeforeSave:false});
 }

//update order
const updateOrder = asyncHandler(async(req, res)=>{
    const orderId = req.params.id

    if(!isValidObjectId(orderId)){
        throw new ApiError(404, "inviled orderId") 
    }

    const order = await Order.findById(orderId)
    if(!order){
        throw new ApiError(404, "order not found")
    }
    
    if(order.orderStatus === "Delivered"){
        throw new ApiError(400, "you have already delivered this order")
    }
    
    if(req.body.status === "Shipped"){
        order.orderItems.forEach(async (order)=>{
            await stockUpdate(order.product, order.quantity);
        })
    }
    
    order.orderStatus = req.body.status
      if(req.body.status === "Delivered"){
          order.deliveredAt = Date.now();
         // order.paymantInfo.status =  "succeeded"
      }

       await order.save({validateBeforeSave: false});
    return res
    .status(200)
    .json(new ApiResponse(200,{}," successfully update"))
})

//delete order

const deletOrder = asyncHandler(async(req, res )=>{

    const orderId = req.params.id

    if(!isValidObjectId(orderId)){
        throw new ApiError(404, "invaild orderId")
    }

    const order = await Order.findById(orderId)

    if(!order){
        throw new ApiError(404, "order not found")
    }

    await Order.findByIdAndDelete(orderId)
    return res
    .status(200)
    .json(new ApiResponse(200, {}, "order deleted successfully"))
})

export{
    createOrder,
    getAllOrders,
    getSingalOrder,
    getOrderByUser,
    updateOrder,
    deletOrder
}