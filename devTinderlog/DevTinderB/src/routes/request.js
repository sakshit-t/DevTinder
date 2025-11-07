const express= require("express");
const requestRouter=express.Router();

const {userAuth}=require("../middlewares/auth.js");
const SendConnectionRequest=require("../models/connection.js");


requestRouter.post("/request/send/:status/:toUserId",userAuth,async(req,res)=>{
   try{
   const fromUserId=req.user._id;
   const toUserId=req.params.toUserId;
   const status=req.params.status;
   const validStatuses=["interested","ignored"];
   if(!validStatuses.includes(status)){
      return res.status(400).json({
         message:"Invalid status provided. Use 'interested' or 'ignored'."
      });
   }
   const existingRequest=await SendConnectionRequest.findOne({
    $or : [
      { fromUserId,
      toUserId,
   },{fromUserId: fromUserId, toUserId: toUserId},
    ],
   });
   if(existingRequest){
      return res.status(400).json({
         message:"Connection request already exists between these users."
      });
   }
   const connectionRequest=new SendConnectionRequest({
      fromUserId,
      toUserId, 
        status});
  const data=await connectionRequest.save();
  res.json({
  message: `Connection request ${status} successfully`,
  data,
});

   }catch(err){
         res.status(400).send("ERROR:" +err.message);
   }
});


requestRouter.post("/request/review/:status/:requestId",userAuth,async(req,res)=>{
    try{
      const loggedInUserId=req.user;
   const requestId=req.params.requestId;
   const status=req.params.status;
   const validStatuses=["accepted","rejected"];
   if(!validStatuses.includes(status)){
       return res.status(400).json({
         message:"Invalid status provided. Use 'accepted' or 'rejected'."
      });
   }
   const connectionRequest=await SendConnectionRequest.findOne({
      _id:requestId,
      toUserId:loggedInUserId._id,
      status:"interested"
   });
   if(!connectionRequest){
      return res.status(404).json({
         message:"Connection request not found or already processed."
      });
   }
   connectionRequest.status=status;
   const data=await connectionRequest.save();
   res.json({
      message:`Connection request updated to ${status} successfully`,
      data, 
   });
   }catch(err){
           res.status(400).send("ERROR:" +err.message);
   }
});

module.exports=requestRouter;
