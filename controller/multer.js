const express = require("express");

const app = express();
const multer = require("multer");

const stragemulter = async (req,file,next)=>{
try{
const storage = multer.diskStorage({
  destination : function(req,file,cb){
    cb(null,"./content")
  },
  filename : function (req,res,cb){
    cb(null, Date.now().toString() + ".mp4");
  }
})

const upload = multer({storage:storage})

app.post("/",upload.single("video"),(req,res)=>{
  let file = req.file;
  console.log(req.file);
  if(req.file){
    res.send("file uploaded successfully")
    next();
  }
  else{
    res.send("file not uploaded")
  }
})
}

catch(err){
  console.log(err);
  res.status(401).send("internal error")
}
}


module.exports = {stragemulter, }