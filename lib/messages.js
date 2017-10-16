var express = require('express'),
    res = express.response;

res.message = function(msg, type, req) {
    type = type || 'info';
    var sess = req.session;
    sess.messages = sess.messages || [];
    sess.messages.push({
        type,
        string: msg
    });
} 

module.exports = function(req, res, next) {
    res.locals.messages = req.session.messages || [];
    res.locals.removeMessages = function() {
        req.session.messages = [];
    }
    next();
}