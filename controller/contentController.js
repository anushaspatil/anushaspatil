const User = require("../model/contentModel");
const multer = require("multer");
const express = require("express");

const fileMulter = async (req,res,next)=>{
const storage =await multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
      cb(null, Date.now()+'-'+file.originalname);
  }
});

const upload = multer({ storage });

module.exports.send = (req, res) => {
upload.single('img');
console.log(req.body, req.files);
res.send('ok');
}
}


const uploadContent = async (req,res,next) => {
  try{
  const{name, description,genre, duration } = req.body;
  const{coverPhoto, ContentUrl}=req.form-data.video;

  const newFile = new User({
    name,
    description,
    genre,
    duration,
  },
  {
    coverPhoto,
    ContentUrl:fileMulter,
  });
  console.log(newFile)
let data = await newFile.save();
console.log(data);
res.send("File uploaded successfully");
}catch(err){
  res.status(501).send("File is not able to upload");
}
}

module.exports = {uploadContent,}





