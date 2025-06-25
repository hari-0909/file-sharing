const nodemailer=require("nodemailer");
let transporter=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.MAIL_USERNAME,
            pass:process.env.MAIL_PASSWORD,
            // clientId: process.env.OAUTH_CLIENT_ID,
            // clientSecret: process.env.OAUTH_CLIENT_SECRET,
            // refreshToken: process.env.OAUTH_REFRESH_TOKEN
        }
    });
    module.exports=transporter;