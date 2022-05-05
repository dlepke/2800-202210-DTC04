const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require("cookie-parser");
var session = require('express-session');
const bodyParser = require('body-parser');
const { receiveMessageOnPort } = require('worker_threads');

var publicPath = path.join(__dirname, 'public');
var htmlPath = path.join(__dirname, 'public/HTML');

app.use(express.static('public'));
app.use(cookieParser());

const oneDay = 1000 * 60 * 60 * 24;

let users = {
    "user1": "password",
    "user2": "pw",
    "user3": "pass"
};

app.use(session({
    secret: 'shush',
    saveUninitialized: true,
    resave: true,
    cookie: { maxAge: oneDay }
}));

app.listen(5050, function(err) {
    if (err) {
        console.log(err);
    }
});

app.get('/', function (req, res, next) {
    if (req.session.username) {
        res.redirect('/profile');
        res.send();
    } else {
        res.sendFile(path.join(htmlPath + '/sign_in.html'));
    }
});

app.get("/profile", function (req, res, next) {
    console.log("getting profile");
    if (req.session.username) {
        res.sendFile(path.join(htmlPath + '/user_profile.html'));
    } else {
        res.redirect('/');
    }
});

app.post('/authenticate',
    bodyParser.urlencoded(),
    (req, res, next) => {
        console.log("req: ", req.body)
        if (users[req.body.username] == req.body.password) {
            res.locals.username = req.body.username;
            console.log("correct username and password");
            next();
        } else {
            res.redirect('/');
        }
    },
    (req, res) => {
        req.session.loggedIn = true;
        req.session.username = res.locals.username;
        console.log("session: " + req.session);
        res.redirect('/profile');
        res.send();
    }
);

app.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect('/');
    // res.send();
});

app.get("/create_account", (req, res) => {
    res.sendFile(path.join(htmlPath + '/create_account.html'));
});