var express = require('express');
var router = express.Router();

// var checkLogin = require('../middleware/check').checkLogin;

router.get('/', function(req, res, next) {
    res.render('index');
});

module.exports = router;