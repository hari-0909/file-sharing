const nodemailer=require("nodemailer");
const transporter=require("../configs/Mailer");
const sendMail=async({emailTo,emailFrom,link,fileName,size})=>{
    await transporter.sendMail({
        from:emailFrom,
        to:emailTo,
        subject:"Your file is ready to download",
        html:`<strong style="color:blue; font-size:100px">Hi this is automated mail from link: ${link}</strong>`
    },function(err,data){
        if(err){
            console.log("Error while sending mail",err);
        }else{
            console.log(`email sent successfully to:${emailTo}`);
        }
    })
}
module.exports=sendMail;