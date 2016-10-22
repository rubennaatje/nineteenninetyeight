var express = require('express');
var router = express.Router();
var glitch = require('../models/glitch.js');
var db = require('../models/database.js');
var socket_io    = require( "socket.io" );
var io           = socket_io();

/* GET home page. */
router.get('/new/:filename', function(req, res, next) {
    glitch.newGlitch(req.params.filename,function(err,callback){
       if(err){res.render('error',{message:'fuck something went wrong',error: err});}
        else  res.render('index', { output: 'xd.jpg' });
    });

});
router.get('/prev',function (req,res) {
    glitch.getAllGlitches(function(err,callback){
        if(err){res.render('error');}
        else  res.render('gallery',{rows : callback.rows});
    });
});
router.get('/', function(req, res, next) {
    res.render('index', { output: 'xd.jpg' });
});

module.exports = router;
