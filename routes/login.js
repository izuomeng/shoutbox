var express = require('express');
var router = express.Router();
var User = require('../lib/user');

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});
router.post('/login', function(req, res, next) {
    var data = req.body;
    User.authenticate(data.user_name, data.user_pass, function(err, user) {
        if (err) {
            return next(err);
        }
        if (user) {
            req.session.uid = user.id;
            res.redirect('/');
        } else {
            res.message('Sorry! Invalid credentials.', 'danger', req);
            res.redirect('back');
        }
    });
});

module.exports = router;