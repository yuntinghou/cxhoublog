var express = require('express');
var router = express.Router();
var PostModel = require('../models/posts');

// var checkLogin = require('../middleware/check').checkLogin;

router.get('/', function(req, res, next) {
    PostModel.getPosts()
        .then(function(posts) {
            res.render('index', {
                posts: posts
            })
        })
        .catch(next);
});
router.get('/add', function(req, res, next) {
    PostModel.create({
        title: 'Oye, 我是神经病',
        subtitle: '说是不是你干的？',
        author: '王屎瓢',
        content: '小龙人！！！'
    }).catch(next);
    res.redirect('back')
});

module.exports = router;