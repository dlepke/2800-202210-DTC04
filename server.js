require('dotenv').config();

const connectionString = require('connection-string');

const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require("cookie-parser");
var session = require('express-session');
var mysql = require('mysql2');
const bodyParser = require('body-parser');
const { receiveMessageOnPort } = require('worker_threads');

const DB_PORT = process.env.DB_PORT;
const HOST = process.env.DB_HOST;
const USER = process.env.DB_USER;
const PASSWORD = process.env.DB_PASSWORD;

const DB_URL = process.env.CLEARDB_DATABASE_URL;

const PORT = process.env.PORT;


// var publicPath = path.join(__dirname, 'public');
var htmlPath = path.join(__dirname, 'public/HTML');

app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

const oneDay = 1000 * 60 * 60 * 24;

app.use(session({
    secret: 'shush',
    saveUninitialized: true,
    resave: true,
    cookie: { maxAge: oneDay }
}));

app.listen(process.env.port || PORT, function(err) {
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
    if (req.session.username) {
        res.sendFile(path.join(htmlPath + '/user_profile.html'));
    } else {
        res.redirect('/');
    }
});

function parseUrl(url) {
    let username = url.split(':')[1].slice(2);

    let password = url.split(':')[2].split('@')[0];

    let host = url.split('@')[1].split('/')[0];

    let database = url.split('/')[3].split('?')[0];

    console.log("user: ", username);
    console.log("password: ", password);
    console.log("host: ", host);
    console.log("database: ", database);
    console.log("port: ", DB_PORT);

    return {
        port: DB_PORT,
        user: username,
        password: password,
        database: database,
        host: host
    }
}

function createConnection() {
    console.log(DB_PORT, HOST, USER, PASSWORD);

    // const dbConnectionString = new connectionString.ConnectionString(DB_URL);
    // console.log(dbConnectionString);
    console.log(DB_URL);
    let config = parseUrl(DB_URL);


    return mysql.createConnection(config);
}

function resetUserDatabaseTable() {
    const connection = createConnection();

    connection.connect();

    connection.query('DROP TABLE Users;');

    connection.query('CREATE TABLE IF NOT EXISTS Users ( userid int NOT NULL AUTO_INCREMENT PRIMARY KEY, username varchar(50), password varchar(50), firstName varchar(50), lastName varchar(50));');

    connection.query("INSERT INTO Users (username, password, firstName, lastName) VALUES ('user1', 'pass1', 'amy', 'adams');");
    connection.query("INSERT INTO Users (username, password, firstName, lastName) VALUES ('user2', 'pass2', 'bob', 'burns');");
    connection.query("INSERT INTO Users (username, password, firstName, lastName) VALUES ('user3', 'pass3', 'carrie', 'carlson');");
    connection.query("INSERT INTO Users (username, password, firstName, lastName) VALUES ('user4', 'pass4', 'diane', 'davidson');");
    connection.query("INSERT INTO Users (username, password, firstName, lastName) VALUES ('user5', 'pass5', 'earl', 'ericson');");

    connection.query("SELECT * FROM users", (err, rows, fields) => {
        console.log(rows);
        connection.end();
    });
}

// uncomment this function call if you want to ENTIRELY RESET the User table in the Heroku database
// resetUserDatabaseTable();

function checkUsernamePasswordCombo(username, password, handleResult) {
    const connection = createConnection();


    connection.connect()

    let result = false;

    connection.query(`SELECT * FROM users WHERE username = '${username}' AND password = '${password}';`, (err, rows, fields) => {
        if (err) {
            throw err;
        } else if (rows.length > 0) {
            console.log(rows, rows.length);
            result = true;
        }
        console.log("Check", username, password, rows)

        connection.end();
        handleResult(result);
    })
}

app.post('/authenticate',
    bodyParser.urlencoded({
        extended: true
    }),
    (req, res, next) => {
        console.log(`${req.body.username} + ${req.body.password}`);
        checkUsernamePasswordCombo(req.body.username, req.body.password, (result) => {
            if (result) {
                res.locals.username = req.body.username;
                console.log("correct username/pw");
                next();
            } else {
                console.log(`${req.body.username} + ${req.body.password}`)
                console.log("incorrect username/pw");
                res.redirect('/');
            }
        });
    },
    (req, res) => {

        req.session.loggedIn = true;
        req.session.username = res.locals.username;

        res.redirect('/profile');
        res.send();
    }
);

app.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

app.get("/create_account", (req, res) => {
    res.sendFile(path.join(htmlPath + '/create_account.html'));
});

function createNewAccount(username, password, firstName, lastName, handleResult) {
    const connection = createConnection();

    connection.connect()

    console.log("inserting new user into db");
    console.log(username, password, firstName, lastName)

    connection.query(
        `INSERT INTO Users (username, password, firstName, lastName) VALUES ('${username}', '${password}', '${firstName}', '${lastName}');`,
        (err) => {
            if (err) {
                throw err;
            }

            connection.end();
    })
}

