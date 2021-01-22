var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    res.send('Placeholder for main page');
});

module.exports = router;