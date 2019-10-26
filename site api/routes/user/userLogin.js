const express = require('express');
const router = express.Router();
const LoginModel = require('../../models/user');
const bcrypt = require('bcryptjs');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const path = require('path');

router.use(express.static('/public'))
//Api for Login Authentication



router.post('/auth', async (req, res)=>{
//validate data of reqBody
const result = ValidationError(req.body);
if(result.error){
    return res.status(403).send(result.error.details[0].message);
}

try{
    //Email availability
    const user = await LoginModel.findOne({email:req.body.email});
if(!user){
     res.status(401).send({message:'Invalid Emailid try Again'});
//    return res.sendFile('/public/error.html',{root:__dirname});
}
//Password check
const checkPassword = await bcrypt.compare(req.body.password,user.password);
if(!checkPassword){
    res.status(401).send({message:'Password is incorrect try again'});
}
const token = jwt.sign({_id: user._id, email: user.email}, 'JWTPRIVATEKEY');

res.header('token',token).send({
    message:'Welcome to iDeators',
    token:token,
    userId:user._id
});

}
catch(e){console.log(e)}

});

router.get('/getuser/:id',async (req,res)=>{
    const data = await LoginModel.findById(req.params.id);
    res.send(data);
});
router.get('/getuser',async (req,res)=>{
    const data = await LoginModel.find();
    res.send(data);
});

//Validation of data comming from frontend
function ValidationError(reqBody){
    const schema = Joi.object().keys({
        email : Joi.string().required().email(),
        password:Joi.string().required()
    });
    return Joi.validate(reqBody, schema);
}

module.exports = router;