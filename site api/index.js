const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const os = require('os');
const cluster = require('cluster');

mongoose.connect('mongodb://localhost:27017/EcomDb', { useNewUrlParser: true })
.then(()=> console.log('Connection successful'))
.catch(error => console.log('Something went wrong', error));

app.use('/',(req,res,next)=>{
  console.log(req.url);
  next();
})

var myfunction = function(req, res, next){
  console.log(req.protocol + '://' + req.get('host') + req.originalUrl);
  next();
}
app.use(myfunction);
const register = require('./routes/user/userRegister');
const login = require('./routes/user/userLogin');
const tshirts = require('./routes/mens fashion/tshirts');
const jeans = require('./routes/mens fashion/jeans');
const cartItem =require('./routes/productCart');

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

//routes which should handle requests
app.use('/api/onlineshopping', tshirts );
app.use('/api/onlineshopping', jeans );
app.use('/api/onlineshopping', login);
app.use('/api/onlineshopping', register);
app.use('/api/onlineshopping/',cartItem);
// app.use((req, res, next) => {
//     const error = new Error("Not found");
//     error.status = 404;
//     next(error);
//   });
  
//   app.use((error, req, res, next) => {
//     res.status(error.status || 500);
//     res.json({
//       error: {
//         message: error.message
//       }
//     });
//   });
if(cluster.isMaster){
  const cpun = os.cpus().length;
  for(let i=0; i<cpun ; i++){
      cluster.fork();
  }
}else{
  const pid = process.pid;    
  app.listen(3000,()=>{
      console.log(`process pid: ${pid} listening on 3000`);
  });   
}