import express from 'express'
import {User} from '../models'
import Crypto from '../utils/crypto'
var router = express.Router();

function authenticate(account, next, callback) {
    User.findOne(account, (err, user)=> {
        if (err) return next(err);
        callback(err, user);
    });
}

router.get('/', (res, req)=> {
    var user = req.session.user;
    res.json(user)
});

router.post('/login', (res, req, next)=> {
    var account = {
        username: req.body.username,
        password: Crypto.hashCrypto(req.body.password)
    };
    authenticate(account, next, (err, user)=> {
        if (user) {
            req.session.user = user;
        }
        res.json(user);
    });
});

router.post('/register', (res, req, next)=> {
    var account = {
        username: req.body.username,
        password: Crypto.hashCrypto(req.body.password)
    };
    User.create(account, (err, count)=> {
        if (err) return next(err);
        authenticate(account, next, (autherror, user)=> {
            if (user) {
                req.session.user = user;
            }
            res.json(user);
        });
    });
});

router.get('/logout', (res, req)=> {
    req.session.user = null;
    res.json({
        success: true
    });
});


module.exports = router