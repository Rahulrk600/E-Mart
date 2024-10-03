import {ApiError} from "../utils/ApiError.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"

export const verifyJWT = asyncHandler(async(req, _, next) =>{
   try {
     const token = await req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
 
     if(!token){
         throw new ApiError(401,"unauthorized requiest")
     }
 
     const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
 
     const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
 
     if(!user){
         throw new ApiError(401,"invalid token")
     }
     req.user = user
     next()
 
   } catch (error) {
      throw new ApiError(401, error?.message || "Invaild access token")
   }
})

export const authorizaRole = (...roles)=>{
  return (req, res, next)=>{
    if(!roles.includes(req.user.role)){
      return next( new ApiError(403, `Role: ${req.user.role} is not allowed  to this resorce`))
    }
    next()
  }
}