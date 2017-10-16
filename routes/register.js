var express = require('express');
var router = express.Router();
var User = require('../lib/user');

/* GET home page. */
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Register' });
});
router.post('/register', function(req, res, next) {
    var data = {
        name: req.body.user_name,
        pass: req.body.user_pass
    }
    User.getByName(data.name, function(err, user) {
        if (err) {
            return next(err);
        }
        if (user.id) {
            res.message('Username already taken!', 'danger', req);
            res.redirect('back')
        } else {
            user = new User({
                name: data.name,
                pass: data.pass
            });
            user.save(function(err) {
                if (err) {
                    return next(err);
                }
                req.session.uid = user.id;
                res.message('Register succeed!', 'info', req);
                res.redirect('/');
            });
        }
    });
});

module.exports = router;