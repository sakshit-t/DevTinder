const validator = require("validator");
const authRouter=require("../routes/auth.js");

const validationSignUpData = (req) =>{
    const { firstName, lastName, email, password ,age,gender,about,skill} = req.body;
   if (!firstName || !lastName || !email || !password || !age || !gender || !about || !skill) {
    throw new Error("All fields are required");
  } else if (!validator.isEmail(email)) {
    throw new Error("Invalid email format");
  } else if (!validator.isStrongPassword(password, {
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    })
  ) {
    throw new Error(
      "Password must be at least 6 characters long and contain at least one lowercase letter, one uppercase letter, and one number"
    );
  }
};


const validateEditProfileData=(req)=>{
    const allowedFields=["firstName",'lastName','age','gender','photoId','about','skill'];
    const fieldsUpdate=Object.keys(req.body);
   const isValid = fieldsUpdate.every((key) => allowedFields.includes(key));
    return isValid;
    };

// const validateEditProfileData = (req) => {
//   const allowedFields = ["firstName","lastName","age","gender","photoId","about","skill"];
//   const fieldsUpdate = Object.keys(req.body);
//   const isValid = fieldsUpdate.every((key) => allowedFields.includes(key));

//   if (!isValid) {
//     console.log("❌ Invalid keys found:", fieldsUpdate.filter(k => !allowedFields.includes(k)));
//   } else {
//     console.log("✅ All keys valid:", fieldsUpdate);
//   }

//   return isValid;
// };

const validateProfilePassword=(req)=>{
    const {password,newPassword,confirmPassword}= req.body;
    if(req.body.password===""||req.body.newPassword===""||req.body.confirmPassword===""){
      return false;
    };
    return true;
} ;  


module.exports={validationSignUpData,validateEditProfileData,validateProfilePassword};
