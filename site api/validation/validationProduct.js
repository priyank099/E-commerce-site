const Joi = require('joi');

function ValidationError(reqBody){
    const schema = Joi.object().keys({
        name : Joi.string().required(),
        productImage:Joi.string().required(),
        price : Joi.number().required(),
        // p_size : Joi.number().required(),
        // p_avl : Joi.boolean().required(),
        userId:Joi.string()
    });
    return Joi.validate(reqBody , schema);
}

module.exports = ValidationError;