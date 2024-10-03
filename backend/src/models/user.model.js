import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import crypto from "crypto"

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    password: {
        type: String,
        required: true,

    },
    avatar: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user"
    },
    refreshToken: {
        type: String
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date
},
    {
        timestamps: true
    }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
} 

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id:this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.getResetPasswordToken = function(){
    // Generating token 

    const resetToken = crypto.randomBytes(20).toString("hex");

    // hashing and adding resetPasswordToken  to userSchema

    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")

    this.resetPasswordExpires = Date.now() +10 *60*1000;
   return resetToken;
}

export const User = mongoose.model("User", userSchema);