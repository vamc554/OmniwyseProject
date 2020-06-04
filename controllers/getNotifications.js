var db=require('../db.js');
var express = require('express');
var jwt=require('jsonwebtoken');
var cron = require("node-cron");
var notification=require('../models/notification');
var userdetails=require('./loginController');
var app=express();
exports.newNotification = (req,res)=>{
    jwt.verify(req.token,'secretkey',(err,userdata)=>{
        if(err){
            res.sendStatus(403);
            console.log(err);
        }
        else{
    var imageurl;
    var date;
   // var tag=JSON.parse(req.body.tags);
    if(req.file){
        var image = req.file.path;
        var url = image.split('\\');
        console.log(image);
         imageurl ="http://localhost:8080/" +url[1];
    }
    else{
        imageurl=null;
    }
    if(req.body.scheduledDate){
        date=req.body.scheduledDate;
    }else {
      date= Date();
    }
    var createNotification=new notification({
        title: req.body.title,
        description: req.body.description,
        link : req.body.link,
        imageURL : imageurl,
        tag : req.body.tag,
        date : date,
        isScheduled : req.body.isScheduled
    })
    createNotification.save( function(err,data){
            if(err){
                res.satus(404);
            }
            else{
               return res.send(data);
                console.log("success");
            }
       })
    }
})
 }
exports.getNotification = (req,res)=>{
    jwt.verify(req.token,'secretkey',(err,userdata)=>{
        if(err){
            res.sendStatus(403);
            console.log(err);
        }
        else{
            console.log(userdata);
            console.log(userdata.user.name);
            var tags=userdata.user.tags;
           // console.log(tags);
    var currentTime = new Date(); 
   notification.find({$and:[{$or : [{tag:'All'},{tag:{$in : tags}}]},{date : {$lte:currentTime}}]}).sort({date:-1}).exec(function(err,data){
           if(err){
               res.satus(404);
           }
           else{
              return res.send(data);
               console.log("success");
           }
        
      })
    
    
    }
})
    
} 

