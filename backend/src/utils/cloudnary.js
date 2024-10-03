import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.YOUR_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.YOUR_CLOUDINARY_API_KEY,
    api_secret: process.env.YOUR_CLOUDINARY_API_SECRET
}); 

const uploadOnCloudinary = async (localFilePath)=>{
    try {
        if(!localFilePath) return null;
        // upload the file on cloudnary
        const result = await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        // file has been uploaded successfull
        console.log("file is uploaded on cloudinary",
        result.url);
        fs.unlinkSync(localFilePath);
        return result;
    } catch (error) {
        fs.unlinkSync(localFilePath) //remove the locally saved temporary file as the upload operation got faild
        console.log(error)
        return null; 
    }
}

const deleteOnCloudinary = async(public_id)=>{
    try {
        if(!public_id) return null;
    
        const result = await cloudinary.uploader.destroy(public_id,{
            resource_type: "auto"
        })
    
        console.log("file delete on cloudinary",result.url);
    
    } catch (error) {
        return error
    }}
export{uploadOnCloudinary, deleteOnCloudinary}