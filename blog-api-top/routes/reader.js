
var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    res.render('login', { title: 'Login Page' });
});

module.exports = router;