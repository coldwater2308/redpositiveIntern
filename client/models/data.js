const mongoose = require('mongoose');
const dataSchema = mongoose.Schema({ 

    name: {
        type : String ,
        required : true 
    },
    phone: {
        type : String ,
        required : true 
    },
    email: {
        type : String ,
        required : true 
    }, 

    hobbies: {
        type : String ,
        required : true 
    }, 
   



}, {timestamps : true});
const Data = mongoose.model("Data",dataSchema);
module.exports = Data;