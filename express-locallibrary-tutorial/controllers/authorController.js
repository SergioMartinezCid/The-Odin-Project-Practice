// Display list of all Authors.
exports.author_list = async function(req, res) {
    var list_authors = await db.Author.findAll({
        order: [ ['family_name', 'ASC'] ]
    });
    res.render('author_list', { title: 'Author List', author_list: list_authors });
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
    res.send('NOT IMPLEMENTED: Author create GET');
};

// Handle Author create on POST.
exports.author_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Author create POST');
};

// Display Author delete form on GET.
exports.author_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Author delete GET');
};

// Handle Author delete on POST.
exports.author_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Author delete POST');
};

// Display Author update form on GET.
exports.author_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Author update GET');
};

// Handle Author update on POST.
exports.author_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Author update POST');
};