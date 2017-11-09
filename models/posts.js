var marked = require('marked');
var Post = require('../lib/mongo').Post;
Post.plugin('contentToHtml', {
    afterFind: function(posts) {
        return posts.map(function(post) {
            post.content = marked(post.content);
            return post;
        });
    },
    afterFindOne: function(post) {
        if (post) {
            return post.content = marked(post.content);
        }
        return post;
    }
});

module.exports = {
    create: function (post) {
        return Post.create(post).exec();
    },
    getPostById: function(postId) {
        return Post
            .findOne({_id : postId})
            .addCreatedAt()
            .contentToHtml()
            .exec();
    },
    getRawPostById: function(postId) {
        return Post
            .findOne({ _id : postId })
            .exec();
    },
    updatePostById: function(postId, data) {
        return Post.update({_id: postId}, {$set: data}).exec();
    },
    delPostById: function(postId) {
        return Post.remove({_id: postId})
            .exec();
    },
    getPosts: function(author) {
        var query = {};
        if (author) {
            query.author = author;
        }
        return Post
            .find(query)
            .sort({ _id : -1})
            .addCreatedAt()
            .contentToHtml()
            .exec();
    }
};