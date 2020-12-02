
var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    res.render('author_homepage');
});

router.get('/new_post', (req, res, next) => {
    res.render('create_post');
});

module.exports = router;