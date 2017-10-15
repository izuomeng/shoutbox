var redis = require('redis'),
    bcrypt = require('bcrypt'),
    db = redis.createClient();

class User {
    constructor(obj) {
        for (var i in obj) {
            this[i] = obj[i];
        }
    }
    save(fn) {
        if (this.id) {
            this.update(fn);
        } else {
            db.incr('user:ids', (err, id) => {
                if (err) {
                    return fn(err);
                }
                this.id = id;
                this.hashPassword((err) => {
                    if (err) {
                        return fn(err);
                    }
                    this.update(fn);
                })
            });

        }
    }
    update(fn) {
        var id = this.id;
        db.set(`user:id:${this.name}`, id, (err) => {
            if (err) {
                return fn(err);
            }
            db.hmset(`user:${id}`, user, (err) => {
                fn(err);
            });
        })
    }
    hashPassword(fn) {
        bcrypt.genSalt(12, (err, salt) => {
            if (err) {
                return fn(err);
            }
            this.salt = salt;
            bcrypt.hash(this.pass, salt, (err, hash) => {
                if (err) {
                    return fn(err);
                }
                this.pass = hash
                fn();
            });
        });
    }
}