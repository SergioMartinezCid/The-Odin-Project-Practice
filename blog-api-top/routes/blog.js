var express = require('express');
var router = express.Router();

// Require controller modules.
var user_controller = require('../controller/userController');
var post_controller = require('../controller/postController');
var comment_controller = require('../controller/commentController');

/// USER ROUTES ///

// GET request for list of all User items.
router.get('/users', user_controller.user_list);

// POST request for creating User.
router.post('/users', user_controller.user_create);

// GET request for one User.
router.get('/users/:id', user_controller.user_detail);

// GET request for one User.
router.put('/users/:id', user_controller.user_update);

// GET request for one User.
router.delete('/users/:id', user_controller.user_delete);

/// POST ROUTES ///

// GET request for list of all Post items.
router.get('/posts', post_controller.post_list);

// POST request for creating Post.
router.post('/posts', post_controller.post_create);

// GET request for one Post.
router.get('/posts/:id', post_controller.post_detail);

// GET request for one Post.
router.put('/posts/:id', post_controller.post_update);

// GET request for one Post.
router.delete('/posts/:id', post_controller.post_delete);

/// COMMENT ROUTES ///

// GET request for list of all Comment items.
router.get('/comments', comment_controller.comment_list);

// POST request for creating Post.
router.post('/comments', comment_controller.comment_create);

// GET request for one Post.
router.get('/comments/:id', comment_controller.comment_detail);

// GET request for one Post.
router.put('/comments/:id', comment_controller.comment_update);

// GET request for one Post.
router.delete('/comments/:id', comment_controller.comment_delete);

module.exports = router;
