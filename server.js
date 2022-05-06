const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require("cookie-parser");
var session = require('express-session');
var mysql = require('mysql2');
const bodyParser = require('body-parser');
const { receiveMessageOnPort } = require('worker_threads');

var publicPath = path.join(__dirname, 'public');
var htmlPath = path.join(__dirname, 'public/HTML');

app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

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
    // console.log("getting profile");
    if (req.session.username) {
        res.sendFile(path.join(htmlPath + '/user_profile.html'));
    } else {
        res.redirect('/');
    }
});

function checkUsernamePasswordCombo(username, password, handleResult) {
    const connection = mysql.createConnection({
        port: 3306,
        host: '127.0.0.1',
        user: 'foodbuddy',
        password: 'comp2800',
        database: 'users'
      });
      
    connection.connect()

    let result = false;

    connection.query(`SELECT * FROM users WHERE username = '${username}' AND password = '${password}';`, (err, rows, fields) => {
        if (err) {
            throw err;
        } else if (rows.length == 1) {
            console.log(rows, rows.length);
            result = true;
        }
        // console.log(result);

        connection.end();
        handleResult(result);
    })
}

app.post('/authenticate',
    bodyParser.urlencoded({
        extended: true
    }),
    (req, res, next) => {
        // connection.connect()

        // let result = false;

        // connection.query(`SELECT * FROM users WHERE username = '${req.body.username}' AND password = '${req.body.password}';`, (err, rows, fields) => {
        //     if (err) {
        //         throw err;
        //     } else if (rows.length == 1) {
        //         console.log(rows, rows.length);
        //         this.result = true;
        //     }
        // })
        // console.log(result);
        // connection.end()

        checkUsernamePasswordCombo(req.body.username, req.body.password, (result) => {
            if (result) {
                res.locals.username = req.body.username;
                console.log("correct username/pw");
                next();
            } else {
                console.log("incorrect username/pw");
                res.redirect('/');
            }
        });

        // if (result) {
        //     res.locals.username = req.body.username;
        //     console.log("correct username/pw");
        //     next();
        // } else {
        //     console.log("incorrect username/pw");
        //     res.redirect('/');
        // }
    },
    (req, res) => {
        // console.log("logging in");
        req.session.loggedIn = true;
        req.session.username = res.locals.username;
        // console.log("session: " + req.session);
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