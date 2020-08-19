const express = require("express")
const router = express.Router()

const {isSignedIn,isAuthenticated,isAdmin} = require("../controllers/auth")
const {getUserById, pushOrderInPurchaseList} = require("../controllers/user")

const {getOrderById, createOrder, getAllOrders, getOrderStatus, updateOrderStatus} = require("../controllers/order")
const {updateInventory} = require("../controllers/product")
//params
router.param("userId",getUserById)
router.param("orderId",getOrderById)

//create order
router.post("/product/create/:userId",isSignedIn, 
                                    isAuthenticated, 
                                    pushOrderInPurchaseList, 
                                    updateInventory, createOrder);

router.get("/product/orders/:userId", isSignedIn,isAuthenticated,isAdmin,getAllOrders)
            
router.get("/product/order/status/:userId",isSignedIn,isAuthenticated,isAdmin,getOrderStatus)
router.put("/product/order/status/:orderId/:userId",isSignedIn,isAuthenticated,isAdmin,updateOrderStatus)


module.exports = router