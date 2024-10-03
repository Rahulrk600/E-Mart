import { Router } from "express";
import {upload} from "../middlewares/multer.middleware.js"
import {
    registerUser,
    loginUser,
    logOutUser,
    refreshAccesstoken,
    changeCurrentPassword,
    getCuerrentUser,
    upadteUserProfile,
    updateAvatar,
    getAllUser,
    getSingleUser,
    updateUserRole,
    deleteUser,
} from "../controllers/user.controller.js"
import {verifyJWT, authorizaRole} from "../middlewares/auth.middleware.js"

const router = Router();

router.route("/register").post(
    upload.fields([
        {
            name:"avatar",
            maxCount: 1
        }
    ]),
    registerUser
)
router.route("/login").post(loginUser)
//secured route
router.route("/logout").post(verifyJWT,logOutUser)
router.route("/refresh-token").post(refreshAccesstoken)
router.route("/change-password").post(verifyJWT,changeCurrentPassword)
router.route("/current-user").get(verifyJWT,getCuerrentUser)
router.route("/update-profile").patch(verifyJWT,upadteUserProfile)
router.route("/avatar").patch(verifyJWT, upload.single("avatar"), updateAvatar)
// admin route
router.route("/admin/users").get(verifyJWT, authorizaRole("admin"), getAllUser)
router.route("/admin/user/:id")
.get(verifyJWT, authorizaRole("admin"), getSingleUser)
.patch(verifyJWT, authorizaRole("admin"), updateUserRole)
.delete(verifyJWT, authorizaRole("admin"), deleteUser)

export default router;
