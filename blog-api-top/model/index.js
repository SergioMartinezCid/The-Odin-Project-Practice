const user = require('./user');
const post = require('./post');
const comment = require('./comment');

const sequelize = require('sequelize')
let sequelizeDB = null

if (process.env.DATABASE_URL) {
    // the application is executed on Heroku ... use the postgres database
    sequelizeDB = new sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        protocol: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    })
} else {
    throw new Error('Incorrect Database URL');
}

db = {
    sequelize,
    sequelizeDB,
    User: author(sequelizeDB, sequelize.DataTypes),
    Post: book(sequelizeDB, sequelize.DataTypes),
    Comment: bookinstance(sequelizeDB, sequelize.DataTypes),
}

db.User.hasMany(db.Post);
db.Post.belongsTo(db.User);

db.Post.hasMany(db.Comment);
db.Comment.belongsTo(db.Post);

db.User.hasMany(db.Comment);
db.Comment.belongsTo(db.User);

module.exports = db