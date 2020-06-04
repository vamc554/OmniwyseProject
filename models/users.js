const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db=require('../db.js');

var user = new Schema({

    name:String,
    email: String,
    mobile_number:Number,
    isAdmin: Boolean,
    password: String,
    tags:[{type:String}]
 
});
module.exports = mongoose.model('User',user);

