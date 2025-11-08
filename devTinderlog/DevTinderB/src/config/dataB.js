const mongoose = require("mongoose");
const connectdb=async () =>{
    await mongoose.connect("mongodblink");
};

module.exports = connectdb;
