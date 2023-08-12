const jwt = require("jsonwebtoken");
const secret = "mysecret";

const isauthenticate = (req,res,next)=>{
  console.log("token")
  let token = req.headers.authorization;
  // res.send("you are authorised")
  if(token){
    token = token.split(" ")[1];
    console.log(token)
  try {
      const user = jwt.verify(token, secret);
      req.user = user;
      next();
  } catch (err) {
    console.log(err);
    // res.send("ineternal err")
  }
}
}


// const userAuthenticate = (req,res,next)=>{
//   let token = req.headers.authorization;
//   // res.send("you are authorised")
//   if(token){
//     token = token.split(" ")[1];
//     console.log(token)
//   try {
//       const user = jwt.verify(token, secret);
//       req.user = user;
//       next();
//   } catch (err) {
//     console.log(err);
//     // res.send("ineternal err")
//   }
// }
//   else{
//     res.status(401).send("You are not authenticated as no token found.");
//   }
// }


// const adminAuthenticate = (req,res,next)=>{
//   let token = req.headers.authorization;
//   // res.send("you are authorised")
//   if(token){
//     token = token.split(" ")[1];
//     console.log(token)
//   try {
//       const user = jwt.verify(token, secret);
//       console.log(user);
//       req.user = user;
//       if(user.Role === "admin"){
//         next();
//       }else{
//         res.status(501).send("You are not authorized to perform this action.");
//       }
    
//   } catch (err) {
//     console.log(err);
//     // res.send("ineternal err")
//   }
// }
// else{
//   res.status(401).send("You are not authenticated as no token found.");
// }
// }

module.exports = { isauthenticate, };



// const verify = (req,res) => {
//   const { token } = req.body;
//   let val = jwt.verify( token, secret);
//   res.send(val);
//   console.log(val) }


//   "email":"sandyagowda@gmail.com",
//   "password":"960677",
//   "Role":"Admin",
//   "isLoggedin":"false",
//   "FirstName":"sandya",
//   "LastName":"gowda"

// "email":"Harish@gmail.com",
// "password":"9606",
// "Role":"user",
// "isLoggedin":"false",
// "FirstName":"Harish",
// "LastName":"gowda"