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
    } else {
        console.log(`Now listening on port ${PORT}`)
    }
});

app.get('/isLoggedIn', (req, res) => {
    if (req.session.loggedIn) {
        res.send(true);
    } else {
        res.send(false);
    }
})

app.get('/', function (req, res, next) {
    if (req.session.loggedIn) {
        res.redirect('/profile');
        res.send();
    } else {
        res.sendFile(path.join(htmlPath + '/sign_in.html'));
    }
});

app.get("/profile", function (req, res, next) {
    if (req.session.loggedIn) {
        res.sendFile(path.join(htmlPath + '/user_profile.html'));
    } else {
        res.redirect('/');
    }
});

function getUserFullName(userid, handleResult) {
    const connection = createConnection();

    connection.connect()

    let firstName = "false";
    let lastName = "false";

    console.log("getting name for user ", userid);

    connection.query(`SELECT * FROM users WHERE userid = ${userid};`, (err, rows, fields) => {
        if (err) {
            throw err;
        }
        firstName = rows[0].firstName;
        lastName = rows[0].lastName;

        connection.end();
        handleResult(firstName, lastName)
    })
}

app.get("/getUserFullName", (req, res) => {
    getUserFullName(req.session.userid, (userFirstName, userLastName) => {
        let userFullName = userFirstName + ' ' + userLastName;

        res.send(JSON.stringify({
            fullName: userFullName
        }))
    })
})

function parseUrl(url) {
    let username = url.split(':')[1].slice(2);

    let password = url.split(':')[2].split('@')[0];

    let host = url.split('@')[1].split('/')[0];

    let database = url.split('/')[3].split('?')[0];

    // console.log("user: ", username);
    // console.log("password: ", password);
    // console.log("host: ", host);
    // console.log("database: ", database);
    // console.log("port: ", DB_PORT);

    return {
        port: DB_PORT,
        user: username,
        password: password,
        database: database,
        host: host
    }
}

function createConnection() {
    // console.log(DB_PORT, HOST, USER, PASSWORD);

    // const dbConnectionString = new connectionString.ConnectionString(DB_URL);
    // console.log(dbConnectionString);
    // console.log(DB_URL);
    let config = parseUrl(DB_URL);


    return mysql.createConnection(config);
}

function resetUserDatabaseTable() {
    const connection = createConnection();

    connection.connect();

    connection.query('DROP TABLE IF EXISTS Users;');

    connection.query('CREATE TABLE IF NOT EXISTS Users ( userid int NOT NULL AUTO_INCREMENT PRIMARY KEY, email varchar(50), password varchar(50), firstName varchar(50), lastName varchar(50), address varchar(100));');

    connection.query('INSERT INTO Users (email, password, firstName, lastName, address) VALUES ("user1@email.com", "pass1", "amy", "adams", "1 first ave, firstland");');
    connection.query("INSERT INTO Users (email, password, firstName, lastName, address) VALUES ('user2@email.com', 'pass2', 'bob', 'burns', '2 second ave, secondland');");
    connection.query("INSERT INTO Users (email, password, firstName, lastName, address) VALUES ('user3@email.com', 'pass3', 'carrie', 'carlson', '3 third ave, thirdland');");
    connection.query("INSERT INTO Users (email, password, firstName, lastName, address) VALUES ('user4@email.com', 'pass4', 'diane', 'davidson', '4 fourth ave, fourthland');");
    connection.query("INSERT INTO Users (email, password, firstName, lastName, address) VALUES ('user5@email.com', 'pass5', 'earl', 'ericson', '5 fifth ave, fifthland');");

    connection.query("SELECT * FROM users", (err, rows, fields) => {
        // console.log(rows);
        connection.end();
    });
}

