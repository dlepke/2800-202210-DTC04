/* create the user database on your local device;
use the following commands (assuming you already have mysql set up)
if you don't have mysql set up and you have a mac, you can install it through homebrew
if you don't know/have homebrew... idk google it

> mysql.server start
> mysql

this will put you in a mysql shell (I think that's what it's called?)
then copy paste this sql into it directly:
 */


CREATE DATABASE IF NOT EXISTS Users;

CREATE TABLE IF NOT EXISTS Users (
    username varchar(50),
    password varchar(50)
);


/* some sample users to test with */
INSERT INTO Users (username, password) VALUES (
    'user1', 'pass1'
);

INSERT INTO Users (username, password) VALUES (
    'user2', 'pass2'
);

INSERT INTO Users (username, password) VALUES (
    'user3', 'pass3'
);

INSERT INTO Users (username, password) VALUES (
    'user4', 'pass4'
);

INSERT INTO Users (username, password) VALUES (
    'user5', 'pass5'
);