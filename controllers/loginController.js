var db=require('../db.js');
var User=require('../models/users');
var express = require('express');
var jwt=require('jsonwebtoken');
var app=express();
exports.login = (req,res)=>{
    var uname = req.body.username;
    var pass = req.body.password;

    User.findOne({email: uname,password : pass},(err,user)=>{
        if(err){
            res.status(500).send({message:"Internal Server Error"});
        }else{
            if(user){
                    jwt.sign({user},'secretkey',{expiresIn:'2h'},(err,token)=>{
                        res.send({
                            id:user._id,
                            name:user.name,
                            email:user.email,
                            isAdmin:user.isAdmin,
                            token:token
                        })
                        console.log(token);
                    })

            }else{
                res.status(404).send("User not found")
            }
           
       
    }
    });
};
