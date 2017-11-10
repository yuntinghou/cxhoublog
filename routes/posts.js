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

router.get('/:postId', function(req, res, next) {
    var postId = req.params.postId;
    Promise.all([PostModel.getRawPostById(postId)])
        .then(function(result) {
            const post = result[0];
            if (!post) {
                throw new Error("The Article is not exist.");
            }
            res.render('sample', {
                post: post
            })
        })
        .catch(next);
});


module.exports = router;