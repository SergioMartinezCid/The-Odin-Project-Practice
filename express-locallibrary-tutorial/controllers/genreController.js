const { body, validationResult } = require("express-validator");

// Display list of all Genre.
exports.genre_list = async function (req, res) {
    var list_genres = await db.Genre.findAll({
        order: [['name', 'ASC']]
    });
    res.render('genre_list', { title: 'Genre List', genre_list: list_genres });
};

// Display detail page for a specific Genre.
exports.genre_detail = async function (req, res, next) {
    try {
        const genre = await db.Genre.findByPk(parseInt(req.params.id));
        const genre_books = await db.Book.findAll({
            where: {
                GenreId: parseInt(req.params.id)
            }
        });

        if (genre == null) {
            var err = new Error('Genre not found');
            err.status = 404;
            return next(err);
        }

        res.render('genre_detail', { title: 'Genre Detail', genre: genre, genre_books: genre_books });
    } catch (err) {
        return next(err);
    }
};

// Display Genre create form on GET.
exports.genre_create_get = function (req, res) {
    res.render('genre_form', { title: 'Create Genre' });
};

// Handle Genre create on POST.
exports.genre_create_post = [

    // Validate and santise the name field.
    body('name', 'Genre name required').trim().isLength({ min: 1 }).escape(),

    // Process request after validation and sanitization.
    async (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a genre object with escaped and trimmed data.
        var genre = db.Genre.build({
            name: req.body.name
        });

        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values/error messages.
            res.render('genre_form', { title: 'Create Genre', genre: genre, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid.
            // Check if Genre with same name already exists.
            try {
                const found_genre = await db.Genre.findOne({
                    where: {
                        'name': req.body.name
                    }
                });
                if (found_genre) {
                    res.redirect(found_genre.url);
                } else {
                    try {
                        await genre.save();
                        res.redirect(genre.url);
                    } catch (err) {
                        return next(err);
                    }
                }
            } catch (err) {
                return next(err);
            }
        }
    }
];

// Display Genre delete form on GET.
exports.genre_delete_get = function (req, res) {
    res.send('NOT IMPLEMENTED: Genre delete GET');
};

// Handle Genre delete on POST.
exports.genre_delete_post = function (req, res) {
    res.send('NOT IMPLEMENTED: Genre delete POST');
};

// Display Genre update form on GET.
exports.genre_update_get = function (req, res) {
    res.send('NOT IMPLEMENTED: Genre update GET');
};

// Handle Genre update on POST.
exports.genre_update_post = function (req, res) {
    res.send('NOT IMPLEMENTED: Genre update POST');
};