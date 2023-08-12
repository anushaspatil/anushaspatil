const express = require("express");
const port = 8099;
const mongoose = require("mongoose");
const app = express();

const DBname = "Netflix_Account";

const url = "mongodb://127.0.0.1:27017/" ;


mongoose.connect(url + DBname,{
  useNewUrlParser : true , useUnifiedTopology : true
}).then(()=>{
  console.log("DataBase is connected successfully")
}).catch((err)=>{
  console.log("ERRor",err);
})

app.use("/video", express.static(__dirname + "/content"));

const userRouter = require("./router/userRoute");
const contentRouter = require("./router/contentRoute");

app.use(express.json());
// app.use("/CreateUser", createUser);
app.use("/users",userRouter);

app.use("/content",contentRouter);

console.log("valid user")


app.listen(port,()=>{
  console.log("Server is on",port);
})