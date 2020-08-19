const express = require("express")
const router = express.Router()

const {getCategoryId,
        createCategory, 
        getAllCategory, 
        getCategory, 
        updateCategory, 
        removeCategory} = require("../controllers/category")

const {isSignedIn,
        isAuthenticated,
        isAdmin} = require("../controllers/auth")

const {getUserById} = require("../controllers/user")

// param 
router.param("userId", getUserById);
router.param("categoryId",getCategoryId );

// create category
router.post("/category/create/:userId", isSignedIn, isAuthenticated, isAdmin, createCategory)
//read category by ID
router.get("/category/:categoryId",getCategory)
//read All category
router.get("/categories",getAllCategory)
//update category
router.put("/category/update/:categoryId/:userId", isSignedIn, isAuthenticated, isAdmin, updateCategory)
//delete caetgory
router.delete("/category/delete/:categoryId/:userId", isSignedIn, isAuthenticated, isAdmin, removeCategory)

module.exports = router