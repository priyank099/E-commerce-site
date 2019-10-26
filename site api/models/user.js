const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstname : {type:String, minlength:4, maxlength:80},
    lastname : {type:String, minlength:4, maxlength:80},
    email : {type:String, unique:true , required:true},
    password : {type:String,minlength:6, required:true},
});

module.exports = mongoose.model('Euserinfo', userSchema);
