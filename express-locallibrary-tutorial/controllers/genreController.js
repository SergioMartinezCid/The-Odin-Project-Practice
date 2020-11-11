// Display list of all Genre.
exports.genre_list = async function(req, res) {
    var list_genres = await db.Genre.findAll({
        order: [ ['name', 'ASC'] ]
    });
    res.render('genre_list', { title: 'Genre List', genre_list: list_genres });
};

// Display detail page for a specific Genre.
exports.genre_detail = async function(req, res, next) {
    try {
        const genre = await db.Genre.findByPk(parseInt(req.params.id));
        const genre_books = await db.Book.findAll({
            where: {
                GenreId: parseInt(req.params.id)
            }
        });

        if (genre == null){
            var err = new Error('Genre not found');
            err.status = 404;
            return next(err);
        }
        
        res.render('genre_detail', { title: 'Genre Detail', genre: genre, genre_books: genre_books } );
    } catch (err) {
        return next(err);
    }
};

// Display Genre create form on GET.
exports.genre_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre create GET');
};

// Handle Genre create on POST.
exports.genre_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre create POST');
};

// Display Genre delete form on GET.
exports.genre_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre delete GET');
};

// Handle Genre delete on POST.
exports.genre_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre delete POST');
};

// Display Genre update form on GET.
exports.genre_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre update GET');
};

// Handle Genre update on POST.
exports.genre_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre update POST');
};