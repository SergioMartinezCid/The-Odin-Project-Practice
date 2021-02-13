var express = require('express');
var router = express.Router();

router.get('/private', (req, res, next) => {
    res.send('Private Placeholder');
});

module.exports = router;