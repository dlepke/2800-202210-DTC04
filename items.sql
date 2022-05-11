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
    name varchar(50),
    price varchar(50),
    img varchar(50),
    location varchar(50),
    id varchar(50),
);


/* some sample users to test with */
INSERT INTO Items (name, price, img, location, id) VALUES (
    'bananas', '$1', 'banana.png', 'Walmart', '1'
);

INSERT INTO Items (name, price, img, location, id) VALUES (
    'bananas', '$2', 'banana.png', 'Superstore', '2'
);

INSERT INTO Items (name, price, img, location, id) VALUES (
    'bananas', '$.90', 'banana.png', 'Costco', '3'
);

INSERT INTO Items (name, price, img, location, id) VALUES (
    'eggs', '$5', 'eggs.png', 'Superstore', '4'
);

INSERT INTO Items (name, price, img, location, id) VALUES (
    'eggs', '$6', 'eggs.png', 'Walmart', '5'
);

INSERT INTO Items (name, price, img, location, id) VALUES (
    'chocolate', '$4', 'chocolate.png', 'Superstore', '6'
);

INSERT INTO Items (name, price, img, location, id) VALUES (
    'chocolate', '$5', 'chocolate.png', 'Superstore', '7'
);

INSERT INTO Items (name, price, img, location, id) VALUES (
    'toilet_paper', '$8', 'toiletpaper.png', 'Walmart', '8'
);

INSERT INTO Items (name, price, img, location, id) VALUES ( 
    'toilet_paper', '$7.90', 'toiletpaper.png', 'Costco', '9'
);

INSERT INTO Items (name, price, img, location, id) VALUES (
    'meat', '$4', 'meat.png', 'SaveOnFoods', '10'
);