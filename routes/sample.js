var express = require('express');
var router = express.Router();
var PostModel = require('../models/posts');

router.get('/', function(req, res, next) {
    res.render('create');
});


module.exports = router;