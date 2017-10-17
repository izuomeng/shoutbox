var express = require('express');
var router = express.Router();
var Entry = require('../lib/entry');
var validate = require('../lib/middleware/validate');
var page = require('../lib/middleware/page');

router.get('/', page(Entry.count, 1), function(req, res, next) {
    var page = req.page;
    Entry.getRange(page.from, page.to, function(err, entries) {
        if (err) {
            return next(err);
        }
        res.render('entries', {
            title: 'Entries',
            entries
        });
    });
});
router.get('/post', function(req, res) {
    res.render('post', {
        title: 'Post'
    });
});
router.post('/post', 
    validate.required('entry_title'), 
    validate.lengthAbove('entry_title', 4), 
    function(req, res, next) {
        var data = req.body,
            entry = new Entry({
                username: res.locals.user.name,
                title: data.entry_title,
                body: data.entry_body
            })
        entry.save(function(err) {
            if (err) {
                return next(err);
            }
            res.redirect('/')
        });
    }
);

module.exports = router;