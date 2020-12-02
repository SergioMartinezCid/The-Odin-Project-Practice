var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    if (req.user){
        if (req.user.type == 'AUTHOR') {
            res.redirect('/author');
        } else {
            res.redirect('reader');
        }
    } else {
        res.render('login', { title: 'Login Page' });
    }
});

router.get('/posts_list', (req, res, next) => {
    res.render('post_list');
});

router.get('/posts_reader/:id', (req, res, next) => {
    res.render('post_reader');
})

module.exports = router;