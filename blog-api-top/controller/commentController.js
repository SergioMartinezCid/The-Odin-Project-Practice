const db = require('../model/index');
const { body, validationResult } = require('express-validator');

// GET request for list of all User items.
exports.comment_list = async function (req, res) {
    const list_comments = await db.Comment.findAll({
        attributes: ['id'],
        order: [['id', 'ASC']],
        raw: true
    });
    res.json(list_comments);
};

// POST request for creating User.
exports.comment_create = [
    body('content', 'Content must not be empty').trim().isLength({ min: 10, max: 1500 }).escape(),
    body('PostId', 'PostId must not be empy').trim().isNumeric().escape(),

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
                    PostId: req.body.PostId,
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
exports.comment_detail = async function (req, res, next) {
    try {
        const comment = await db.Comment.findOne({
            attributes: ['id', 'content'],
            include: [db.User, db.Post],
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

// GET request for one User.
exports.comment_update = [
    body('content', 'Content must not be empty').trim().isLength({ min: 10, max: 1500 }).escape(),
    body('PostId', 'PostId must not be empy').trim().isNumeric().escape(),

    async (req, res, next) => {
        let comment;

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.sendStatus(400);
            return;
        }
        try {
            comment = await db.Comment.findOne({
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

        if (req.user.id !== parseInt(comment.User.id)) {
            res.sendStatus(403);
            return;
        }

        try {
            if (req.body.content) {
                comment.content = req.body.content;
            }
            comment.save();
            res.sendStatus(200);
        } catch (err) {
            res.sendStatus(400);
            return;
        }
    }
];

// GET request for one User.
exports.comment_delete = async function (req, res, next) {
    let comment;
    try {
        comment = await db.Post.findOne({
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

    if (req.user.id !== parseInt(comment.User.id)) {
        res.sendStatus(403);
        return;
    }

    try {
        comment.destroy();
        res.sendStatus(200);
    } catch (err) {
        res.sendStatus(400);
        return;
    }
};
