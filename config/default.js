module.exports = {
    port: 3000,
    session : {
        secret: 'cxhou',
        key: 'cxhou',
        maxAge: 1000 * 60 * 60 * 24 * 30
    },
    mongodb : "mongodb://192.168.1.174:27017/cxhou"
};
