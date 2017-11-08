var config = require('config-lite')(__dirname);
var Mongolass= require('mongolass');
var mongolass= new Mongolass();
mongolass.connect(config.mongodb);

var moment = require('moment');
var objectIdToTimestamp = require('objectid-to-timestamp');

mongolass.plugin('addCreatedAt', {
    afterFind: function(results) {
        results.forEach(function(result) {
            result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm');
        });
        return result;
    },
    afterFindOne: function(result) {
        if (result) {
            result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm');
        }
        return result;
    }
});

exports.Post = mongolass.model('Post', {
    title: { type : 'string' },
    subtitle: { type : 'string' },
    author: { type : 'string' },
    content: { type : 'string' }
});

exports.Post.index({_id : -1}).exec();