function resetItemDatabaseTable() {
    const connection = createConnection();

    connection.connect();

    connection.query('DROP TABLE IF EXISTS Items;');

    connection.query("CREATE TABLE IF NOT EXISTS Items ( itemid int NOT NULL AUTO_INCREMENT PRIMARY KEY, itemName varchar(50), price varchar(50), img varchar(50), brand varchar(50), itemAvailability varchar(50));")

    connection.query("INSERT INTO Items (itemName, price, img, brand, itemId, itemAvailability, storeAddress ) VALUES ('bananas', '$1', 'banana.png', 'Walmart', '1', 'available', '9251 Alderbridge Way, Richmond, BC V6X 0N1');")
    connection.query("INSERT INTO Items (itemName, price, img, brand, itemId, itemAvailability, storeAddress ) VALUES ('bananas', '$2', 'banana.png', 'Superstore', '2', 'unavailable', '4651 No. 3 Rd, Richmond, BC V6X 2C4');")
    connection.query("INSERT INTO Items (itemName, price, img, brand, itemId, itemAvailability, storeAddress ) VALUES ('bananas', '$0.90', 'banana.png', 'Costco', '3', 'available', '9151 Bridgeport Rd, Richmond, BC V6X 3L9');")
    connection.query("INSERT INTO Items (itemName, price, img, brand, itemId, itemAvailability, storeAddress ) VALUES ('eggs', '$5', 'eggs.png', 'Superstore', '4', 'unavailable', '4651 No. 3 Rd, Richmond, BC V6X 2C4');")
    connection.query("INSERT INTO Items (itemName, price, img, brand, itemId, itemAvailability, storeAddress ) VALUES ('eggs', '$6', 'eggs.png', 'Walmart', '5', 'available', '9251 Alderbridge Way, Richmond, BC V6X 0N1');")
    connection.query("INSERT INTO Items (itemName, price, img, brand, itemId, itemAvailability, storeAddress ) VALUES ('chocolate', '$4', 'chocolate.png', 'Superstore', '6', 'available', '3185 Grandview Hwy, Vancouver, BC V5M 2E9');")
    connection.query("INSERT INTO Items (itemName, price, img, brand, itemId, itemAvailability, storeAddress ) VALUES ('chocolate', '$5', 'chocolate.png', 'Superstore', '7', 'unavailable', '3185 Grandview Hwy, Vancouver, BC V5M 2E9');")
    connection.query("INSERT INTO Items (itemName, price, img, brand, itemId, itemAvailability, storeAddress ) VALUES ('toilet paper', '$8', 'toilet_paper.png', 'Walmart', '8', 'available', '9251 Alderbridge Way, Richmond, BC V6X 0N1');")
    connection.query("INSERT INTO Items (itemName, price, img, brand, itemId, itemAvailability, storeAddress ) VALUES ('toilet paper', '$7.90', 'toilet_paper.png', 'Costco', '9', 'unavailable', '9151 Bridgeport Rd, Richmond, BC V6X 3L9');")
    connection.query("INSERT INTO Items (itemName, price, img, brand, itemId, itemAvailability, storeAddress ) VALUES ('meat', '$4', ', meat.png', 'Safeway', '10', 'unavailable', '8671 No 1 Rd, Richmond, BC V7C 1V2');")

    connection.query("SELECT * FROM items", (err, rows, fields) => {
        // console.log(rows);
        connection.end();
    });
}

/* this function is not working yet, do not use */
function resetWatchlistDatabaseTable() {
    const connection = createConnection();

    connection.connect();

    connection.query('DROP TABLE IF EXISTS UserItems;');

    connection.query("CREATE TABLE IF NOT EXISTS UserItems (userid int NOT NULL, itemid int NOT NULL, listid int NOT NULL AUTO_INCREMENT PRIMARY KEY, FOREIGN KEY (userid) REFERENCES Users(userid) ON DELETE CASCADE, FOREIGN KEY (itemid) REFERENCES Items(itemid) ON DELETE CASCADE);");

    connection.query("INSERT INTO UserItems (userid, itemid) VALUES (1, 1);");
    connection.query("INSERT INTO UserItems (userid, itemid) VALUES (1, 2);");
    connection.query("INSERT INTO UserItems (userid, itemid) VALUES (1, 3);");
    connection.query("INSERT INTO UserItems (userid, itemid) VALUES (1, 4);");
    connection.query("INSERT INTO UserItems (userid, itemid) VALUES (1, 5);");

    connection.query("INSERT INTO UserItems (userid, itemid) VALUES (2, 6);");
    connection.query("INSERT INTO UserItems (userid, itemid) VALUES (2, 7);");
    connection.query("INSERT INTO UserItems (userid, itemid) VALUES (2, 8);");
    connection.query("INSERT INTO UserItems (userid, itemid) VALUES (2, 9);");
    connection.query("INSERT INTO UserItems (userid, itemid) VALUES (2, 10);");

    connection.query("SELECT * FROM useritems", (err, rows, fields) => {
        // console.log(rows);
        connection.end();
    });
}

