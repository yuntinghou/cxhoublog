module.exports = function(app) {
    app.get('/', function(req, res) {
        res.redirect('/posts');
    });
    app.use('/posts', require('./posts'));
    app.use('/about', require('./about'));
    app.use('/contact', require('./contact'));
    app.use('/sample', require('./sample'));
};