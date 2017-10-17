module.exports = function(fn, perpage = 5) {
    return function(req, res, next) {
        fn(function(err, total) {
            if (err) {
                return next(err);
            }
            var p = parseInt(req.query.page, 10),
                page = Math.max(p || 1, 1),
                count = Math.ceil(total / perpage),
                front = 2,
                end = 2;
            if (page > count) {
                page = count;
            }
            if (count >= 5) {
                switch (page) {
                    case 1:
                        end = 4;
                        break;
                    case 2:
                        end = 3;
                        break;
                    case count:
                        front = 4;
                        break;
                    case count - 1:
                        front = 3;
                        break;
                }
            } else {
                front = end = 3;
            }
            req.page = res.locals.page = {
                front,
                end,
                perpage,
                total,
                count,
                from: (page - 1) * perpage,
                to: page * perpage - 1,
                number: page - 1
            };
            next();
        });
    }
}