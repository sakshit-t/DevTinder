const mongoose= require("mongoose");
const validator= require("validator");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 20

    },
    lastName: {
        type: String,
        
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,

        
    },
    password: {
        type: String,
        required: true,
    
    },
    age: {
        type: Number,

    },  
    gender:{
        type: String,
        validate(value){
            if(!["male","female","other"].includes(value)){
                throw new Error("Invalid gender");
        }
    }
    },
    photoId: {
        type: String,
       default:"https://www.freepik.com/free-photos-vectors/default-user",
    },
    about: {
        type: String,
        default: "No information provided",
        trim: true,
        maxlength: 500 // Limit the length of the about field
    },
    skill:{
        type:String,
        default:"No skills provided",
    },
     timestamp:{
        type: Date,
        default: Date.now
     },
    });
    userSchema.methods.getJWT=async function(){
        const user=this;
        const token=await jwt.sign({_id:user.id},secretkey1111);
        return token;
    };
    userSchema.methods.comparePassword=async function(passwordInputByUser){
        const user=this;
        const hashpass=user.password;
        const isMatch=await bcrypt.compare(passwordInputByUser,hashpass);
        return isMatch;
    };
const User = mongoose.model("User", userSchema);
module.exports = User;