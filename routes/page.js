var express = require('express');
var router = express.Router();
var PostModel = require('../models/posts');

router.get('/:pager', function(req, res, next) {
    var page = req.params.pager;
    Promise.all([PostModel.getPosts(page), PostModel.getTotalCount()])
        .then(function(result) {
            const posts = result[0];
            const maxCount = Math.ceil(result[1] / 5);
            res.render('index', {
                posts: posts,
                page: page,
                maxCount: maxCount
            })
        })
        .catch(next);
});

module.exports = router;