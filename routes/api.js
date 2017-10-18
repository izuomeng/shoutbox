var express = require('express');
var router = express.Router();
var User = require('../lib/user');
var basicAuth = require('basic-auth');

router.use(function(req, res, next) {
    var user = basicAuth(req);
    if (!user) {
        return res.sendStatus(401);
    }
    User.authenticate(user.name, user.pass, function(err, user) {
        if (err) {
            return next(err);
        }
        if (user) {
            return next();
        } else {
            return res.sendStatus(401);
        }
    });
});
router.get('/user/:id', function(req, res, next) {
    User.get(req.params.id, function(err, user) {
        if (err) {
            return next(err);
        }
        if (!user.id) {
            return res.sendStatus(404);
        }
        res.json(user);
    });
});
router.get('/entries/:page', function(req, res, next) {

});
router.post('/entry', function(req, res, next) {

});
module.exports = router;