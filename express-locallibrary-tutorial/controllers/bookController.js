const { body,validationResult } = require('express-validator');

exports.index = async function(req, res) {   
    let err = false;
    let book_count, book_instance_count, book_instance_available_count,
        author_count, genre_count;
    try {
       book_count = await db.Book.count();
       book_instance_count = await db.BookInstance.count();
       book_instance_available_count = await db.BookInstance.count({ where: [{'status': 'Available'}]});
       author_count = await db.Author.count();
       genre_count = await db.Genre.count();
    } catch (error) {
        err = true;
    }
    res.render('index', { title: 'Local Library Home', error: err, data: {
        book_count, book_instance_count, book_instance_available_count, author_count, genre_count
    } });
};

// Display list of all books.
exports.book_list = async function(req, res, next) {
    var list_books = await db.Book.findAll({
        attributes: ['id', 'title'],
        include: [{
            model: db.Author,
            required: true
        }]
    });
    res.render('book_list', { title: 'Book List', book_list: list_books });
};

// Display detail page for a specific book.
exports.book_detail = async function(req, res, next) {
    try {
        const book = await db.Book.findOne({
            where: {
                id: parseInt(req.params.id)
            },
            include: [db.Author, db.Genre]
        });
        const book_instances = await db.BookInstance.findAll({
            where: {
                BookId: parseInt(req.params.id)
            }
        });

        if (book == null){
            var err = new Error('Book not found');
            err.status = 404;
            return next(err);
        }
        
        res.render('book_detail', { title: 'Book Detail', book: book, book_instances: book_instances } );
    } catch (err) {
        return next(err);
    }
};

// Display book create form on GET.
exports.book_create_get = async function(req, res) {
    // Get all authors and genres, which we can use for adding to our book.
    try {
        const authors = await db.Author.findAll();
        const genres = await db.Genre.findAll();
        res.render('book_form', { title: 'Create Book', authors: authors, genres: genres });
    } catch (err) {
        return next(err);
    }
};

// Handle book create on POST.
exports.book_create_post = [
    // Validate and sanitise fields.
    body('title', 'Title must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('author', 'Author must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('summary', 'Summary must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('isbn', 'ISBN must not be empty').trim().isLength({ min: 1 }).escape(),
    body('genre').escape(),

    // Process request after validation and sanitization.
    async (req, res, next) => {
        
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a Book object with escaped and trimmed data.
        var book = await db.Book.build({
            title: req.body.title,
            AuthorId: req.body.author,
            summary: req.body.summary,
            isbn: req.body.isbn,
            GenreId: req.body.genre
        });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.

            // Get all authors and genres for form.
            try {
                const authors = await db.Author.findAll();
                const genres = await db.Genre.findAll();
                res.render('book_form', { title: 'Create Book', authors: authors, genres: genres, book: book, errors: errors.array() });
                return;
            } catch (err) {
                return next(err);
            }
        }
        else {
            // Data from form is valid. Save book.
            try {
                await book.save();
                res.redirect(book.url);
            } catch (err) {
                return next(err);
            }
        }
    }
];

// Display book delete form on GET.
exports.book_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Book delete GET');
};

// Handle book delete on POST.
exports.book_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Book delete POST');
};

// Display book update form on GET.
exports.book_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Book update GET');
};

// Handle book update on POST.
exports.book_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Book update POST');
};