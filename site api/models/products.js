const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    name : {type:String, required:true},
    price : {type:Number, required:true},
    productImage : {type:String,required:true},
    // p_size : {type:Number, required:true},
    // p_avl : {type:Boolean, required:true},
    userId: {type:String}
});

module.exports = Schema;