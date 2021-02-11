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

const UserInstantiation = user(sequelizeDB, sequelize.DataTypes);

db = {
    sequelize,
    sequelizeDB,
    User: UserInstantiation,
    Post: post(sequelizeDB, sequelize.DataTypes),
    Friendship: friendship(sequelizeDB, sequelize.DataTypes, UserInstantiation)
}

db.User.hasMany(db.Post);
db.Post.belongsTo(db.User);

db.Post.belongsToMany(db.User, { through: 'Like' });
db.User.belongsToMany(db.Post, { through: 'Like' });

sequelizeDB.sync();
module.exports = db