var redis = require('redis'),
    db = redis.createClient();

class Entry {
    constructor(obj) {
        for (var i in obj) {
            this[i] = obj[i];
        }
    }
    save(fn) {
        var entryJSON = JSON.stringify(this);
        db.lpush('entries', entryJSON, (err) => {
            if (err) {
                return fn(err);
            }
            fn();
        });
    }
    static getRange(from, to, fn) {
        db.lrange('entries', from, to, (err, items) => {
            if (err) {
                fn(err);
            }
            var entries = [];
            items.forEach((v) => {
                entries.push(JSON.parse(v));
            })
            fn(null, entries);
        })
    }
}

module.exports = Entry;