function getField(field, req) {
    var data = req.body;
    return data[field];
}

exports.required = function(field) {
    return function(req, res, next) {
        if (getField(field, req)) {
            next();
        } else {
            res.message(field + ' is required', 'danger', req);
            res.redirect('back');
        }
    }
}
exports.lengthAbove = function(field, len) {
    return function(req, res, next) {
        if (getField(field, req).length > len) {
            next();
        } else {
            res.message(`${field} must have more than ${len} characters`, 'danger', req);
            res.redirect('back');
        }
    }
}