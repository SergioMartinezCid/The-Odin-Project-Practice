const author = require('./author');
const book = require('./book');
const bookinstance = require('./bookinstance');
const genre = require('./genre');

if (!global.hasOwnProperty('db')) {
    var Sequelize = require('sequelize')
      , sequelize = null
  
    if (process.env.DATABASE_URL) {
      // the application is executed on Heroku ... use the postgres database
      sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect:  'postgres',
        protocol: 'postgres',
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false // <<<<<<< YOU NEED THIS
          }
        }
      })
    } else {
      throw new Error('Incorrect Database URL');
    }
  
    global.db = {
      Sequelize: Sequelize,
      sequelize: sequelize,
      Author:      author(sequelize, Sequelize.DataTypes),
      Book:      book(sequelize, Sequelize.DataTypes),
      BookInstance:      bookinstance(sequelize, Sequelize.DataTypes),
      Genre:      genre(sequelize, Sequelize.DataTypes)
    }
  
    global.db.Book.hasOne(global.db.Author);
    global.db.Book.hasOne(global.db.Genre);
    global.db.BookInstance.hasOne(global.db.Book);
  }
  
  module.exports = global.db