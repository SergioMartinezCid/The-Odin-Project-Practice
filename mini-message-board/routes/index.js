var express = require('express');
var router = express.Router();

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Mini Messageboard', messages: messages });
});

router.get('/new', (req, res, next) => {
  res.render('form', { title: 'Insert a new message' });
});

router.post('/new', (req, res, next) => {
  if (req.body.message !== "" && req.body.author !== ""){
    messages.push({text: req.body.message, user: req.body.author, added: new Date()});
    res.redirect('/');
  }
});

module.exports = router;
