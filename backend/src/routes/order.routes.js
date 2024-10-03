import { Router } from "express";
import {authorizaRole,verifyJWT} from "../middlewares/auth.middleware.js"
import { 
    createOrder,
    deletOrder,
    getAllOrders,
    getOrderByUser,
    getSingalOrder,
    updateOrder
 } from "../controllers/order.controllers.js"
const router = Router()

router.route("/create/new/order").post(verifyJWT, createOrder)
router.route("/order/:id").get(verifyJWT,getSingalOrder)
router.route("/orders").get(verifyJWT,authorizaRole("admin"),getAllOrders)
router.route("/myorders").get(verifyJWT,getOrderByUser)
router.route("/admin/order/:id")
.put(verifyJWT,authorizaRole("admin"),updateOrder)
.delete(verifyJWT,authorizaRole("admin"),deletOrder)

export default router