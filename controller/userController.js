const User = require("../models/userModels");
const bcrypt = require("bcrypt");

module.exports.register = async (req,res,next) => {
    try {
        const {username,email,password} = req.body;
        const usernameCheck = await User.findOne({username});
        if (usernameCheck) {
            return res.json({msg:"Username already exists !!",status:false});
        }
        const emailCheck = await User.findOne({email});
        if (emailCheck) {
            return res.json({msg:"Email Registered !!",status:false});
        }
        const hashedPass = await bcrypt.hash(password,10);
        const user = await User.create({
            username,email,password:hashedPass
        });
        delete user.password;
        return res.json({status:true,user});
    } catch (e) {
        next(e);
    }
};

module.exports.login = async (req,res,next) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});
        if (!user) {
            return res.json({msg : "Incorrect username or password !!",status : false});
        }
        const isPassValid = await bcrypt.compare(password, user.password);
        if (!isPassValid) {
            return res.json({msg : "Incorrect username or password !!",status : false});
        }
        delete user.password;
        return res.json({status:true,user});
    } catch (e) {
        next(e);
    }
};

module.exports.getUser = async (req,res,next) =>{
    try {
        const userId = req.params.id;
        const user = await User.findById(userId).select([
            "email","username","AvatarImage","_id"
        ]);
        return res.json(user);
    } catch (e) {
        next(e);
    }
}
module.exports.getUserName = async (req,res,next) =>{
    try {
        const username = req.params.username;
        const user = await User.findOne({username}).select([
            "email","username","AvatarImage","_id"
        ]);
        return res.json(user);
    } catch (e) {
        next(e);
    }
}

module.exports.setAvatar = async (req,res,next) =>{
    try {
        const userId = req.params.id;
        const avatarImage = req.body.image;
        const userData = await User.findByIdAndUpdate(userId,{
            isAvatarImageSet:true,
            AvatarImage:avatarImage,
        });
        return res.json({
            isSet:userData.isAvatarImageSet,
            image:userData.AvatarImage,
        });
    } catch (e) {
        next(e);
    }
}

module.exports.changePass = async(req,res,next)=>{
    try {
        const {gmail,password} = req.body;
        const emailCheck = await User.findOne({gmail});
        if (!emailCheck) {
            return res.json({msg:"Email Not Registered !!",status:false});
        }
        const hashedPass = await bcrypt.hash(password,10);
        let changed = await User.findOneAndUpdate(gmail,{password:hashedPass},{new:true});
        return res.json({message:"Password changed !!",status:true});
    } catch (e) {
        next(e);
    }
}