const mongoose = require("mongoose");
const connectdb=async () =>{
    await mongoose.connect("mongodb+srv://devTinder_db:admin@devtinder.umrumoo.mongodb.net/");
};

module.exports = connectdb;