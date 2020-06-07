var express = require('express');
var app = express();
var User = require('./models/users');
var bodyParser = require('body-parser');
var getNotification=require('./controllers/getNotifications');
var schedules=require('./controllers/scheduleController')
var loginController = require('./controllers/loginController');
var cors = require('cors');
var path = require('path');

app.use('/uploads', express.static('uploads'));


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
const multer = require('multer');

const fileFilter = (req,file,cb)=>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png'){
        cb(null,true);
    }else{
        cb(null,false);
    }
}
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
   
  var upload = multer({ 
      storage: storage ,
      fileFilter:fileFilter
    })

    function verifyToken(req,res,next){
      const barearHeader = req.headers['authorization'];
  
      if(typeof barearHeader != 'undefined'){
  
          const barear = barearHeader.split(' ');
  
          const barearToken = barear[1];
  
          req.token = barearToken;
  
          next();
  
      }else{
          res.sendStatus(403);
      }
  }
app.post('/create',verifyToken, upload.single('image'),getNotification.newNotification);
app.post('/login',loginController.login);
app.get('/notifications',verifyToken,getNotification.getNotification);
app.get('/schedules',verifyToken,schedules.Schedules);
app.delete('/delete/:id',schedules.delete);
app.listen(8080,()=>{

    console.log("Server started listening on port 8080");
});
