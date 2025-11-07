const express=require("express");
const userRouter=express.Router();
const {userAuth}=require("../middlewares/auth.js");
const sendConnectionRequest = require("../models/connection.js");
const User=require("../models/user.js");
const USER_SAFE_DATA="firstName lastName about age gender skill photoId"

userRouter.get("/user/requests/received",userAuth,async(req,res)=>{
    try{
        const loggedIn=req.user;
        const requests=await sendConnectionRequest.find({
           toUserId:loggedIn._id,
           status:"interested",
        }).populate("fromUserId" ,['firstName', 'lastName']);
        
        res.json({
            message:"Connection requests fetched successfully",
            data:requests
        });



    }catch(err){
        res.status(400).send("ERROR:" +err.message);
    }
});
userRouter.get("/user/connections",userAuth,async(req,res)=>{
try{
    const loggedIn=req.user;
    const connectionRequests=await sendConnectionRequest.find({
        $or: [
            { fromUserId: loggedIn._id, status: "accepted" },
            { toUserId: loggedIn._id, status: "accepted" }
        ]
    }).populate("fromUserId", ['firstName', 'lastName','about','photoId'])
      .populate("toUserId", ['firstName', 'lastName','about','photoId']);
      const data = connectionRequests.map((row) => {
        if(row.fromUserId._id.toString()=== loggedIn._id.toString()){//tostring() is used to compare ObjectId
            // If the logged-in user is the sender, return the receiver's ID
           return row.toUserId;
        }else{
            return row.fromUserId;
        }
    });

    res.json({connectionRequests:data});

}catch(err){
    res.status(400).send("ERROR:"+err.message);
}
});
userRouter.get("/feed",userAuth,async(req,res)=>{
    res.setHeader("Cache-Control", "no-store");
    try{
        const loggedIn=req.user;

     const page=parseInt(req.params.page) ||1;
     const limit=parseInt(req.params.limit) ||10;
     const skip=(page-1)*limit;


       const connectionRequests=await sendConnectionRequest.find({
        $or:[{
            fromUserId:loggedIn._id},
            {toUserId:loggedIn._id
        }],
       }).select("fromUserId toUserId");

    
       const hideUsersFromFeed= new Set();
       connectionRequests.forEach((req)=>{
        hideUsersFromFeed.add(req.fromUserId.toString());
        hideUsersFromFeed.add(req.toUserId.toString());
       });
       const users=await User.find({
        $and:[
            {_id: {$nin:Array.from(hideUsersFromFeed)}},
            {_id: {$ne: loggedIn._id}},
        ],
       }).select(USER_SAFE_DATA).skip().limit(limit);
     res.send(users);




    }catch(err){
        res.status(400).json({message : err.message});
    }
});
module.exports = userRouter;