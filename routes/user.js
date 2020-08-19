const express = require("express");
const router = express.Router();

const { getUserById, getUser, getUsers, updateUser, getUserOrder } = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

router.param("userId", getUserById);

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);

router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);

router.get("orders/user/:userId", isSignedIn, isAuthenticated, getUserOrder);

router.get("/users",getUsers)

module.exports = router;