app.post("/create_account_in_db",
    bodyParser.urlencoded({
        extended: true
    }),
    (req, res, next) => {
        console.log(`username: ${req.body.username}\n
        password: ${req.body.password}\n
        confirmed password: ${req.body.confirmPassword}\n
        first name: ${req.body.firstName}\n
        last name: ${req.body.lastName}`);

        if (req.body.password != req.body.confirmPassword) {
            console.log("passwords do not match")
            res.redirect('create_account');
        } else {

            checkUsernamePasswordCombo(req.body.username, req.body.password, (result) => {
                if (result) {
                    console.log("username/pw already exists");
                    res.redirect('/create_account');
                } else {
                    res.locals.username = req.body.username;
                    console.log("valid/new username/pw");
                    createNewAccount(req.body.username, req.body.password, req.body.firstName, req.body.lastName)
                    next();
                }
            });
        }
    },
    (req, res) => {

        req.session.loggedIn = true;
        req.session.username = res.locals.username;

        res.redirect('/profile');
        res.send();
    }
);

app.get('/admin', (req, res) => {
    res.sendFile(path.join(htmlPath + '/admin_login.html'));
})

app.post('/authenticate_admin',
    bodyParser.urlencoded({
        extended: true
    }),
    (req, res, next) => {
        console.log(`${req.body.username} + ${req.body.password}`);

        if (req.body.username == "admin" && req.body.password == "admin") {
            res.locals.username = req.body.username;
            res.locals.admin = true;
            next();
        } else {
            res.redirect('/admin');
        }
    },
    (req, res) => {
        req.session.admin = res.locals.admin;
        res.redirect('/account_list');
        res.send();
    }
);

function fetchAccounts(handleResult) {
    const connection = createConnection();

    connection.connect()

    let result = false;

    connection.query(`SELECT * FROM users;`, (err, rows, fields) => {
        if (err) {
            throw err;
        }
        result = rows;

        connection.end();
        handleResult(result)
    })
}

app.get('/account_list_data', (req, res) => {

    fetchAccounts((result) => {
        res.send(result);
    });
})

app.get('/account_list', (req, res) => {
    if (req.session.admin) {
        fetchAccounts((result) => {
            res.sendFile(path.join(htmlPath + '/account_list.html'));
        });
    } else {
        res.redirect('/admin');
    }
})

function fetchItems(handleResult) {
    const connection = createConnection();

    connection.connect()

    let result = false;

    connection.query(`SELECT * FROM items;`, (err, rows, fields) => {
        if (err) {
            throw err;
        }
        result = rows;

        connection.end();

        handleResult(result)
    })
}

app.get('/all_items', (req, res) => {

    fetchItems((result) => {
        res.send(result);

    });
})

app.get('/items', (req, res) => {
    res.sendFile(path.join(htmlPath + '/itemslist.html'));
})


//Product.ejs
app.get('/product/:id', function (req, res, handleResult) {
    // console.log(req.params.id)
    productid = req.params.id

    //create connection
    const connection = createConnection();
    connection.connect()


    //Query the database by ID 
    connection.query(`SELECT * FROM items where itemId = ${productid};`, (err, rows, fields) => {
        if (err) {
            throw err;
        }

        details = rows[0]
        connection.end();
        //place on page
        res.render("productview.ejs", {
            "id": details.itemId,
            "name": details.itemName,
            "img": details.img,
            "price": details.price,
            "location": details.brand,
            "availability": details.itemAvailability
        });
    })

});


app.get('/getallproducts/:name', function (req, res, handleResult){
    //Change itemname
    let productName = req.params.name
    console.log(productName)
    const connection = createConnection();
    connection.connect()

    connection.query(`SELECT * FROM items where itemName = "${productName}";`, (err, rows, fields) => {
        if (err) {
            throw err;
        }
        else {
            res.send(rows)
        }
    })
})


//This is for accessing watchlist as you need to be a required user
// app.get('/all_items_list', (req, res) => {
//     if (req.session.username) {
//         fetchItems((result) => {
//             res.sendFile(path.join(htmlPath + '/itemslist.html'));
//         });
//     } else {
//         res.redirect('/user');
//     }
// })
app.get('/search_item', (req, res) => {

    fetchItems((result) => {
        res.send(result);
    });
})

function fetchItems_with_filter(name, sort, handleResult) {
    const connection = createConnection();

    connection.connect()

    let result = false;

    connection.query(`SELECT * FROM items WHERE itemName='${name}' ORDER BY ${sort} ASC;`, (err, rows, fields) => {
        if (err) {
            throw err;
        }
        result = rows;

        connection.end();
        handleResult(result)
    })
}

app.post('/apply_sort', 
bodyParser.urlencoded({
    extended: true
}),
(req, res, next) => {
    console.log(`${req.body.name}, ${req.body.sort}`);
    fetchItems_with_filter(req.body.name, req.body.sort, (result) => {
        res.send(result);
    });
//     if (req.body.username == "admin" && req.body.password == "admin") {
//         res.locals.username = req.body.username;
//         res.locals.admin = true;
//         next();
//     } else {
//         res.redirect('/admin');
//     }
// },
// (req, res) => {
//     req.session.admin = res.locals.admin;
//     res.redirect('/account_list');
//     res.send();
});
//(req, res) => {
    
//     // fetchItems((result) => {
//     //     res.send(result);
//     // });
// })

app.get('/edit_profile', (req, res) => {
    res.sendFile(path.join(htmlPath + "/edit_profile.html"))
})

app.get('/change_password', (req, res) => {
    res.sendFile(path.join(htmlPath + '/change_password.html'))
})
