var express = require('express');
var router = express.Router();

router.get('/public', (req, res, next) => {
    res.send('Public Placeholder');
});

module.exports = router;