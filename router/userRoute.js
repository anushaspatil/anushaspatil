const express = require("express");

const router = express.Router();
console.log("user route");
const { createUser ,userLogin , changePassword, deleteUser, upgradeMembership, } = require("../controller/userController");
const {isauthenticate,} = require("../controller/isAunthicated");

router.post("/signup", createUser);
router.post("/login",(req,res,next)=>{console.log("login"); next()} , userLogin);
// router.get("/all_users", (req,res,next)=>{console.log("all_users"); next()}, isauthenticate, get_allUser);
router.put("/changepass" , changePassword)
router.delete("/delete", deleteUser)
router.put("/upgradeMembership", upgradeMembership);


module.exports = router;