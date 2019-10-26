const validateError = require('../validation/validationProduct');
let imgport = 'http://localhost:3000';

async function PostProductData(Model,req, res){
     const result = validateError(req.body);
     if(result.error){
        return res.status(403).send(result.error.details[0].message);
     }
    const data = new Model({
        name : req.body.name,
        price : req.body.price,
        productImage: imgport+'/uploads/'+req.file.filename,
        // p_size : req.body.p_size,
        // p_avl : req.body.p_avl
    });
    const item = await data.save();
    res.send(item);

}

module.exports = PostProductData;