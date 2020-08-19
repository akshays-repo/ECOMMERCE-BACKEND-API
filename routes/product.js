const express = require("express");
const router = express.Router();
const { getProduct,
        productId, 
        createProduct, 
        getPhoto , 
        removeProduct, 
        updateProduct,
        getAllProducts,
        getAllUniqueCategories} = require("../controllers/product");
const { isSignedIn,isAuthenticated,isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

//param
router.param("userId", getUserById);
router.param("productId", productId);

//get product by ID
router.get("/product/:productId",getProduct)
router.get("/product/photo/:productId",getPhoto)

//create product 
router.post("/product/create/:userId",
            isSignedIn,
            isAuthenticated,
            isAdmin,
            createProduct);

//delete product
router.delete("/product/delete/:productId/:userId",
            isSignedIn, 
            isAuthenticated, 
            isAdmin, 
            removeProduct);

//update product
router.put("/product/update/:productId/:userId",
            isSignedIn, 
            isAuthenticated, 
            isAdmin, 
            updateProduct);

//listing product
router.get("/product", getAllProducts)

//getAllUniqueCategories
router.get("/product/categories",getAllUniqueCategories)
module.exports = router;