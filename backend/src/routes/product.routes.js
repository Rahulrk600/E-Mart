import { Router } from "express";
import {verifyJWT, authorizaRole} from "../middlewares/auth.middleware.js"
import {upload} from "../middlewares/multer.middleware.js"
import { 
    createProduct,
    createReview,
    deleteProduct,
    deleteReview,
    getAllProduct,
    getAllProductByAdmin,
    getAllReview,
    getProductDetails,
    updateProduct,
    updateProductImage, 
    getCategoryProducts,
    searchProduct,
    getProductsOfCategory
 } from "../controllers/product.controllers.js"
const router = Router()
router.route("/admin/create/newProduct").post(verifyJWT,authorizaRole("admin"),upload.array("images", 10),createProduct)
router.route("/get/categoryProduct").get(getCategoryProducts)
router.route("/get/products/by/category").post(getProductsOfCategory)
router.route("/all/products").get(getAllProduct)
router.route("/search").get(searchProduct)
router.route("/product/:id").get(verifyJWT,getProductDetails) 
router.route("/admin/product").get(verifyJWT,authorizaRole("admin"),getAllProductByAdmin)
router.route("/B/admin/product/:id")
.patch(verifyJWT,authorizaRole("admin"),updateProduct)
.delete(verifyJWT,authorizaRole("admin"),deleteProduct)
router.route("/admin/product/images/:id").post(verifyJWT,authorizaRole("admin"),upload.array("images",10),updateProductImage)

router.route("/review").put(verifyJWT,createReview)
router.route("/reviews/:id")
.get(verifyJWT,getAllReview)
.delete(verifyJWT,deleteReview)

export default router;