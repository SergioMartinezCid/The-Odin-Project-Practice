const db = require('../model/index');
const { body, validationResult } = require('express-validator');

// GET request for list of all User items.
exports.post_list = async function (req, res) {
    const list_posts = await db.Post.findAll({
        attributes: ['id'],
        order: [['id', 'ASC']],
        raw: true
    });
    res.json(list_posts);
};

// POST request for creating User.
exports.post_create = [
    body('content', 'Content must not be empty').trim().isLength({ min: 1 }).escape(),

    async (req, res) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.sendStatus(400);
            return;
        }
        else {
            // Data from form is valid. Save user
            try {
                await db.Post.create({
                    content: req.body.content,
                    UserId: req.user.id
                });
                res.sendStatus(200);
                return;
            } catch (err) {
                res.sendStatus(500);
                return;
            }
        }
    }
];

// GET request for one User.
exports.post_detail = async function (req, res, next) {
    try {
        const post = await db.Post.findOne({
            attributes: ['id', 'content'],
            include: [{
                model: db.User,
                attributes: ['id']
            }],
            where: {
                id: parseInt(req.params.id)
            },
            raw: true,
            nest: true
        });
        res.json(post);
    } catch (err) {
        res.sendStatus(400);
        return;
    }
};

// PUT request for one User.
exports.post_update = [
    body('content', 'Content must not be empty').trim().isLength({ min: 1 }).escape(),


    async (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.sendStatus(400);
            return;
        }
        let post;
        try {
            post = await db.Post.findOne({
                attributes: ['id'],
                where: {
                    id: parseInt(req.params.id)
                }
            });
        } catch (err) {
            res.sendStatus(400);
            return;
        }

        if (req.user.id !== parseInt(post.User.id)) {
            res.sendStatus(403);
            return;
        }

        try {
            if (req.body.content) {
                post.content = req.body.content;
            }
            post.save();
            res.sendStatus(200);
        } catch (err) {
            res.sendStatus(400);
            return;
        }
    }
];

// GET request for one User.
exports.post_delete = async function (req, res, next) {
    let post;
    try {
        post = await db.Post.findOne({
            attributes: ['id'],
            include: [db.User],
            where: {
                id: parseInt(req.params.id)
            }
        });
    } catch (err) {
        res.sendStatus(400);
        return;
    }

    if (req.user.id !== parseInt(post.User.id)) {
        res.sendStatus(403);
        return;
    }

    try {
        post.destroy();
        res.sendStatus(200);
    } catch (err) {
        res.sendStatus(400);
        return;
    }
};
