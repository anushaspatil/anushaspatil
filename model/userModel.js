const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProfileInformationSchema =new Schema({
  FirstName:{
    Type:String,
    // required:true,
  },
  LastName:{
    Type:String,
  },
  DOB:{
    Type:Date,
  },
  PhoneNumber:{
    Type:Number,
  },
  Country:{
    Type:String,
  }
});

const MembershipStatus = new Schema({
  MembershipStart_date:{
    type : Number,
    required : true,
  },
  MembershipExpiry_date:{
    type : Number,
    required : true,
  },
  PaidMembership :{
    type:Boolean,
    default:false,
  }
})

const userSchema = new Schema({
  email:{
    type:String,
    required: [true, "email is required"],
    unique :true,
  },
  password:{
    type:String,
    required:true,
    
  },
  Role:{
    type:String,
    default:"User",
    enum:["User", "admin"]
  },
  isLoggedin:{
    type:Boolean,
    default:false,
  },
  ProfileInformation : ProfileInformationSchema ,

  Payment_status : MembershipStatus,
})


module.exports = mongoose.model("user", userSchema);



// we can write it like this : 
//ProfileInformation : {
//   FirstName: { Type: String, required : true,},
//   LastName : {Type: String, },
//   DOB : {Type: Date,},
//   PhoneNumber : {Type: Number,},
//   Country : { Type: String, }}
