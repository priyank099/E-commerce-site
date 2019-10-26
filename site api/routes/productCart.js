const express = require('express');
const router = express.Router();
const validateError = require('../validation/validationProduct');
const Schema = require('../models/products');
const mongoose = require('mongoose');
// const StoreInCart = require('../commonFunction/commonForPostProduct');
//create model
const CartData = mongoose.model('cart', Schema);

//Get Cart Item
router.get('/getCartItem', async (req, res)=>{
    const data = await CartData.find();
    res.send(data);
});

//Get Cart by Userid
router.get('/getCartItem/:id', async (req, res)=>{
    const data = await CartData.find({userId:req.params.id});
    if(!data){
       return res.status(401).send('You Are Searching For Wrong Id');
    }
    res.send(data);
});

//post Cart

router.post('/storeCartItem',async (req ,res)=>{
    const result = validateError(req.body);
    if(result.error){
       return res.status(403).send(result.error.details[0].message);
    }
    const duplicate = await CartData.findOne({name:req.body.name , userId:req.body.userId});
    if(duplicate){
        return res.status(401).send({
            message:'This Product Already Exist In Cart'
        });
    }
    const data = new CartData({
        name : req.body.name,  
        productImage:req.body.productImage,
        price : req.body.price,
        userId : req.body.userId
    });
    const item = await data.save();
    res.send(item);
});

//Delete Cart Item
router.delete('/deleteCartItem/:id', async(req, res)=>{
    const data = await CartData.findByIdAndDelete(req.params.id);
    res.send({
        message:'Cart Item Deleted Successfully',
        text:data
    });

})


module.exports = router;