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
DROP TABLE Items;


CREATE DATABASE IF NOT EXISTS Items;

CREATE TABLE IF NOT EXISTS Items (
    itemName varchar(50),
    price varchar(50),
    img varchar(50),
    brand varchar(50),
    itemId varchar(50),
    itemAvailability varchar(50)
);


/* some sample users to test with */
INSERT INTO Items (itemName, price, img, brand, itemId, itemAvailability ) VALUES (
    'bananas', '$1', 'banana.png', 'Walmart', '1', 'available'
);

INSERT INTO Items (itemName, price, img, brand, itemId, itemAvailability ) VALUES (
    'bananas', '$2', 'banana.png', 'Superstore', '2', 'unavailable'
);

INSERT INTO Items (itemName, price, img, brand, itemId, itemAvailability ) VALUES (
    'bananas', '$.90', 'banana.png', 'Costco', '3', 'available'
);

INSERT INTO Items (itemName, price, img, brand, itemId, itemAvailability ) VALUES (
    'eggs', '$5', 'eggs.png', 'Superstore', '4', 'unavailable'
);

INSERT INTO Items (itemName, price, img, brand, itemId, itemAvailability ) VALUES (
    'eggs', '$6', 'eggs.png', 'Walmart', '5', 'available'
);

INSERT INTO Items (itemName, price, img, brand, itemId, itemAvailability ) VALUES (
    'chocolate', '$4', 'chocolate.png', 'Superstore', '6', 'available'
);

INSERT INTO Items (itemName, price, img, brand, itemId, itemAvailability ) VALUES (
    'chocolate', '$5', 'chocolate.png', 'Superstore', '7', 'unavailable'
);

INSERT INTO Items (itemName, price, img, brand, itemId, itemAvailability ) VALUES (
    'toilet_paper', '$8', 'toiletpaper.png', 'Walmart', '8', 'available'
);

INSERT INTO Items (itemName, price, img, brand, itemId, itemAvailability ) VALUES (
    'toilet_paper', '$7.90', 'toiletpaper.png', 'Costco', '9', 'unavailable'
);

INSERT INTO Items (itemName, price, img, brand, itemId, itemAvailability ) VALUES (
    'meat', '$4', 'meat.png', 'SaveOnFoods', '10', 'unavailable'
);