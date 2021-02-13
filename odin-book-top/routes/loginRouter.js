const express = require('express');
const router  = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
var user_controller = require('../controller/userController');

// POST login
router.post('/', function(req, res, next){
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'Something is not right',
                user: user
            });
        }
        req.login(user, { session: false }, (err) => {
            if (err) {
                res.send(err);
            }
            // generate a signed son web token with the contents of user object and return it in the response           
            const token = jwt.sign(user, 'your_jwt_secret');
            return res.json({ userType: user.type, userId: user.id, username: user.username, token });
        });
    })(req, res);

});

// POST request for creating User.
router.post('/', user_controller.user_create);


module.exports = router;