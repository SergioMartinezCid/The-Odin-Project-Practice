const user = require('./user');
const post = require('./post');
const like = require('./like');
const friendship = require('./friendship');

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
    User: user(sequelizeDB, sequelize.DataTypes),
    Post: post(sequelizeDB, sequelize.DataTypes),
    Like: like(sequelizeDB, sequelize.DataTypes),
    Friendship: friendship(sequelizeDB, sequelize.DataTypes)
}

db.User.hasMany(db.Post);
db.Post.belongsTo(db.User);

sequelizeDB.sync();
module.exports = db