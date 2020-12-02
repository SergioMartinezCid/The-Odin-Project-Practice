
var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    res.render('author_homepage', { username: 'TODO fix name' });
});

router.get('/new_post', (req, res, next) => {
    res.render('create_post', { username: 'TODO fix name' });
});

module.exports = router;