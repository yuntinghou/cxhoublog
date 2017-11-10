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
    Promise.all([PostModel.getPostById(postId)])
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

router.get('/add', function(req, res, next) {
    PostModel.create({
        title: 'Five Rams Earn ESPN Midseason All-Pro Honors',
        subtitle: 'Rams news',
        author: 'Kristen Lago',
        content: 'At the season’s midpoint, five Los Angeles players have been named to ESPN’s All-Pro Team. The team is made up of a comprehensive list of 25 NFL players who have been the best of the best at their various positions through the past nine weeks.\n' +
        '\n' +
        'On offense, running back Todd Gurley and left tackle Andrew Whitworth were both named to the All-Pro Team. While on defense, Aaron Donald was named as the starting defensive tackle.  \n' +
        '\n' +
        'Gurley, who ranks second in yards from scrimmage this season with 1,024 has been dynamic in both the passing and ground game. Overall, he has recorded a league-leading seven rushing touchdowns, while also catching 29 catches for 338 yards and three touchdowns.\n' +
        '\n' +
        'Whitworth, widely known as one of the best offensive lineman in the league, has been paramount to Gurley’s success. Not only has he helped keep quarterback Jared Goff upright, but he has also paved the way for the Rams rushing attack. '
    }).catch(next);
    res.redirect('back')
});

module.exports = router;