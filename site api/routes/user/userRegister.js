const express = require('express');
const router = express.Router();
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const UserModel = require('../../models/user');

//Api for Post 
router.post('/register',async (req, res)=>{
    console.log('Register')
    const result = ValidationError(req.body);
    if(result.error){
        return res.status(403).send(result.error.details[0].message);
    }
    //Check Duplicate Date
    const checkEmail = await UserModel.findOne({email:req.body.email});
    if(checkEmail){
       return res.status(401).send({message:'User Already Exists'});
    }
    try{
        const data = new UserModel({
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            email : req.body.email,
            password : req.body.password,
        });
        const crypt = await bcrypt.genSalt(10);
        data.password = await bcrypt.hash(data.password,crypt);
    
        const resonse =await data.save();
        res.send(resonse);

    }
    catch(e){console.log(e)};

});




//Validation for data coming From request 
function ValidationError(reqBody){
    const schema = Joi.object().keys({
        firstname : Joi.string().min(4).max(80),
        lastname : Joi.string().min(4).max(80),
        // username : Joi.string().min(4).max(80),
        email : Joi.string().required().email(),
        password:Joi.string().required(),
        // phone : Joi.number().required(),
        // dob : Joi.date()
    });
    return Joi.validate(reqBody, schema);
}

module.exports = router;