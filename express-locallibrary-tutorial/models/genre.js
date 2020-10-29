var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var GenreSchema = new Schema(
    {
        name: {type: String, required: true, minlength: 3, maxlength: 1000}
    }
);

// Virtual for genre's url
GenreSchema
.virtual('url')
.get(() => {
    return `/catalog/genre/${this._id}`
});

// Export model
module.exports = mongoose.model('Genre', GenreSchema);