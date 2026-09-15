const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const emailService = require("../services/email.service");

 function verifyOTP(email,otp){
    const storedOtp = emailService.otpStore.get(email);
    console.log("storedOtp:", storedOtp);
    console.log("providedOtp:",otp);
    if(storedOtp && storedOtp === otp){
        emailService.otpStore.delete(email);    
    }
}

const register = async (req,res)=>{
    try{
        const data = req.body;
        console.log("Registering user with data:", data);
        console.log(data);
        if(!data.fullName || !data.username || !data.email || !data.branch || !data.session || !data.password || !data.semester || !data.college){
            return res.status(400).json({message: "All fields are required!"});
        }
        const existingUser = await User.findOne({$or: [{email: data.email}, {username: data.username}]});
        if(existingUser){
            return res.status(400).json({message: "User already exists!"});
        }
        const hashedPassword = await bcrypt.hash(data.password, 10);
        if(!hashedPassword){
            return res.status(500).json({message: "Error in hashing password!"});
        }
        console.log(data.fullName);
        console.log(data.username , emai)
        const user = await User.create({
            fullName : data.fullName,
            username : data.username,
            email : data.email,
            branch : data.branch,
            session : data.session,     
            password : hashedPassword,
            semester : data.semester,
            college : data.college
        })
        console.log(user);
        if(!user){
            return res.status(500).json({message : "Error in creating user!"});
        }
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "1h"});
        res.cookie("token", token);
        return res.status(201).json({message : "User registered successfully!",token});
        await emailService.sendRegistrationEmail(user.email, user.fullName);
    }catch(err){
        console.error(err);
        return res.status(500).json({message : "Internal server error!"});
    }
}

const login = async(req,res)=>{
    try{
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json({message : "Email and password are required!"});
    }
    const user = await User.findOne({email});
    if(!user){
        return res.status(400).json({message : "User not found!"});
    }
    const isPasswordValid = await bcrypt.compare(password,user.password);
    if(!isPasswordValid){
        return res.status(400).json({message : "Invalid Password!"});
    }
    const token = jwt.sign({id: user._id},process.env.JWT_SECRET,{expiresIn: "1h"});
    res.cookie("token", token);
    return res.status(200).json({message : "User Logged in successfully!", token });
    } catch(err){
        return res.status(500).json({message : "Internal server error!",error: err.message});
    }
    
}

const logout = (req,res)=>{
    try{
        res.clearCookie("token");
        return res.status(200).json({message : "User logged out successfully!"});
    }   catch(err){
        return res.status(500).json({message : "Internal server error!",error: err.message});
    }
}

const forgotPassword = async(req,res)=>{
    try{
        const {email} = req.body;
        if(!email){
            return res.status(400).json({message : "Email is required!"});
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message : "User not found!"});
        }
        await emailService.sendPasswordResetEmail(user.email, user.fullName);
        return res.status(200).json({message : "Password reset email sent successfully!"});
    } catch(err){
        return res.status(500).json({message : "Internal server error!",error: err.message});
    }
}
const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) {
            return res.status(400).json({
                message: "Email and OTP are required!"
            });
        }
        const storedOtp = emailService.otpStore.get(email);
        console.log("Stored OTP:", storedOtp);
        console.log("Provided OTP:", otp);
        if (!storedOtp) {
            return res.status(400).json({
                message: "OTP not found or expired!"
            });
        }

        if (Number(otp) !== Number(storedOtp)) {
            return res.status(400).json({
                message: "Invalid OTP!"
            });
        }

        emailService.otpStore.delete(email);
        res.status(200).json({
            message: "OTP verified successfully!"
        });
        return res.redirect("/set-password");
        
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Internal server error!",
            error: err.message
        });
    }
};
const passwordReset = async (req, res) => {
    try{
        const {email,newPassword, confirmPassword} = req.body;
        if(!newPassword || !confirmPassword){
            return res.status(400).json({message : "New password and confirm password are required!"});
        }
        if(newPassword !== confirmPassword){
            return res.status(400).json({message : "Passwords do not match!"});
        }   
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        if(!hashedPassword){
            return res.status(500).json({message: "Error in hashing password!"});
        }
        const user = await User.findOneAndUpdate({email: email}, {password: hashedPassword});
        if(!user){
            return res.status(400).json({message : "User not found!"});
        }   
        return res.status(200).json({message : "Password reset successfully!"});
    }catch(err){    
        return res.status(500).json({message : "Internal server error!",error: err.message});
    }
};

module.exports = {
    register,
    login,
    logout,
    forgotPassword,
    verifyOtp,
    passwordReset
}