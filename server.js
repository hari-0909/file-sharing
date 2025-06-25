const express= require("express");
const dotenv = require("dotenv");
dotenv.config();
const connectdb = require('./configs/mongodbconnection');
const app = express();
const port = process.env.PORT || 8081;
const sendMail=require("./service/MailSender");
//connect to mongodb
connectdb();
//basic middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send("home url for file sharing app");
});
let emailOptions={
  emailTo:"haribabuji60@gmail.com",
  emailFrom:"haribabuji20@gmail.com",
  link:"abcd",fileName:"abdc",size:1234
}
app.get("/send",(req,res)=>{
  sendMail(emailOptions);
  res.send("mail sent successfully");
})
// //404 handler
// app.use((req,res,next)=>{
//   res.status(404).json({
//     error:{
//       message:'Route not found'
//     }
//   });
// });
// //error handling middleware
// app.use((err,req,res,next)=>{
//   console.log(err.stack);
//   res.status(err.status || 500).json({
//     error:{
//       message:err.message || 'Internal Server Error'
//     }
//   });
// });
//start server
app.listen(port,()=>{
  console.log(`server is running on port ${port}`);
})