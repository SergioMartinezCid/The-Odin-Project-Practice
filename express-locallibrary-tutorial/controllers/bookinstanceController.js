const { body,validationResult } = require('express-validator');

// Display list of all BookInstances.
exports.bookinstance_list = async function(req, res) {
    const count = await db.BookInstance.count();
    if (parseInt(req.params.page) <= 0 ||
        (parseInt(req.params.page) - 1)*db.pageLength > count){
            res.redirect('/catalog/bookinstances');
    }
    const index = isNaN(req.params.page) ? 0: parseInt(req.params.page) - 1;

    var list_bookinstances = await db.BookInstance.findAll({
        include: [{
            model: db.Book,
            required: true
        }],
        limit: db.pageLength,
        offset: index * db.pageLength
    });

    const link_previous = index === 0 ? undefined : `/catalog/bookinstances/${index}`;
    const link_next = Math.ceil(count / db.pageLength) <= index + 1 ? undefined : `/catalog/bookinstances/${index + 2}`;

    res.render('bookinstance_list', { title: 'Book Instance List', bookinstance_list: list_bookinstances, link_previous, link_next });
};

// Display detail page for a specific BookInstance.
exports.bookinstance_detail = async function(req, res, next) {
       try {
        const bookinstance = await db.BookInstance.findOne({
            where: {
                id: parseInt(req.params.id)
            },
            include: [db.Book]
        });

        if (bookinstance == null){
            var err = new Error('Book Instance not found');
            err.status = 404;
            return next(err);
        }
        
        res.render('bookinstance_detail', { title: `Copy: ${bookinstance.Book.title}`, bookinstance: bookinstance } );
    } catch (err) {
        return next(err);
    } 
};

// Display BookInstance create form on GET.
exports.bookinstance_create_get = async function(req, res) {
    try {
        const books = await db.Book.findAll({
            attributes: ['title']
        });
        res.render('bookinstance_form', { title: 'Create BookInstance', book_list: books });
    } catch (err) {
        return next(err);
    }
};

// Handle BookInstance create on POST.
exports.bookinstance_create_post = [

    // Validate and sanitise fields.
    body('book', 'Book must be specified').trim().isLength({ min: 1 }).escape(),
    body('imprint', 'Imprint must be specified').trim().isLength({ min: 1 }).escape(),
    body('status').escape(),
    body('due_back', 'Invalid date').optional({ checkFalsy: true }).isISO8601().toDate(),
    
    // Process request after validation and sanitization.
    async (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        const book = await db.Book.findOne({
            where: {
                title: req.body.book
            }
        });

        // Create a BookInstance object with escaped and trimmed data.
        const bookinstance = await db.BookInstance.build({
            BookId: book.id,
            imprint: req.body.imprint,
            status: req.body.status,
            due_back: req.body.due_back
        });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values and error messages.
            try {
                const books = await db.Book.findAll({
                    attributes: ['title']
                });
                res.render('bookinstance_form', { title: 'Create BookInstance', book_list: books, selected_book: bookinstance.Book.id, errors: errors.array(), bookinstance: bookinstance });
                return;
            } catch (err) {
                return next(err);
            }
        }
        else {
            // Data from form is valid.
            try {
                await bookinstance.save();
                res.redirect(bookinstance.url);
            } catch (err) {
                return next(err);
            }
        }
    }
];

// Display BookInstance delete form on GET.
exports.bookinstance_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: BookInstance delete GET');
};

// Handle BookInstance delete on POST.
exports.bookinstance_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: BookInstance delete POST');
};

// Display BookInstance update form on GET.
exports.bookinstance_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: BookInstance update GET');
};

// Handle bookinstance update on POST.
exports.bookinstance_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: BookInstance update POST');
};