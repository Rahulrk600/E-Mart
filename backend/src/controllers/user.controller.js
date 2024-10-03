import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary, deleteOnCloudinary } from "../utils/cloudnary.js"
import jwt from "jsonwebtoken"
import sendEmail from "../utils/sendEmail.js"

//genreating AccessToken and RefreshToken

const generatAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false });

        return {accessToken, refreshToken }

    } catch (error) {
        throw new ApiError(500, "something went wrong while generting accesstoken and refreshtoke")
    }
}

const options = {
    httpOnly: true,
    secure: true,
    sameSite: 'None'
}
//user register 
const registerUser = asyncHandler(async (req, res) => {
    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res


    const { fullName, email, username, password } = req.body
    //console.log("email: ", email);

    if (
        [fullName, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }
    //console.log(req.files);

    const avatarLocalPath = req.files?.avatar[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }
    // console.log("avatarlocakl:", avatarLocalPath);

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    //console.log(avatar);

    if (!avatar) {
        throw new ApiError(400, "avatar file is required")
    }


    const user = await User.create({
        fullName,
        avatar: avatar.url,
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    ) 

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )

})

// user logged in
const loginUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body

    if (!username && !email) {
        throw new ApiError(400, "username or email is required")
    }

    const user = await User.findOne({
        $or: [{ username }, { email }]
    }) 

    if (!user) {
        throw new ApiError(401, "User does not exist ")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) { 
        throw new ApiError(404, " !! invalid user credentials")
    }

    const {accessToken,refreshToken} = await generatAccessAndRefreshToken(user._id)


    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200, {
                user: loggedInUser, refreshToken, accessToken
            },
                "User logged In successfully"
            )
        )
})

//user logOut
const logOutUser = asyncHandler(async (req, res) => {
    User.findByIdAndUpdate(
        req.user._id, {
        $unset: {
            refreshToken: 1
        }
    },
        { new: true }
    )
 
    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "user logged out successfull"))
})

const refreshAccesstoken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthrize request")
    }

    const decoded = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)

    const user = await User.findById(decoded?._id)

    if (!user) {
        throw new ApiError(404, "invalid refreshToken")
    }

    if (incomingRefreshToken !== user?.refreshToken) {
        throw new ApiError(402, "refreshToken is expired or used")
    }

    const { accessToken, newRefreshToken } = await generatAccessAndRefreshToken(user?._id)
    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(new ApiResponse(200, { accessToken, refreshToken: newRefreshToken }, "AccessToken is refreshed"))
})

const getCuerrentUser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(new ApiResponse(200, req.user, "fetched current user successfully"))
})
//get all users (admin)
const getAllUser = asyncHandler(async (req, res) => {

    const allUsers = await User.find()
    return res
        .status(200)
        .json(new ApiResponse(200, allUsers, "all user fetched successfully"))
})
//get single user (admin)
const getSingleUser = asyncHandler(async (req, res) => {
    const { userId } = req.params
    const singleUser = await User.findOne(userId)
    return res
        .status(200) 
        .json(new ApiResponse(200, singleUser, "single user fetched successfully"))

})
// update password
const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body

    const user = await User.findById(req.user?._id)

    if (!user) {
        throw new ApiError(404, "user does no exist")
    }

    const isCorrectPassword = await user.isPasswordCorrect(oldPassword)

    if (!isCorrectPassword) {
        throw new ApiError(404, "invaild old password")
    }

    user.password = newPassword
    await user.save({ validateBeforeSave: false })

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Password update successfully"))
})
//update user profile
const upadteUserProfile = asyncHandler(async (req, res) => {
    const { fullName, email } = req.body

    if (!fullName || !email) {
        throw new ApiError(404, "all fiels are required")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id, {
        $set: {
            fullName, 
            email
        }
    },
        { new: true }
    ).select("-password")

    return res
        .status(200)
        .json(new ApiResponse(200, user, "user profile updated successfully"))

})

// update Avatar
const updateAvatar = asyncHandler(async (req, res) => {

    const avatarLocalPath = req.file?.path

    if (!avatarLocalPath) {
        throw new ApiError(404, "Avatar file is required")
    }

    const deleteAvatar = await User.avatar?.url
    const avatar = await uploadOnCloudinary(avatarLocalPath)

    if (!avatar) {
        throw new ApiError(404, "somethin went wrong while uploding  avatar on cloudnary")
    }

    const updateAvatar = await User.findByIdAndUpdate(req.user?._id, {
        $set: {
            avatar: avatar.url
        }
    }, { new: true }).select("-password")


    if (!updateAvatar) {
        throw new ApiError(500, "somethe went  wrong while updating avatar ")
    }

    if(updateAvatar){
        await deleteOnCloudinary(deleteAvatar)
    }
    return res
        .status(200)
        .json(new ApiResponse(200, updateAvatar, "Avatar update successfully"))
})

//update user role(admin)
const updateUserRole = asyncHandler(async (req, res) => {
    const  {id}  = req.params
    const { role } = req.body
    // console.log(id, role);
     
    const user = await User.findById(id)
    if (!user) {
        throw new ApiError(404, "invilid user id")
    }

    const updateRole = await User.findByIdAndUpdate(id, {
        $set: {
            role
        }

    },
        { new: true }
    )

    return res
        .status(200)
        .json(new ApiResponse(200, updateRole, "user role updated successfully"))
})

// delete user (admin)
const deleteUser = asyncHandler(async (req, res) => {
    const  {id}  = req.params


    const user = await User.findById(id)
    if (!user) {
        throw new ApiError(404, "user not found")
    }

    await User.findByIdAndDelete(id);

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "user role updated successfully"))
})

// Forget Password 
const  forgetPassword = asyncHandler(async(req, res, next)=>{

    const {email} = req.body

    const user = User.findOne({email})

    if(!user){
        throw new ApiError(404, "user not found");
    }

    // generate reset token

    const resetToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave: false})

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
    //const resetPasswordUrl = `http://localhost/api/v1/password/reset/${resetToken}`

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n if you have not requested this email then , please ignore it`;

    try {
        await sendEmail({
            email: user.email,
            subject: `E-MART Password Recover`,
            message,
        });
        return res
        .status(200)
        .json(new ApiResponse(200,{},`Email send ${user.email} successufully`))
    } catch (error) {
        user.resetPasswordToken = undefined
        user.resetPasswordExpires = undefined

        await user.save({validateBeforeSave: false})

        return next(new ApiError(error.message, 500))
    }

}) 

//reset password

// exports.resetPassword = catchAsyncError(async(req,res,next)=>{
   
//     //creating token has
//     const resetPasswordToken = crypto
//     .createHash("sha256")
//     .update(req.params.token)
//     .digest("hex");

//     const user = await User.findOne({
//         resetPasswordToken,
//         resetPasswordExpire: {$gt: Date.now()},
//     })

//     if(!user ){
//         return next(new ErrorHandlar("Reset password token is invaild or been expired",400))
//     }
//     if(req.body.password !== req.body.confirempassword){
//         return next(new ErrorHandlar("password does not match",400))
//     }

//     user.password = req.body.password;
//     user.resetPasswordToken=undefined;
//     user.resetPasswordExpire=undefined;

//      await user.save();
//      sendToken(user,200,res);
// });


export {
    registerUser,
    loginUser,
    logOutUser,
    refreshAccesstoken,
    getCuerrentUser,
    getAllUser,
    getSingleUser,
    changeCurrentPassword,
    upadteUserProfile,
    updateUserRole,
    updateAvatar,
    deleteUser,
    forgetPassword
}   