// uncomment this function call if you want to ENTIRELY RESET the User table in the database
// resetUserDatabaseTable();

// uncomment this function call if you want to ENTIRELY RESET the Item table in the database
// resetItemDatabaseTable();

// uncomment this function call if you want to ENTIRELY RESET the UserItem table in the database - NOT CURRENTLY WORKING
// resetWatchlistDatabaseTable();

function checkUsernamePasswordCombo(email, password, handleResult) {
    const connection = createConnection();


    connection.connect()

    let userID = -1;

    connection.query(`SELECT * FROM users WHERE email = '${email}' AND password = '${password}';`, (err, rows, fields) => {
        if (err) {
            throw err;
        } else if (rows.length > 0) {
            // console.log(rows, rows.length);
            userID = rows[0].userid;
        }
        // console.log("Check", username, password, rows)

        connection.end();
        handleResult(userID);
    })
}

app.post('/authenticate',
    bodyParser.urlencoded({
        extended: true
    }),
    (req, res, next) => {
        // console.log(`${req.body.username} + ${req.body.password}`);
        checkUsernamePasswordCombo(req.body.username, req.body.password, (result) => {
            if (result > 0) {
                // console.log(result);
                req.session.userid = result;
                // console.log("correct username/pw");
                next();
            } else {
                // console.log(`${req.body.username} + ${req.body.password}`)
                // console.log("incorrect username/pw");
                res.redirect('/?loginfailed=true');
            }
        });
    },
    (req, res) => {

        req.session.loggedIn = true;
        // console.log(res.locals.userid);
        // req.session.userid = res.locals.userid;

        res.redirect('/search');
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

function createNewAccount(email, password, firstName, lastName, handleResult) {
    const connection = createConnection();

    connection.connect()

    // console.log("inserting new user into db");
    // console.log(username, password, firstName, lastName)


/* Note: The account creation form does NOT require the user to enter their address.
They can add their address through the profile page, but we chose to omit this from
account creation to streamline the signup process. */
    connection.query(
        `INSERT INTO Users (email, password, firstName, lastName) VALUES ('${email}', '${password}', '${firstName}', '${lastName}');`,
        (err, res) => {
            if (err) {
                throw err;
            } else {
                handleResult(res.insertId);
            }

            connection.end();
    })
}

function checkIfEmailExists(emailToCheck, resultHandler) {
    let connection = createConnection();

    connection.connect();

    connection.query(`SELECT * FROM Users WHERE email = "${emailToCheck}";`, (err, rows, fields) => {
        if (err) {
            throw err;
        } else if (rows.length > 0) {
            resultHandler(true);
        } else {
            resultHandler(false);
        }
    });
}

app.post("/create_account_in_db",
    bodyParser.urlencoded({
        extended: true
    }),
    (req, res, next) => {
        console.log(`email: ${req.body.email}\n
        password: ${req.body.password}\n
        confirmed password: ${req.body.confirmPassword}\n
        first name: ${req.body.firstName}\n
        last name: ${req.body.lastName}`);

        if (req.body.password != req.body.confirmPassword) {
            console.log("passwords do not match")
            res.redirect('/create_account?passwordMismatch=true');
        } else {

            checkIfEmailExists(req.body.email, (result) => {
                if (result) {
                    console.log("username/pw already exists");
                    res.redirect('/create_account?userAlreadyExists=true');
                } else {
                    // req.session.userid = req.body.userid;
                    console.log("valid/new username/pw");
                    createNewAccount(req.body.email, req.body.password, req.body.firstName, req.body.lastName, (generatedUserid) => {
                        req.session.userid = generatedUserid;
                        next();
                    })
                }
            });
        }
    },
    (req, res) => {

        req.session.loggedIn = true;
        req.session.username = res.locals.username;

        res.redirect('/');
        res.send();
    }
);
//Admin
app.get('/admin', (req, res) => {
    if (req.session.admin) {
        res.redirect("/admin_dashboard");
    } else {
        res.sendFile(path.join(htmlPath + '/admin_login.html'));
    }
})

//Admin Dashboard
app.get('/admin_dashboard', (req, res) => {
    if (req.session.admin) {
        res.sendFile(path.join(htmlPath + "/admin_dashboard.html"))
    } else {
        res.redirect('/admin');
    }
})

app.post('/authenticate_admin',
    bodyParser.urlencoded({
        extended: true
    }),
    (req, res, next) => {
        // console.log(`${req.body.username} + ${req.body.password}`);

        if (req.body.username == "admin" && req.body.password == "admin") {
            res.locals.username = req.body.username;
            res.locals.admin = true;
            next();
        } else {
            res.redirect('/admin?loginFailed=true');
        }
    },
    (req, res) => {
        req.session.admin = res.locals.admin;
        res.redirect('/admin_dashboard');
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


//Fetch Item
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

app.get('/items_list', (req, res) => {
    if (req.session.admin) {
        res.sendFile(path.join(htmlPath + '/itemslist.html'));
    } else {
        res.sendFile(path.join(htmlPath + '/admin_login.html'));
    }
   
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
            "brand": details.brand,
            "availability": details.itemAvailability,
            "address": details.storeAddress
        });
    })

});


