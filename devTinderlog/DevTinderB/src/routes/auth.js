const express=require("express");
const authRouter=express.Router();
const {validationSignUpData}=require("../utils/validation.js");
const bcrypt=require("bcrypt");
const User=require('../models/user.js');
const jwt=require("jsonwebtoken");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const nodemailer=require("nodemailer");
authRouter.post("/signup", upload.single("photo"),async(req,res)=>{
    try{
         //1validate the request body
    validationSignUpData(req);
    const { firstName, lastName, email, password, age, gender, skill, about } = req.body;
    const photoId = req.file ? req.file.filename : null;
        const passhash = await bcrypt.hash(password, 10);
    //3create a new user instance
       const user=new User({
        firstName,
        lastName,
        email,
        password: passhash,
        age,
        gender,
        skill,
        about,
        photoId,

    });
//     // Save the user to the database
    await user.save();
   res.send("User created successfully");
    }catch(err){
         console.error("Signup error:", err.message); 
        res.status(400).json({ message: err.message });
    }
});


authRouter.post("/login",async(req,res)=>{
    //const { email, password } = req.body;
    try {
        const { email, password } = req.body;
       
        // Check if the user exists
        const user = await User.findOne({ email:email });
        if (!user) {
            return res.status(404).send("User not found");
        }
        // Compare the provided password with the stored hashed password
      
        const isMatch = await user.comparePassword(password);
        // If the passwords match, generate a JWT token
        if(isMatch){
           //jwt token generation can be added here
           const token=await jwt.sign({ _id: user._id }, "secretKey1111", { expiresIn: "1h" });;
           // Set the token in the response cookie
           res.cookie("token",token);

         res.send(user);
        }
       else{
            return res.status(401).send("Invalid credentials");
        }
    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
});
authRouter.post("/logout",async(req,res)=>{
    try{
      res.clearCookie("token");
      res.send("Logout successful");
    }catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
})
authRouter.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found with this email." });

    const token = crypto.randomBytes(32).toString("hex");
    user.resetToken = token;
    user.resetTokenExpire = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetLink = `http://localhost:5173/reset-password/${token}`; // frontend link

    // Send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "your-email@gmail.com",
        pass: "your-app-password",
      },
    });

    await transporter.sendMail({
      to: email,
      subject: "Password Reset Request",
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
    });

    res.json({ message: "Reset link sent to your email!" });
  } catch (err) {
    res.status(500).json({ message: "Error sending reset email." });
  }
});
module.exports=authRouter;