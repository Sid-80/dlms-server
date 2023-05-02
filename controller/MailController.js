const nodemailer = require("nodemailer");
const User = require("../models/userModels");

module.exports.sendEmail = async (req,res,next) => {
    try {
        const {email} = req.body;
        const emailCheck = await User.findOne({email});
        if (!emailCheck) {
            return res.json({msg:"Email Not Registered !!",status:false});
        }
        const otp = `${Math.floor(1000+(Math.random()*9000))}`
        let testAccount = await nodemailer.createTestAccount();
        //we have to set smtp while deploying.
        let transporter = await nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            auth: {
                user:"joana38@ethereal.email",
                pass:"1XGtZ2wq1hhjny9yXM",
            // user: "distributedlearningms@gmail.com", // generated ethereal user
            // pass: "$iddharth", // generated ethereal password
            },
        });
        let info  = await transporter.sendMail({
            from:"distributedlearningms@gmail.com",
            to:email,
            subject:'Verification email',
            html:`<p>Your otp is <b>${otp}</b></p>.Please do not share with anyone.`,
        });
        console.log("Message sent: %s", info.messageId);
        return res.json({
            otp,
        });
    } catch (e) {
        next(e);
    }
}