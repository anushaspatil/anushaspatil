const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const contentSchema = new Schema({
  name:{
    type:String,
    required : true,
  },
  description:{
    type:String,
    required : true,
  },
  genre:{
    type:String,
  },
  duration:{
    type:Number,
    required : true,
  },
  coverPhoto:{
    type:String,
    required : true,
  },
  contentURL:{
    type:String,
    required : true,
  }
})

module.exports = mongoose.model("content",contentSchema);