var express = require('express');
var router = express.Router();
var user_controller = require('../controller/userController');

/// USER ROUTES ///

// GET request for list of all User items.
router.get('/', user_controller.user_list);

// POST request for creating User is located in loginRouter

// GET request for one User.
router.get('/:id', user_controller.user_detail);

// PUT request for one User.
router.put('/:id', user_controller.user_update);

// DELETE request for one User.
router.delete('/:id', user_controller.user_delete);

module.exports = router;
