const express= require("express");
const dotenv = require("dotenv");
dotenv.config();
const connectdb = require('./configs/mongodbconnection');
const app = express();
const port = process.env.PORT || 8081;
//connect to mongodb
connectdb();
//basic middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send("home url for file sharing app");
});
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