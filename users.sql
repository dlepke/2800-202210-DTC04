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
DROP TABLE Users;


CREATE DATABASE IF NOT EXISTS Users;

CREATE TABLE IF NOT EXISTS Users (
    username varchar(50),
    password varchar(50),
    firstName varchar(50),
    lastName varchar(50)
);


/* some sample users to test with */
INSERT INTO Users (username, password, firstName, lastName) VALUES (
    'user1', 'pass1', 'amy', 'adams'
);

INSERT INTO Users (username, password, firstName, lastName) VALUES (
    'user2', 'pass2', 'bob', 'burns'
);

INSERT INTO Users (username, password, firstName, lastName) VALUES (
    'user3', 'pass3', 'carrie', 'carlson'
);

INSERT INTO Users (username, password, firstName, lastName) VALUES (
    'user4', 'pass4', 'diane', 'davidson'
);

INSERT INTO Users (username, password, firstName, lastName) VALUES (
    'user5', 'pass5', 'earl', 'ericson'
);