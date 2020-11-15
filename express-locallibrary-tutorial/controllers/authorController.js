const { body,validationResult } = require('express-validator');

// Display list of all Authors.
exports.author_list = async function(req, res) {
    const count = await db.Author.count();
    if (parseInt(req.params.page) <= 0 ||
        (parseInt(req.params.page) - 1)*db.pageLength > count){
            res.redirect('/catalog/authors');
    }
    const index = isNaN(req.params.page) ? 0: parseInt(req.params.page) - 1;

    var list_authors = await db.Author.findAll({
        order: [ ['family_name', 'ASC'] ],
        limit: db.pageLength,
        offset: index*db.pageLength
    });

    const link_previous = index === 0 ? undefined : `/catalog/authors/${index}`;
    const link_next = Math.ceil(count / db.pageLength) <= index + 1 ? undefined : `/catalog/authors/${index + 2}`;

    res.render('author_list', { title: 'Author List', author_list: list_authors, link_previous, link_next });
};

// Display detail page for a specific Author.
exports.author_detail = async function(req, res, next) {
    try {
        const author = await db.Author.findByPk(parseInt(req.params.id));
        const author_books = await db.Book.findAll({
            attributes: ['id', 'title', 'summary'],
            where: {
                AuthorId: parseInt(req.params.id)
            }
        });

        if (author == null) {
            var err = new Error('Author not found');
            err.status = 404;
            return next(err);
        }

        res.render('author_detail', { title: 'Author Detail', author: author, author_books: author_books });
    } catch (err) {
        return next(err);
    } 
};

// Display Author create form on GET.
exports.author_create_get = function(req, res) {
    res.render('author_form', { title: 'Create Author'});
};

// Handle Author create on POST.
exports.author_create_post = [

    // Validate and sanitise fields.
    body('first_name').trim().isLength({ min: 1 }).escape().withMessage('First name must be specified.')
        .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),
    body('family_name').trim().isLength({ min: 1 }).escape().withMessage('Family name must be specified.')
        .isAlphanumeric().withMessage('Family name has non-alphanumeric characters.'),
    body('date_of_birth', 'Invalid date of birth').optional({ checkFalsy: true }).isISO8601().toDate(),
    body('date_of_death', 'Invalid date of death').optional({ checkFalsy: true }).isISO8601().toDate(),

    // Process request after validation and sanitization.
    async (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('author_form', { title: 'Create Author', author: req.body, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid.
            // Create an Author object with escaped and trimmed data.
            try {
                var author = await db.Author.create({
                    first_name: req.body.first_name,
                    family_name: req.body.family_name,
                    date_of_birth: req.body.date_of_birth,
                    date_of_death: req.body.date_of_death
                });
                res.redirect(author.url);
            } catch (err) {
                return next(err);
            }
        }
    }
];

// Display Author delete form on GET.
exports.author_delete_get = async function(req, res, next) {
    try {
        const author = await db.Author.findByPk(parseInt(req.params.id));
        const author_books = await db.Book.findAll({
            where: {
                AuthorId: req.params.id
            }
        });
        if (author == null){
            res.redirect('/catalog/authors');
        }
        res.render('author_delete', { title: 'Delete Author', author: author, author_books: author_books });
    } catch (err) {
        return next(err);
    }
};

// Handle Author delete on POST.
exports.author_delete_post = async function(req, res) {
    try {
        const author = await db.Author.findByPk(parseInt(req.params.id));
        const author_books = await db.Book.findAll({
            where: {
                AuthorId: req.params.id
            }
        });
        
        if(author_books.length > 0){
            // Author has books. Render in same way as for GET route.
            res.render('author_delete', { title: 'Delete Author', author: author, author_books: authors_books } );
            return;
        } else {
            await author.destroy();
            res.redirect('/catalog/authors');
        }
        res.render('author_delete', { title: 'Delete Author', author: author, author_books: author_books });
    } catch (err) {
        return next(err);
    }
};

// Display Author update form on GET.
exports.author_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Author update GET');
};

// Handle Author update on POST.
exports.author_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Author update POST');
};