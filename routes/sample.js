var express = require('express');
var router = express.Router();
var PostModel = require('../models/posts');

router.get('/', function(req, res, next) {
    res.render('create');
});

router.post('/', function(req, res, next) {
    const title = req.fields.title;
    const subtitle = req.fields.subtitle;
    const author = req.fields.author;
    const content = req.fields.content;

    try {
        if (!title.length) {
            throw new Error("Please write the tilte");
        }
        if (!content.length) {
            throw new Error("Please write the content");
        }
    } catch(e) {
        res.redirect('back');
    }
    var post = {
        author: author,
        subtitle: subtitle,
        title: title,
        content: content
    };
    PostModel.create(post)
        .then(function(result) {
            post = result.ops[0];
            res.redirect('/posts/' + post._id);
        })
        .catch(next);
});


module.exports = router;