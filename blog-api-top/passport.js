const bcrypt = require('bcryptjs');
const passport = require('passport');
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const db = require('./model/index');

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
},
    async (username, password, callback) => {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            console.log(username);
            console.log(password);
            console.log(hashedPassword);
            const user = await db.User.findOne({
                where: { username: username },
                raw: true
            });
            if (!user) {
                return callback(null, false, { message: 'Incorrect username' });
            } else if (!await bcrypt.compare(password, user.password)){
                return callback(null, false, { message: 'Incorrect password' });
            }
            return callback(null, user, { message: 'Logged In Successfully' });
        } catch (err) {
            return callback(null, false, { message: 'Unexpected error' });
        }
    }
));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'your_jwt_secret'
},
    function (jwtPayload, callback) {
        //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
        return db.User.findByPk(jwtPayload.id)
            .then(user => {
                return callback(null, user);
            })
            .catch(err => {
                return callback(err);
            });
    }
));

module.exports = passport;