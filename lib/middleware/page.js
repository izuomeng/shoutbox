module.exports = function(fn, perpage = 5) {
    return function(req, res, next) {
        var p = parseInt(req.query.page, 10),
            page = Math.max(p || 1, 1) - 1;
        fn(function(err, total) {
            if (err) {
                return next(err);
            }
            req.page = res.locals.page = {
                perpage,
                total,
                from: page * perpage,
                to: page * perpage + perpage - 1,
                count: Math.ceil(total / perpage),
                number: Math.min(page, Math.ceil(total / perpage) - 1)
            };
            next();
        });
    }
}