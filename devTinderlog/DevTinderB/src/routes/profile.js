const express=require("express");
const profileRouter=express.Router();
const {userAuth}=require("../middlewares/auth.js");
const User=require("../models/user.js");
const{validateEditProfileData, validateProfilePassword}=require("../utils/validation.js");
const bcrypt=require("bcrypt");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// 🧩 Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // unique file name
  },
});

const upload = multer({ storage });


profileRouter.get("/profile/view",userAuth, async (req, res) => {
    try{
       const user=req.user;
       
       res.send(user);
    }
     catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
});
profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
    try{
        if(!validateEditProfileData(req)){
            throw new Error("Invalid data");
        }
     const newData=req.user;
        const fieldsToUpdate = Object.keys(req.body);
        fieldsToUpdate.forEach((field) => {
                newData[field] = req.body[field];
        });
        
       await newData.save();
      res.json({
        message:`${newData.firstName} ${newData.lastName} your profile updated successfully`,
        data: newData,
      });
    }catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
 });
profileRouter.patch("/profile/password",userAuth,async(req,res)=>{
    try{
        if(!validateProfilePassword(req)){
          throw new Error("Fill all fields");
        }
       const { password, newPassword, confirmPassword } = req.body;
        if(password===newPassword || password===confirmPassword || newPassword!==confirmPassword){
            throw new Error("Invalid password");
        }
        const user=req.user;
        const match=await user.comparePassword(password,user.password);
        if(!match){
            throw new Error("password can't be changed");
        }
        if (newPassword === confirmPassword) {
  const newPasshash = await bcrypt.hash(newPassword, 10);
  user.password = newPasshash;
  await user.save();
  return res.status(200).json({ message: 'Password updated successfully' });
   } else {
  return res.status(400).json({ message: 'New and confirm passwords do not match' });
   }

       
    }catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
});
profileRouter.patch("/profile/photo", userAuth, upload.single("photo"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No photo uploaded" });
    }

    const user = req.user;

    // 🔹 Delete old custom photo (if it exists and not default)
    if (user.photoId && !user.photoId.includes("freepik.com")) {
      const oldImagePath = path.join(__dirname, "../uploads", path.basename(user.photoId));
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    // 🔹 Generate new photo URL
    const photoUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    // 🔹 Update user and save
    user.photoId = photoUrl;
    await user.save();

    res.status(200).json({
      message: "Profile photo updated successfully",
      photoUrl,
    });
  } catch (err) {
    console.error("❌ Error updating photo:", err);
    res.status(500).json({
      message: "Error updating profile photo",
      error: err.message,
    });
  }
});




module.exports=profileRouter;

