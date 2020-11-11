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
exports.book_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Book create GET');
};

// Handle book create on POST.
exports.book_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Book create POST');
};

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