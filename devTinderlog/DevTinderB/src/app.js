const express= require('express');
const connectdb = require('./config/dataB.js'); 
const app = express();
const cookieParser=require("cookie-parser");
const authRouter=require("./routes/auth.js");
const profileRouter=require("./routes/profile.js");
const requestRouter=require("./routes/request.js");
const userRouter=require("./routes/user.js");
const cors=require("cors");

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json()); // Middleware to parse JSON 
app.use(cookieParser()); // Middleware to parse cookiess
const path = require("path");

// Serve uploaded files publicly
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);





   
connectdb()
    .then(() => {
    console.log("connection established");
    app.listen(3000, () => {
    console.log("Server is running on port 3000");
 });
})
.catch((err)=>{
    console.error("Connection failed");
});
