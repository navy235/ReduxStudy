import express from 'express'
const router = express.Router();

router.get('/', (res, req)=> {
    var user = req.session.user;
    res.json(user)
})

router.post('/login', (res, req)=> {

})

router.post('/register', (res, req)=> {

})

router.get('/logout', (res, req)=> {

})

export router