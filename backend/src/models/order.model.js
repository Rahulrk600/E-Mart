import mongoose,{Schema} from "mongoose";

const orderSchema = new Schema({
    shippingInfo: {
        address: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        stat: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        pinCode: {
            type: Number,
            required: true,
        },
        phoneNo: {
            type: Number,
            required: true,
        },
    },
    orderItems: [
        {
            name: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            image:{
                type: String,
                required: true,
            },
            ratings:{
                type:Number
            },
            stock:{
                type:Number
            },
            product:{
                type: mongoose.Types.ObjectId,
                ref: "Product",
                required: true
            }
        }
    ],
    user:{
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    paymantInfo: {
        id: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
        }
    },
    paidAt: {
        type: Date,
        required: true,
    },
    itemsPrice: {
        type: Number,
        default: 0,
        required: true,
    },
    packagingFee: {
        type: Number,
        default: 0,
        required: true,
    },
    deliveryCharges: {
        type: Number,
        default: 0,
        required: true,
    },
    totalPrice: {
        type: Number,
        default: 0,
        required: true,
    },
    discount:{
       type:  Number,
       default: 0,
       required: true 
    },
    orderStatus:{
        type: String,
        required:true,
        default:"processing",
    },
    deliveredAt:Date,
    createdAt:{
        type:Date,
        default:Date.now,
    },

})

export const Order = mongoose.model("Order", orderSchema);