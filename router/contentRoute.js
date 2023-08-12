const express = require("express");

const router = express.Router();

const{uploadContent,} = require("../controller/contentController");
const{stragemulter,} =require("../controller/multer");
const{userAuthenticate , adminAuthenticate,} = require("../controller/isAunthicated");

router.post("/upload",stragemulter, (req,res,next)=>{console.log("upload"); next()}, uploadContent);
// router.get("/file",adminAuthenticate, stragemulter);

module.exports = router;  