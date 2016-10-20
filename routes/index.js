var express = require('express');
var router = express.Router();
var destroy = require('../models/glitch.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { output: 'xd.jpg' });
});

module.exports = router;
