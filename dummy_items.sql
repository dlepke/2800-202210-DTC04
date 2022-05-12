/* create the user database on your local device;
use the following commands (assuming you already have mysql set up)
if you don't have mysql set up and you have a mac, you can install it through homebrew
if you don't know/have homebrew... idk google it

> mysql.server start
> mysql
> use Users;

this will put you in a mysql shell (I think that's what it's called?)
then copy paste this sql into it directly:
 */

/* if you need to reset your database table, use this line: */
-- DROP TABLE Users;


-- CREATE DATABASE IF NOT EXISTS Foodbuddy;

CREATE TABLE IF NOT EXISTS Items (
    itemId int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    itemName varchar(50),
    price int,
    brand varchar(50),
    distance int
);


/* some sample items to test with */
INSERT INTO Items (itemId, itemName, price, brand, distance) VALUES (
    001, 'banana', 1, 'Costco', 2
);

INSERT INTO Items (itemId, itemName, price, brand, distance) VALUES (
    002, 'banana', 2, 'Walmart', 1
);

INSERT INTO Items (itemId, itemName, price, brand, distance) VALUES (
    003, 'banana', 3, 'TNT', 3
);

INSERT INTO Items (itemId, itemName, price, brand, distance) VALUES (
    004, 'strawberry', 1, 'Costco', 4
);

INSERT INTO Items (itemId, itemName, price, brand, distance) VALUES (
    005, 'apple', 1, 'TNT', 3
);

