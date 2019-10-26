const express = require('express');
const router = express.Router();
const StoreJeans = require('../../common function/commonForPostProduct');
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


//create model of jeans
const JeansModel = mongoose.model('mensjeans', Schema);

//Get jeans
router.get('/getMensJeans', async (req, res)=>{
    const data = await JeansModel.find();
    res.send(data);
});

//Get jeans by id
router.get('/getMensJeans/:id', async (req, res)=>{
    const data = await JeansModel.findById(req.params.id);
    if(!data){
        res.status(401).send('You Are Searching For Wrong Id');
    }
    res.send(data);
});

//post Jeans

router.post('/storeJeans', upload.single('productImage'),(req ,res)=>{
    
    StoreJeans(JeansModel ,req, res);

});



module.exports = router;