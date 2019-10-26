const express = require('express');
const router = express.Router();
const StoreTshirt = require('../../common function/commonForPostProduct');
const Schema = require('../../models/products');
const mongoose = require('mongoose');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

//create model of Tshirt
const TshirtModel = mongoose.model('menstshirt', Schema);

//Get Tshirts
router.get('/getMensTshirts', async (req, res)=>{
    const data = await TshirtModel.find();
    res.send(data);
});

//Get Tshirt by id
router.get('/getMensTshirts/:id', async (req, res)=>{
    const data = await TshirtModel.findById(req.params.id);
    if(!data){
        res.status(401).send('You Are Searching For Wrong Id');
    }
    res.send(data);
});

//post Tshirts

router.post('/storeTshirts',upload.single('productImage'), (req ,res)=>{
    
    StoreTshirt(TshirtModel ,req, res);

});



module.exports = router;