app.get('/getallproducts/:name', function (req, res, handleResult){
    //Change itemname
    let productName = req.params.name
    // console.log(productName)
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

app.get('/watchlist', (req, res) => {
    res.sendFile(path.join(htmlPath + "/Watchlist.html"))
})

//This is for accessing watchlist as you need to be a required user
// app.get('/all_items_list', (req, res) => {
//     if (req.session.userid) {
//         fetchItems((result) => {
//             res.sendFile(path.join(htmlPath + '/itemslist.html'));
//         });
//     } else {
//         res.redirect('/user');
//     }
// })
app.get("/search", (req, res) => {
    res.sendFile(path.join(htmlPath + '/search.html'));
});

app.get("/results", (req, res) => {
    res.sendFile(path.join(htmlPath + '/results.html'));
});

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
    // console.log(`${req.body.name}, ${req.body.sort}`);
    fetchItems_with_filter(req.body.name, req.body.sort, (result) => {
        res.send(result);
    });
});

app.get('/edit_profile', (req, res) => {
    res.sendFile(path.join(htmlPath + "/edit_profile.html"))
})

app.get('/change_password', (req, res) => {
    res.sendFile(path.join(htmlPath + '/change_password.html'))
})

app.post('/edit_email', (req, res) => {
    let connection = createConnection();

    connection.connect();

    // console.log(req.session.userid);

    // console.log(req.body);
    connection.query(`UPDATE users SET email = '${req.body.newEmail}' WHERE userid = '${req.session.userid}';`);
})

app.post('/edit_first_name', (req, res) => {
    let connection = createConnection();

    connection.connect();

    connection.query(`UPDATE users SET firstName = '${req.body.newFirstName}' WHERE userid = '${req.session.userid}';`);
})

app.post('/edit_last_name', (req, res) => {
    let connection = createConnection();

    connection.connect();

    connection.query(`UPDATE users SET lastName = '${req.body.newLastName}' WHERE userid = '${req.session.userid}';`);
})

app.post('/edit_address', (req, res) => {
    let connection = createConnection();

    connection.connect();

    connection.query(`UPDATE users SET address = '${req.body.newAddress}' WHERE userid = '${req.session.userid}';`);
})

app.post('/change_password', (req, res) => {
    let connection = createConnection();

    connection.connect();

    connection.query(`UPDATE users SET password = '${req.body.newPassword}' WHERE userid = '${req.session.userid}';`);
})

app.post('/add_item', (req, res) => {
    let connection = createConnection();

    connection.connect();

    connection.query(`INSERT INTO items (itemName, price, img, brand, itemAvailability) VALUES ('${req.body.newItem}', '${req.body.newItemPrice}', 'Null', '${req.body.newItemStore}', 'available');`);
})

app.get('/add_item', (req, res) => {
    res.sendFile(path.join(htmlPath + "/user_add_item.html"))
})

app.get('/update_item', (req, res) => {
    res.sendFile(path.join(htmlPath + "/update_item.html"))
})

app.post('/update_item', (req, res) => {
    let connection = createConnection();

    connection.connect();

    connection.query(`UPDATE items SET price = '${req.body.newPrice}' WHERE itemName = '${req.body.itemName}' AND brand = '${req.body.itemStore}';`);
})