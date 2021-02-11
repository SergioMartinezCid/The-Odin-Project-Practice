const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require('bcryptjs');
const sequelize = require("sequelize");

const sequelizeDb = new sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

// sequelizeDb, sequelize.DataTypes
const User = sequelizeDb.define("User", {
    id: {
        type: sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: sequelize.DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: sequelize.DataTypes.STRING,
        allowNull: false
    }
});

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try{
            user = await User.findOne({
                where: { username: username }
            });
            if (!user) {
                return done(null, false, { msg: "Incorrect username" });
            }
            if (!await bcrypt.compare(password, user.password)) {
                return done(null, false, { msg: "Incorrect password" });
            }
            return done(null, user);
        }catch(err){
            return done(err);
        }
    })
);

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
    try {
        await User.findByPk(id);
        done(null, user);
    } catch (err) {
        done(err, user);
    }
});

const app = express();
app.set("views", __dirname);
app.set("view engine", "ejs");

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});
app.use(session({ secret: Math.random().toString(36).substring(7), resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => res.render("index", { user: req.user }));
app.get("/sign-up", (req, res) => res.render("sign-up-form"));
app.post("/sign-up", async (req, res, next) => {
        try {
            const password = await bcrypt.hash(req.body.password, 10);
            const user = await User.create({
                username: req.body.username,
                password
            });
            res.redirect("/");
        } catch (err) {
            return next(err);
        }
});

app.post("/log-in",
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/"
    })
);

app.get("/log-out", (req, res) => {
    req.logout();
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, () => console.log("app listening on port 3000!"));