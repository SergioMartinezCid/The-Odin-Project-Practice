var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    res.render('login', { title: 'Login Page' });
});

router.get('/posts_list', (req, res, next) => {
    res.render('post_list');
});

module.exports = router;