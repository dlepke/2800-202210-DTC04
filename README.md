# 2800-202210-DTC04: FoodBuddy

## Table of Contents

* [Project Description](#project-description)
* [Technologies Used](#technologies-used)
* [Project Contents](#project-contents)
* [How to Run This Project](#how-to-run-this-project)
    * [Preparation](#preparation)
    * [Setup](#setup)
* [The Product](#the-product)
* [Credits](#credits)
* [Our Team](#our-team)

## Project Description
Our team DTC-04 developed FoodBuddy to help low-income people to save money by providing easy access to (user-updated) grocery price information, and providing the ability to compare prices for items across stores.

## Technologies Used

To build FoodBuddy, we used:
* Visual Studio Code IDE
* HTML
* CSS
* JavaScript
* JQuery
* Node
* Express (to build the server)
    * Express-session (to manage user sessions)
    * Cookie-parser (to support session management)
    * EJS (to build view templates)
* Dotenv (to manage environment variables between local development and Heroku deploys)
* MySQL (with ClearDB to integrate with Heroku)
* Heroku

## Project Contents

<pre>
├── package-lock.json
├── package.json
├── public
│   ├── HTML
│   │   ├── Watchlist.html
│   │   ├── account_list.html
│   │   ├── admin_dashboard.html
│   │   ├── admin_login.html
│   │   ├── change_password.html
│   │   ├── create_account.html
│   │   ├── edit_profile.html
│   │   ├── itemslist.html
│   │   ├── results.html
│   │   ├── search.html
│   │   ├── sign_in.html
│   │   ├── template.html
│   │   ├── update_item.html
│   │   ├── user_add_item.html
│   │   └── user_profile.html
│   ├── images
│   │   ├── Foodbuddy.png
│   │   ├── banana-background.jpeg
│   │   ├── banana.png
│   │   ├── bread.jpeg
│   │   ├── dairy.jpeg
│   │   ├── dairy.png
│   │   ├── foodbuddy-logo-icononly.png
│   │   ├── foodbuddy-logo-textonly.png
│   │   ├── foodbuddy-logo.png
│   │   ├── gascans-cart.png
│   │   ├── meat.jpeg
│   │   ├── meat.png
│   │   ├── produce.jpeg
│   │   ├── seafood.jpeg
│   │   └── snack.jpeg
│   ├── scripts
│   │   ├── account_list.js
│   │   ├── add_item.js
│   │   ├── change_password.js
│   │   ├── display_results.js
│   │   ├── easter_egg.js
│   │   ├── edit_profile.js
│   │   ├── itemlist.js
│   │   ├── product.js
│   │   ├── search.js
│   │   ├── skeleton.js
│   │   ├── update_item.js
│   │   └── watchlist.js
│   ├── styles
│   │   ├── add_item.css
│   │   ├── admin_acc_items.css
│   │   ├── admin_dash.css
│   │   ├── create_account_style.css
│   │   ├── easter_egg.css
│   │   ├── edit_profile.css
│   │   ├── productview.css
│   │   ├── results.css
│   │   ├── search.css
│   │   ├── skeleton.css
│   │   ├── update_item.css
│   │   ├── user_profile_style.css
│   │   └── watchlist.css
│   └── text
│       ├── footer.html
│       └── nav.html
├── server.js
├── users.sql
└── views
    └── productview.ejs
</pre>


## How to Run This Project

To get this project running on your local device, do the following:

### Preparation

Ensure you have the following installed on your device:

* JavaScript
* Node
* Visual Studio Code
* MySQL (if you are using a Mac, you can install this through Homebrew)
    * Ensure you have your MySQL server running, too; you can do this on Mac by entering ```mysql.server start``` into your Terminal

### Setup

Once your setup is ready, follow these steps to get the project running locally:

1. Fork the repo on GitHub
2. Clone the repo to your local device
3. Open the project in Visual Studio Code
4. Open a new Terminal in Visual Studio Code; it will automatically put you in the project repo
5. Set up the FoodBuddy database in your MySQL shell with the following commands:
    * ```mysql``` -- opens the MySQL shell
    * ```CREATE DATABASE IF NOT EXISTS FoodBuddy;``` -- creates the FoodBuddy database for us to use
    * Follow [these instructions](https://www.digitalocean.com/community/tutorials/how-to-create-a-new-user-and-grant-permissions-in-mysql) to set up a new user in your database (you may also choose to use your root user)
        * If you create a new user, ensure you follow the steps to grant the new user permissions to create, alter, drop, insert, update, delete, and select from the FoodBuddy database
    * ```\q``` -- exits the MySQL shell
6. Create a .env file in the main folder of the project repo
    * Create the following variables in the .env file in the format VAR_NAME=VALUE, one per line
        * CLEARDB_DATABASE_URL=mysql://(your username here):(your user password here)@127.0.0.1/foodbuddy
        * PORT=5050
        * DB_PORT=3306
    * The database URL will be used in your local environment, and is in the format:
     (database type)://(database username):(database password)@(host url)/(database name)
7. Ensure you uncomment line 246 in server.js - this will call a string of functions to create the sample database tables for users, items, and the (empty) user watchlists
8. Run the command: ```npm install```
9. Run the command: ```nodemon start```
10. Open the following link in your browser: [localhost:5050](localhost:5050)
11. Try out the website!

## The Product

With FoodBuddy, you can:
* Search for grocery items
* Filter by which store you'd like to check
* View a product page with further details on the item you searched for
* View similar items to what you searched for
* Create an account
* Add items to your 'Watchlist', so you can easily check frequently purchased items to see if the price has changed
* Update incorrect/out-of-date prices for items
* Add new items


## Credits

To build our side navigation menu, we used [this example](https://www.w3schools.com/howto/howto_js_sidenav.asp)

Our logo was designed by our wonderful teammate, Kim Chung!

We also received troubleshooting advice from our friend, Liam Gray!

## Our Team

Members of our group:
* Deanna Lepke 
    * [GitHub](https://github.com/dlepke)
    * [LinkedIn](https://www.linkedin.com/in/deanna-lepke-26317222b/)
* Ray Zhang
    * [GitHub](https://github.com/rzhangbcit)
    * [LinkedIn](https://www.linkedin.com/in/ray-zhang-922938145/)
* Matthew Puyat
    * [GitHub](https://github.com/matirix)
    * [LinkedIn](https://www.linkedin.com/in/matthew-puyat-112318195/)
* Kim Chung
    * [GitHub](https://github.com/kimmm-c)
    * [LinkedIn](https://www.linkedin.com/in/kim-chung-874917110/)