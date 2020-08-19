var mongoose = require('mongoose');
const { request } = require('express');

var requestcountSchema = new mongoose.Schema({
    signinreq:{
        type:Number,
        default:0
    },
    signinout:{
        type:Number,
        default:0
    },
    signinup:{
        type:Number,
        default:0
    }
})
module.exports = mongoose.model("Requestcount",requestcountSchema)