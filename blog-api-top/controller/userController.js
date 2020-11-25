const db = require('../model/index');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const user = require('../model/user');

// GET request for list of all User items.
exports.user_list = async function(req, res){
    const list_users = await db.User.findAll({
        attributes: ['id'],
        order: [ ['id', 'ASC'] ],
        raw: true
    });
    res.json(list_users);
};

// POST request for creating User.
exports.user_create = [
    body('username', 'Username must not be empty').trim().isLength({ min: 3, max: 1000 }).escape(),
    body('password', 'Password must not be empty').trim().isLength({ min: 6, max: 20 }).escape(),

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
                const hashedPassword = await bcrypt.hash(req.body.password, 10);
                await db.User.create({
                    username: req.body.username,
                    password: hashedPassword,
                    type: 'USER'
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
exports.user_detail = async function(req, res, next){
    try{
        const user = await db.User.findOne({
            attributes: ['id', 'username', 'type'],
            include: [db.Post, db.Comment],
            where: {
                id: parseInt(req.params.id)
            },
            raw: true,
            nest: true
        });
        res.json(user);
    } catch (err) {
        res.sendStatus(400);
        return;
    }
};

// GET request for one User.
exports.user_update = async function(req, res, next){
    if(req.user.id !== parseInt(req.params.id)){
        res.sendStatus(403);
        return;
    }

    try{
        const user = await db.User.findOne({
            where: {
                id: parseInt(req.params.id)
            }
        });
        if(req.body.username){
            user.username = req.body.username;
        }
        if(req.body.password){
            user.password = await bcrypt.hash(req.body.password, 10);
        }
        user.save();
        res.sendStatus(200);
    } catch (err) {
        res.sendStatus(400);
        return;
    }
};

// GET request for one User.
exports.user_delete = async function(req, res, next){
    if(req.user.id !== parseInt(req.params.id)){
        res.sendStatus(403);
        return;
    }

    try{
        const user = await db.User.findOne({
            where: {
                id: parseInt(req.params.id)
            }
        });
        user.destroy();
        res.sendStatus(200);
    } catch (err) {
        res.sendStatus(400);
        return;
    }
};
