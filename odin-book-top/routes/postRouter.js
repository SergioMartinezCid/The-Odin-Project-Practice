var express = require('express');
var router = express.Router();
var post_controller = require('../controller/postController');

/// POST ROUTES ///

// GET request for list of all Post items.
router.get('/', post_controller.post_list);

// POST request for creating Post.
router.post('/', post_controller.post_create);

// GET request for one Post.
router.get('/:id', post_controller.post_detail);

// PUT request for one Post.
router.put('/:id', post_controller.post_update);

// DELETE request for one Post.
router.delete('/:id', post_controller.post_delete);

module.exports = router;
