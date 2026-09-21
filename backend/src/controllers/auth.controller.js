const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
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

        if(!data.fullName || !data.username || !data.email || !data.branch || !data.session || !data.password || !data.semester || !data.college){
            return res.status(400).json({message: "All fields are required!"});
        }
        // const existingUser = await User.findOne({$or: [{email: data.email}, {username: data.username}]});

        const existingUsername = await User.findOne({username: data.username});
        if(existingUsername){
            return res.status(400).json({message: "Username already exists!"});
        }
        const existingEmail = await User.findOne({email: data.email});

        if(existingEmail){
            return res.status(400).json({message: "Email already registered!"});
        }

        const user = await User.create({
            fullName : data.fullName,
            username : data.username,
            email : data.email,
            branch : data.branch,
            session : data.session,     
            password : data.password,
            semester : data.semester,
            college : data.college
        })
        
        if(!user){
            return res.status(500).json({message : "Error in creating user!"});
        }
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "7d"});
        res.cookie("token", token);
        await emailService.sendRegistrationEmail(user.email, user.fullName);
        return res.status(201).json({message : "User registered successfully!",token});
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
    const isPasswordValid = await user.comparePassword(password);
    if(!isPasswordValid){
        return res.status(400).json({message : "Invalid Password!"});
    }
    const token = jwt.sign({id: user._id},process.env.JWT_SECRET,{expiresIn: "7d"});
    res.cookie("token", token);
    return res.status(200).json({message : "User Logged in successfully!", token });
    } catch(err){
        return res.status(500).json({message : "Internal server error!",error: err?.message || 'Internal server error!'});
    }
    
}

const logout = (req,res)=>{
    try{
        res.clearCookie("token");
        return res.status(200).json({message : "User logged out successfully!"});
    }   catch(err){
        return res.status(500).json({message : "Internal server error!",error: err?.message || 'Internal server error!'});
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
        const resetPasswordToken = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "15m"});
        const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetPasswordToken}`;

        user.resetPasswordToken = resetPasswordToken;
        user.resetPasswordTokenExp = Date.now() + 15 * 60 * 1000; // 15 minutes
        await user.save();

        await emailService.sendPasswordResetEmail(user.email, user.fullName, resetLink);
        return res.status(200).json({message : "Password reset email sent successfully!"});
    } catch(err){
        return res.status(500).json({message : "Internal server error!",error: err?.message || 'Internal server error!'});
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
            error: err?.message || 'Internal server error!'
        });
    }
};
const passwordReset = async (req, res) => {
    try{
        const { resetToken } = req.params;
        const { newPassword, newConfirmPassword } = req.body;
        if(!resetToken){
            return res.status(400).json({message : "Reset token is required!"});
        }
        if(!newPassword || !newConfirmPassword){
            return res.status(400).json({message : "New password and confirm password are required!"});
        }
        if(newPassword !== newConfirmPassword){
            return res.status(400).json({message : "Passwords do not match!"});
        }
        const decoded = jwt.verify(resetToken, process.env.JWT_SECRET);
        if(!decoded){
            return res.status(400).json({message : "Invalid reset token!"});
        }
        const user = await User.findOne({resetPasswordToken: resetToken, resetPasswordTokenExp: {$gt: Date.now()}});

        if(!user){
            return res.status(400).json({message : "Invalid or expired reset token!"});
        }
        user.password = newPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExp = undefined;
        await user.save();
        return res.status(200).json({message : "Password reset successfully!"});
    }catch(err){    
        return res.status(500).json({message : "Internal server error!",error: err?.message || 'Internal server error!'});
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