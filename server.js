require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require("cookie-parser");
var session = require('express-session');
var mysql = require('mysql2');
const bodyParser = require('body-parser');

const DB_PORT = process.env.DB_PORT;

const DB_URL = process.env.CLEARDB_DATABASE_URL;

const PORT = process.env.PORT;

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

app.get('/', function (req, res) {
    res.sendFile(path.join(htmlPath + '/search.html'));
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(htmlPath + '/sign_in.html'));
})

app.get("/profile", function (req, res) {
    if (req.session.loggedIn) {
        res.sendFile(path.join(htmlPath + '/user_profile.html'));
    } else {
        res.redirect('/login');
    }
});

/**
 * Gets the first and last name of the user and passes it to the callback function.
 * @param {String} userid the ID of the user in the database
 * @callback handleResult callback function
 */
function getUserFullName(userid, handleResult) {
    const connection = createConnection();

    let firstName = "false";
    let lastName = "false";

    console.log("getting name for user ", userid);

    connection.query(`SELECT * FROM users WHERE userid = ${userid};`, (err, rows) => {
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

/**
 * Gets the port, username, password, database and host from url.
 * @param {String} url url link that's being parsed
 * @returns the port, username and password of the user, the database, and the hosts that were obtained from the url
 */
function parseUrl(url) {
    let username = url.split(':')[1].slice(2);

    let password = url.split(':')[2].split('@')[0];

    let host = url.split('@')[1].split('/')[0];

    let database = url.split('/')[3].split('?')[0];

    return {
        port: DB_PORT,
        user: username,
        password: password,
        database: database,
        host: host
    }
}

/**
 * Creates a pool of stored connections and returns them.
 * @returns a pool of stored connections.
 */
function createConnection() {
    let config = parseUrl(DB_URL);


    return mysql.createPool(config);
}

/**
 * Resets the User databases to empty then creates five new users and adds them to the datase "Users".
 */
function resetUserDatabaseTable() {
    const connection = createConnection();

    connection.query('DROP TABLE IF EXISTS UserItems;', () => {

        connection.query('DROP TABLE IF EXISTS Users;', () => {

            connection.query('CREATE TABLE IF NOT EXISTS Users ( userid int NOT NULL AUTO_INCREMENT PRIMARY KEY, email varchar(50), password varchar(50), firstName varchar(50), lastName varchar(50), address varchar(100));', () => {
        
                connection.query('INSERT INTO Users (email, password, firstName, lastName, address) VALUES ("user1@email.com", "pass1", "amy", "adams", "1 first ave, firstland");');
                connection.query("INSERT INTO Users (email, password, firstName, lastName, address) VALUES ('user2@email.com', 'pass2', 'bob', 'burns', '2 second ave, secondland');");
                connection.query("INSERT INTO Users (email, password, firstName, lastName, address) VALUES ('user3@email.com', 'pass3', 'carrie', 'carlson', '3 third ave, thirdland');");
                connection.query("INSERT INTO Users (email, password, firstName, lastName, address) VALUES ('user4@email.com', 'pass4', 'diane', 'davidson', '4 fourth ave, fourthland');");
                connection.query("INSERT INTO Users (email, password, firstName, lastName, address) VALUES ('user5@email.com', 'pass5', 'earl', 'ericson', '5 fifth ave, fifthland');");
        
                connection.query("SELECT * FROM users", () => {
                    // console.log(rows);
                    connection.end();
                    resetItemDatabaseTable();
                });
            });
        });

    });



}

/**
 * Resets the Items database by dropping it and recreating it, then populating it with grocery items.
 */
function resetItemDatabaseTable() {
    const connection = createConnection();

    connection.query('DROP TABLE IF EXISTS Items;', () => {
        connection.query("CREATE TABLE IF NOT EXISTS Items ( itemid int NOT NULL AUTO_INCREMENT PRIMARY KEY, itemName varchar(50), price varchar(50), img varchar(1000), brand varchar(50), itemAvailability varchar(50), storeAddress varchar(100), category varchar(50))", () => {
            connection.query("INSERT INTO Items (itemName, price, img, brand, itemId, itemAvailability, storeAddress, category ) VALUES ('bananas', '$1', 'https://images.costcobusinessdelivery.com/ImageDelivery/imageService?profileId=12027981&itemId=30669&recipeName=680', 'Walmart', '1', 'available', '9251 Alderbridge Way, Richmond, BC V6X 0N1', 'produce');")
            connection.query("INSERT INTO Items (itemName, price, img, brand, itemId, itemAvailability, storeAddress, category ) VALUES ('bananas', '$2', 'https://i5.walmartimages.com/asr/41305aa3-3de8-4bab-80e9-484cf63cadc5_1.e46fb74bc2e4fa0751ad18233d4d4854.jpeg?odnHeight=450&odnWidth=450&odnBg=ffffff', 'Superstore', '2', 'unavailable', '4651 No. 3 Rd, Richmond, BC V6X 2C4', 'produce');")
            connection.query("INSERT INTO Items (itemName, price, img, brand, itemId, itemAvailability, storeAddress, category ) VALUES ('bananas', '$0.90', 'https://i0.wp.com/superstore.mangopoint.in/wp-content/uploads/2019/10/banana-karpuravalli-500x500.jpg?fit=330%2C330&ssl=1', 'Costco', '3', 'available', '9151 Bridgeport Rd, Richmond, BC V6X 3L9', 'produce');")
            connection.query("INSERT INTO Items (itemName, price, img, brand, itemId, itemAvailability, storeAddress, category ) VALUES ('eggs', '$5', 'https://www.verywellhealth.com/thmb/kXxeAfjFaNtlyEYmCRtKxoLbtCY=/2880x1920/filters:no_upscale():max_bytes(150000):strip_icc()/uncover-hidden-egg-ingredients-1324275-primary-recirc-3cf777cca7044ee1992cc0a27d6449fa.jpg', 'Superstore', '4', 'unavailable', '4651 No. 3 Rd, Richmond, BC V6X 2C4', 'protein');")
            connection.query("INSERT INTO Items (itemName, price, img, brand, itemId, itemAvailability, storeAddress, category ) VALUES ('eggs', '$6', 'https://www.unlockfood.ca/EatRightOntario/media/Website-images-resized/All-About-Eggs-resized.jpg', 'Walmart', '5', 'available', '9251 Alderbridge Way, Richmond, BC V6X 0N1', 'protein');")
            connection.query("INSERT INTO Items (itemName, price, img, brand, itemId, itemAvailability, storeAddress, category ) VALUES ('chocolate', '$4', 'https://perfectdailygrind.com/wp-content/uploads/2020/04/Hs_5Ce8ecmXodh-AdEVHyT07irPaZ-zAAhYkKYRJgS5CVzHKs0cAAdyeAF9TIgyh4KI5gqYmyuIDwJnf2f9wCdNvJ5WbQOlSoRr5zmmzMalyR1-RQxvlOtTZkJq9G_GPUiVZ6_WX-1-1.jpeg', 'Superstore', '6', 'available', '3185 Grandview Hwy, Vancouver, BC V5M 2E9', 'snack');")
            connection.query("INSERT INTO Items (itemName, price, img, brand, itemId, itemAvailability, storeAddress, category ) VALUES ('chocolate', '$5', 'https://www.heart.org/-/media/Images/News/2019/February-2019/0212Chocolate_SC.png', 'Superstore', '7', 'unavailable', '3185 Grandview Hwy, Vancouver, BC V5M 2E9', 'snack');")
            connection.query("INSERT INTO Items (itemName, price, img, brand, itemId, itemAvailability, storeAddress, category ) VALUES ('toilet paper', '$8', 'https://www.mayrand.ca/globalassets/mayrand/catalog-mayrand/entretien/40414-papier-hygienique-mega-264-feuilles-x12-charmin.png', 'Walmart', '8', 'available', '9251 Alderbridge Way, Richmond, BC V6X 0N1', 'household');")
            connection.query("INSERT INTO Items (itemName, price, img, brand, itemId, itemAvailability, storeAddress, category ) VALUES ('toilet paper', '$7.90', 'https://images.heb.com/is/image/HEBGrocery/000912650', 'Costco', '9', 'unavailable', '9151 Bridgeport Rd, Richmond, BC V6X 3L9', 'household');")
            connection.query("INSERT INTO Items (itemName, price, img, brand, itemId, itemAvailability, storeAddress, category ) VALUES ('chicken', '$18.99', 'https://i.pinimg.com/550x/ec/30/7b/ec307bfa3ded904a6eda6e0d668531b3.jpg', 'Safeway', '10', 'unavailable', '8671 No 1 Rd, Richmond, BC V7C 1V2', 'meat');")
            connection.query("INSERT INTO Items (itemName, price, img, brand, itemId, itemAvailability, storeAddress, category ) VALUES ('beef', '$33.72', 'https://hips.hearstapps.com/hmg-prod/images/delish-roast-beef-horizontal-1540505165.jpg', 'Walmart', '11', 'available', '9251 Alderbridge Way, Richmond, BC V6X 0N1', 'meat');")
            connection.query("INSERT INTO Items (itemName, price, img, brand, itemId, itemAvailability, storeAddress, category ) VALUES ('salmon', '$32.59', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQME7frMp2eIbAaNGoi23UfaF4-Bi0wZ__C1w&usqp=CAU', 'Superstore', '12', 'unavailable', '4651 No. 3 Rd, Richmond, BC V6X 2C4', 'seafood');")
            connection.query("INSERT INTO Items (itemName, price, img, brand, itemId, itemAvailability, storeAddress, category ) VALUES ('mussel', '$15.99', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1ivU4IWGsFjfG4PlMzcLiTgUDbajkvDuFjw&usqp=CAU', 'Costco', '13', 'available', '9151 Bridgeport Rd, Richmond, BC V6X 3L9', 'seafood');")
            connection.query("INSERT INTO Items (itemName, price, img, brand, itemId, itemAvailability, storeAddress, category ) VALUES ('milk', '$4.99', 'https://i5.walmartimages.ca/images/Enlarge/611/022/6000204611022.jpg', 'Superstore', '14', 'unavailable', '4651 No. 3 Rd, Richmond, BC V6X 2C4', 'dairy');")
            connection.query("INSERT INTO Items (itemName, price, img, brand, itemId, itemAvailability, storeAddress, category ) VALUES ('milk', '$5.42', 'https://www.lactaid.com/sites/lactaid_us/files/styles/jjbos_adaptive_images_generic-desktop/public/product-images/whole_milk.jpg', 'Walmart', '15', 'available', '9251 Alderbridge Way, Richmond, BC V6X 0N1', 'dairy');")
            connection.query("INSERT INTO Items (itemName, price, img, brand, itemId, itemAvailability, storeAddress, category ) VALUES ('cheese', '$6.99', 'https://myculturedpalate.com/wp-content/uploads/2010/01/Homemade-Mozzarella-Cheese-sliced-500x375.jpg', 'Superstore', '16', 'available', '3185 Grandview Hwy, Vancouver, BC V5M 2E9', 'dairy');")
            connection.query("INSERT INTO Items (itemName, price, img, brand, itemId, itemAvailability, storeAddress, category ) VALUES ('reese', '$2', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjeIWAefE1s00F2Gk6aEeDHpJNY4wADWhVdYUkhR99ZRQd_ghf4CuImowuGXe_9sVIsqo&usqp=CAU', 'Superstore', '17', 'unavailable', '3185 Grandview Hwy, Vancouver, BC V5M 2E9', 'snack');")
            connection.query("INSERT INTO Items (itemName, price, img, brand, itemId, itemAvailability, storeAddress, category ) VALUES ('bread', '$5.99', 'https://www.kingarthurbaking.com/sites/default/files/2020-02/the-easiest-loaf-of-bread-youll-ever-bake.jpg', 'Walmart', '18', 'available', '9251 Alderbridge Way, Richmond, BC V6X 0N1', 'bakery');")
            connection.query("INSERT INTO Items (itemName, price, img, brand, itemId, itemAvailability, storeAddress, category ) VALUES ('croissant', '$7.90', 'https://www.theflavorbender.com/wp-content/uploads/2020/05/French-Croissants-SM-2363.jpg', 'Costco', '19', 'unavailable', '9151 Bridgeport Rd, Richmond, BC V6X 3L9', 'bakery');")
            connection.query("INSERT INTO Items (itemName, price, img, brand, itemId, itemAvailability, storeAddress, category ) VALUES ('prawns', '$17.99', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAAz3M_kM0x6dte8xiwD8li8YAuUOcazfUUw&usqp=CAU', 'Safeway', '20', 'unavailable', '8671 No 1 Rd, Richmond, BC V7C 1V2', 'seafood');")
    
            connection.query("SELECT * FROM items", () => {
                // console.log(rows);
                connection.end();
                resetWatchlistDatabaseTable();
            });
        })
    });
}

function resetWatchlistDatabaseTable() {
    const connection = createConnection();

    connection.query('DROP TABLE IF EXISTS UserItems;', () => {

        connection.query("CREATE TABLE IF NOT EXISTS UserItems (userid int NOT NULL, itemid int NOT NULL, listid int NOT NULL AUTO_INCREMENT PRIMARY KEY, FOREIGN KEY (userid) REFERENCES Users(userid) ON DELETE CASCADE, FOREIGN KEY (itemid) REFERENCES Items(itemid) ON DELETE CASCADE);", (err) => {
            console.log(err);
            connection.query("SELECT * FROM useritems", () => {
                // console.log(rows);
                connection.end();
            });
        });
    });

}

// uncomment this function call if you want to ENTIRELY RESET all tables in the database with dummy values
resetUserDatabaseTable();

/**
 * Checks the entered password and email combo to see if they are in the database.
 * @param {String} email email entered by user
 * @param {String} password password entered by user
 * @callback handleResult callback function
 */
function checkUsernamePasswordCombo(email, password, handleResult) {
    const connection = createConnection();

    let userID = -1;

    connection.query(`SELECT * FROM users WHERE email = '${email}' AND password = '${password}';`, (err, rows) => {
        if (err) {
            throw err;
        } else if (rows.length > 0) {
            userID = rows[0].userid;
        }

        connection.end();
        handleResult(userID);
    })
}

app.post('/authenticate',
    bodyParser.urlencoded({
        extended: true
    }),
    (req, res, next) => {
        checkUsernamePasswordCombo(req.body.username, req.body.password, (result) => {
            if (result > 0) {
                console.log(result);
                req.session.userid = result;
                console.log("correct username/pw");
                next();
            } else {
                res.redirect('/?loginfailed=true');
            }
        });
    },
    (req, res) => {

        req.session.loggedIn = true;

        res.redirect('/search');
        res.send();
    }
);

app.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

app.get("/create_account", (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
    } else {
        res.sendFile(path.join(htmlPath + '/create_account.html'));
    }
});

/**
 * Creates a new User in the "Users" database and inserts the email, password, first and last name.
 * @param {String} email email entered by user to be stored in database
 * @param {String} password password entered to be stored
 * @param {String} firstName user's first name
 * @param {String} lastName user's last name
 * @callback handleResult callback function
 */
function createNewAccount(email, password, firstName, lastName, handleResult) {
    const connection = createConnection();

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

/**
 * Checks if the entered email is in the "Users" database.
 * @param {String} emailToCheck email entered by user to be checked
 * @callback resultHandler callback function
 */
function checkIfEmailExists(emailToCheck, resultHandler) {
    let connection = createConnection();

    connection.query(`SELECT * FROM Users WHERE email = "${emailToCheck}";`, (err, rows) => {
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
                } else if (req.body.email === '' || req.body.password === '' || req.body.confirmPassword === '' || req.body.firstName === '' || req.body.lastName === '') {
                    console.log("fields left empty");
                    res.redirect('/create_account?emptyFields=true')
                } else {
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

        res.redirect('/search');
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
        req.session.loggedIn = true;
        res.redirect('/admin_dashboard');
        res.send();
    }
);

/**
 * Gets all users from "users" database.
 * @callback handleResult callback function
 */
function fetchAccounts(handleResult) {
    const connection = createConnection();

    let result = false;

    connection.query(`SELECT * FROM users;`, (err, rows) => {
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
        fetchAccounts(() => {
            res.sendFile(path.join(htmlPath + '/account_list.html'));
        });
    } else {
        res.redirect('/admin');
    }
})


/**
 * Gets all items from "items" database with name matching input.
 * @param {String} name String representing the name of the item
 * @callback handleResult callback function
 */
function fetchItems_by_name(name, handleResult) {
    const connection = createConnection();

    let result = false;

    connection.query(`SELECT * FROM items WHERE itemName = '${name}';`, (err, rows) => {
        if (err) {
            throw err;
        }
        result = rows;

        connection.end();

        handleResult(result)
    })
}

/**
 * Get all items that belong to the input category.
 * @param {String} category Item category to search for
 * @callback handleResult callback function
 */
function fetchItems_by_category(category, handleResult) {
    const connection = createConnection();

    let result = false;

    connection.query(`SELECT * FROM items WHERE category = '${category}';`, (err, rows) => {
        if (err) {
            throw err;
        }
        result = rows;

        connection.end();

        handleResult(result)
    })
}

/**
 * Gets all items from the database.
 * @callback handleResult callback function
 */
function fetchItems(handleResult) {
    const connection = createConnection();

    let result = false;

    connection.query(`SELECT * FROM items;`, (err, rows) => {
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
app.get('/product/:id', function (req, res) {
    console.log("req.params.id: ", req.params.id)
    let productid = req.params.id

    //create connection
    const connection = createConnection();


    //Query the database by ID
    connection.query(`SELECT * FROM items where itemId = ${productid};`, (err, rows) => {
        if (err) {
            throw err;
        }

        let details = rows[0]
        console.log("details: ", details);
        connection.end();
        //place on page
        res.render("productview.ejs", {
            "productid": req.params.id,
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


app.get('/getallproducts/:name', function (req, res){
    //Change itemname
    let productName = req.params.name

    const connection = createConnection();

    connection.query(`SELECT * FROM items where itemName = "${productName}";`, (err, rows) => {
        if (err) {
            throw err;
        }
        else {
            res.send(rows)
        }
        connection.end();
    })
})

app.get('/privacy_policy', (req, res) => {
    res.sendFile(path.join(htmlPath + "/ppolicy.html"))
})


app.get('/watchlist', (req, res) => {
    if (req.session.loggedIn) {
        res.sendFile(path.join(htmlPath + "/Watchlist.html"))
    } else {
        res.redirect('/login');
    }
})

app.get('/watchlist_items', (req, res) => {
    // sql to access watchlist items with user id
    // sql to get items
    // send items

    console.log(req.session.userid);

    let connection = createConnection();

    connection.query(`SELECT * FROM items WHERE itemid IN (SELECT itemid FROM useritems WHERE userid = ${req.session.userid})`, (err, rows) => {
        console.log(rows);

        res.send(rows);

        connection.end();
    });
})

/**
 * Checks if an item is in a user's watchlist.
 * @param {number} itemid auto-generated integer representing item id
 * @param {number} userid auto-generated integer representing user id
 * @callback handleResult callback function
 */
function isItemOnWatchlist(itemid, userid, handleResult) {
    let connection = createConnection();

    connection.query(`SELECT * FROM useritems WHERE userid = ${userid} AND itemid = ${itemid}`, ((err, rows) => {

        connection.end();

        if (rows.length > 0) {
            handleResult(true);
        } else {
            handleResult(false);
        }
    }))
}

app.post('/add_to_watchlist', (req, res) => {

    if (req.session.userid) {

        let itemid = req.body.itemid;
        let userid = req.session.userid;

        let connection = createConnection();

        connection.query(`INSERT INTO useritems (userid, itemid) VALUES (${userid}, ${itemid});`, () => {

            connection.query(`SELECT * FROM useritems WHERE userid = ${userid}`, ((err, rows) => {
                console.log("result: ", rows);

                connection.end();
                res.send(true);
            }))
        });

    } else {
        res.send({
            userLoggedIn: false
        })
    }
})

app.post('/remove_from_watchlist', (req, res) => {
    if (req.session.userid) {

        let itemid = req.body.itemid;
        let userid = req.session.userid;

        let connection = createConnection();

        connection.query(`DELETE FROM useritems WHERE userid = ${userid} AND itemid = ${itemid};`);

        connection.query(`SELECT * FROM useritems WHERE userid = ${userid}`, ((err, rows) => {
            console.log("result: ", rows);

            connection.end();
        }))
    } else {
        res.send({
            userLoggedIn: false
        })
    }
})

app.get('/is_on_watchlist/:itemid', (req, res) => {
    let itemid = req.params.itemid;
    let userid = req.session.userid;

    console.log("itemid: ", itemid, " userid: ", userid);

    if (!userid) {
        res.send({
            is_item_on_watchlist: false
        })
    } else {

        isItemOnWatchlist(itemid, userid, (result) => {
            res.send({
                is_item_on_watchlist: result
            })
        });

    }
})

app.get("/search", (req, res) => {
    res.sendFile(path.join(htmlPath + '/search.html'));
});

app.get("/results", (req, res) => {
    res.sendFile(path.join(htmlPath + '/results.html'));
});

app.post('/search_item_by_name', (req, res) => {

    fetchItems_by_name(req.body.name, (result) => {
        res.send(result);
    });
})

app.post('/search_item_by_category', (req, res) => {

    fetchItems_by_category(req.body.category, (result) => {
        res.send(result);
    });
})

/**
 * Gets items from the database matching the name and sorts them in order.
 * @param {String} name the name of the item to be fetched from the database
 * @param {String} sort the parameter by which to sort the items
 * @callback handleResult callback function
 */
function fetchItems_name_with_filter(name, sort, handleResult) {
    const connection = createConnection();

    let result = false;

    connection.query(`SELECT * FROM items WHERE itemName='${name}' ORDER BY ${sort} ASC;`, (err, rows) => {
        if (err) {
            throw err;
        }
        result = rows;

        connection.end();
        handleResult(result)
    })
}

/**
 * Displays all items from a certain category and sorts them accordingly.
 * @param {String} category the category of items the user wants to see
 * @param {String} sort the condition that the items are to be sorted by
 * @callback handleResult callback function
 */
function fetchItems_category_with_filter(category, sort, handleResult) {
    const connection = createConnection();

    let result = false;

    connection.query(`SELECT * FROM items WHERE category='${category}' ORDER BY ${sort} ASC;`, (err, rows) => {
        if (err) {
            throw err;
        }
        result = rows;

        connection.end();
        handleResult(result)
    })
}

app.post('/apply_sort_name',
    bodyParser.urlencoded({
        extended: true
    }),
    (req, res) => {
        fetchItems_name_with_filter(req.body.key, req.body.sort, (result) => {
            res.send(result);
        });
    }
);

app.post('/apply_sort_category',
    bodyParser.urlencoded({
        extended: true
    }),
    (req, res) => {
        fetchItems_category_with_filter(req.body.key, req.body.sort, (result) => {
            res.send(result);
        });
    }
);

app.get('/edit_profile', (req, res) => {
    res.sendFile(path.join(htmlPath + "/edit_profile.html"))
})

app.get('/change_password', (req, res) => {
    res.sendFile(path.join(htmlPath + '/change_password.html'))
})

app.post('/edit_email', (req, res) => {
    let connection = createConnection();

    connection.query(`UPDATE users SET email = '${req.body.newEmail}' WHERE userid = '${req.session.userid}';`, (err) => {
        if (err) {
            throw err;
        }
        connection.end();
        res.send(true);
    });
})

app.post('/edit_first_name', (req, res) => {
    let connection = createConnection();

    connection.query(`UPDATE users SET firstName = '${req.body.newFirstName}' WHERE userid = '${req.session.userid}';`, (err) => {
        if (err) {
            throw err;
        }
        connection.end();
        res.send(true);
    });
})

app.post('/edit_last_name', (req, res) => {
    let connection = createConnection();

    connection.query(`UPDATE users SET lastName = '${req.body.newLastName}' WHERE userid = '${req.session.userid}';`,
    (err) => {
        if (err) {
            throw err;
        }
        connection.end();
        res.send(true);
    });
})

app.post('/edit_address', (req, res) => {
    let connection = createConnection();

    connection.query(`UPDATE users SET address = '${req.body.newAddress}' WHERE userid = '${req.session.userid}';`, (err) => {
        if (err) {
            throw err;
        }
        connection.end();
        res.send(true);
    });
})

app.post('/change_password', (req, res) => {
    let connection = createConnection();

    connection.query(`UPDATE users SET password = '${req.body.newPassword}' WHERE userid = '${req.session.userid}';`, (err) => {
        if (err) {
            throw err;
        }
        connection.end();
        res.send(true);
    });
})


app.post('/add_item', (req, res) => {
    let connection = createConnection();

    connection.query(`INSERT INTO items (itemName, price, img, brand, itemAvailability) VALUES ('${req.body.newItem}', '${req.body.newItemPrice}', 'Null', '${req.body.newItemStore}', 'available');`, (err) => {
        if (err) {
            throw err;
        }
        connection.end();
        res.send(true);
    });
})


app.get('/add_item', (req, res) => {
    res.sendFile(path.join(htmlPath + "/user_add_item.html"))
})

app.get('/update_item', (req, res) => {
    res.sendFile(path.join(htmlPath + "/update_item.html"))
})

app.post('/update_item', (req, res) => {
    let connection = createConnection();

    connection.query(`UPDATE items SET price = '${req.body.newPrice}' WHERE itemName = '${req.body.itemName}' AND brand = '${req.body.itemStore}';`, (err) => {
        if (err) {
            throw err;
        }
        connection.end();
        res.send(true);
    });
})


app.use((req, res) => {
    res.status(404);

    res.sendFile(path.join(htmlPath + '/404.html'));
})

app.use(function(err, req, res) {
    res.status(err.status || 500);
    console.log(err);
    res.sendFile(path.join(htmlPath + '/500.html'));
});
