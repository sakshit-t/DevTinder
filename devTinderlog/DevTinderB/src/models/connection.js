const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
  fromUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
    // This field references the User model, indicating the user who sent the connection request
    required: true
  },
  toUserId: {
    type: mongoose.Schema.Types.ObjectId,
     ref: "User",
    required: true
  },
  status: {
    type: String,
    enum:{
         values:["ignored", "interested", "accepted", "rejected"],
         message:`{VALUES} is incorrect status`,
    },
  },
},
{
  timestamps: true}
);
//const sendConnectionRequest = mongoose.model("SendConnectionRequest", sendConnectionRequest);
userSchema.pre('save', function(next) {
  const connectionRequest = this;
  if (connectionRequest.fromUserId.equals (connectionRequest.toUserId)) {
    throw new Error("You cannot send a connection request to yourself.");
  }
  next();
});
const sendConnectionRequest = mongoose.model("SendConnectionRequest", userSchema);
module.exports = sendConnectionRequest;