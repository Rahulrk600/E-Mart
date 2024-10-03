import mongoose, { Schema } from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    description: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    price: {
        type: Number,
        required: true,
        trim: true,
        index: true
    },
    ratings: {
        type: Number,
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    images: [
        {
            type: String,
            required: true
        }
    ],
    category: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        default: 1,
        required: true
    },
    reviews: [
        {
            fullName: {
                type: String,
                required: true
            },
            ratings: {
                type: Number,
                required: true,
            },
            comment: {
                type: String,
                required: true
            },
            avatar:{
                type:String,
                required:true
            },
            user: {
                type: mongoose.Types.ObjectId,
                ref: "User",
                required: true
            }
        }
    ],
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true })

//productSchema.plugin(aggregatePaginate);
export const Product = mongoose.model("Product", productSchema)