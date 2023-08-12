const user = require("../model/userModel");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const secret = "mysecret";

const createUser = async (req,res)=>{
  try{
   const {email,password,role,isLoggedin,ProfileInformation} = req.body;
   const hashPassword = await bcrypt.hash(password,10);

   const newUser = new user({
    email,
    password : hashPassword,
    role,
    isLoggedin,
    ProfileInformation,
   });
   let data = await newUser.save();
   console.log(data);
   res.send("User created successfully");
  }
  catch(err) {
    console.log("error",err);
    res.status(500).send("Error in creating user");
  }
}


const userLogin = async (req,res)=>{
  const {email, password} = req.body;
  // res.send({email,password});
  try{
    const User = await user.findOne({email:email})
      if(User){
        console.log(User);
        const passwordmatch = await bcrypt.compare(password , User.password);
        if(passwordmatch){
          const token = jwt.sign({ email, role: User.Role }, secret);
          res.send({token});
          // res.send("User Logged-in Successfully")
        }else{
          res.status(400).send("Password is Incorrect");
        }
        // res.send("user exist");
      }
      else{
        res.status(404).send("user doesn't exist");
      }
  }
  catch(err){
    console.log(err);
    res.status(500).send("Internal server error");
  }
};

const get_allUser = async (req,res,next)=>{
  const alluser = await user.find({})
  res.send(alluser)
}

const deleteUser = async (req,res,next) => {
  try {
//     let UserDel = await user.findOne({ email : req.body.email });
//     if(UserDel){
//       //user exists
//       UserDel = await user.deleteOne({ email : req.body.email });
//       next();
//       // return res.send("Deleted User Successfully");
//     }else{
//       //user doesn't exist
//       //  res.status(401).send("User doesn't exist");
//     }
//   }
//   catch (err) {
//     // return res.status(400).send("Internal Server Error");
//   }
const users = await user.findOneAndDelete({ email : req.user.email});
console.log(users)
if(users){
  res.send("user deleted successfully");
}else{
  res.send("user doesnt exist");
}
}
catch(err) {
  res.status(401).send(err);
  }
}


const changePassword = async (req,res) => {
  try {

    let Userpass = await user.findOne({ email : req.body.email});
    console.log(Userpass.password);
    if(Userpass){
      const comparepass = await bcrypt.compare(req.body.old_password, Userpass.password);
      console.log(comparepass);
      if(comparepass)
      {
        const hashingpass = await bcrypt.hash(req.body.new_password, 10);
        Userpass = await user.findOneAndUpdate({ email:req.body.email}, {password:hashingpass});
        res.send("Password changed successfully");
      }
      else{
        res.send("password is inccorrect")
      }
    }else{
      res.send("user doen't exist")
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
}

const upgradeMembership = async (req, res) => {
try {
  console.log("upgrade")
  const{email,PaidMembership} = req.body;
  // const newUser = new user({
  //   PaidMembership,
  // })

  let userID = await user.findOne({email : email});
  console.log(userID);
if(userID){
  const memStatus = await user.findOneAndUpdate({email : email}, {PaidMembership:newUser.PaidMembership})
  console.log(memStatus);
  res.send("Payment Status Updated Successfully");
}
else{
  res.status(501).send("user doesnt Exist");
}
const membership = new user({
  PaidMembership,
})
} catch (err) {
  console.log(err);
  res.status(401).send("Internal Error");
}
};



module.exports = { createUser, userLogin, get_allUser, deleteUser, changePassword, upgradeMembership,};



// Steps to upgrade membership:
// change the status of the user from free to premium
// change the membership start date to today's date
// change the membership end date to today's date + 30 days
// const upgradeMembership = async (req, res) => {};
// // Integrate a payment gateway