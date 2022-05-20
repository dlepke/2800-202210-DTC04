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
    img varchar(1000),
    brand varchar(50),
    itemId varchar(50),
    itemAvailability varchar(50),
    storeAddress varchar(100),
    category varchar(50)
);


/* some sample users to test with */
-- INSERT INTO Items (itemName, price, img, brand, itemId, itemAvailability ) VALUES (
--     'bananas', '$1', 'banana.png', 'Walmart', '1', 'available'
-- );

-- INSERT INTO Items (itemName, price, img, brand, itemId, itemAvailability ) VALUES (
--     'bananas', '$2', 'banana.png', 'Superstore', '2', 'unavailable'
-- );

-- INSERT INTO Items (itemName, price, img, brand, itemId, itemAvailability ) VALUES (
--     'bananas', '$.90', 'banana.png', 'Costco', '3', 'available'
-- );

-- INSERT INTO Items (itemName, price, img, brand, itemId, itemAvailability ) VALUES (
--     'eggs', '$5', 'eggs.png', 'Superstore', '4', 'unavailable'
-- );

-- INSERT INTO Items (itemName, price, img, brand, itemId, itemAvailability ) VALUES (
--     'eggs', '$6', 'eggs.png', 'Walmart', '5', 'available'
-- );

-- INSERT INTO Items (itemName, price, img, brand, itemId, itemAvailability ) VALUES (
--     'chocolate', '$4', 'chocolate.png', 'Superstore', '6', 'available'
-- );

-- INSERT INTO Items (itemName, price, img, brand, itemId, itemAvailability ) VALUES (
--     'chocolate', '$5', 'chocolate.png', 'Superstore', '7', 'unavailable'
-- );

-- INSERT INTO Items (itemName, price, img, brand, itemId, itemAvailability ) VALUES (
--     'toilet_paper', '$8', 'toiletpaper.png', 'Walmart', '8', 'available'
-- );

-- INSERT INTO Items (itemName, price, img, brand, itemId, itemAvailability ) VALUES (
--     'toilet_paper', '$7.90', 'toiletpaper.png', 'Costco', '9', 'unavailable'
-- );

-- INSERT INTO Items (itemName, price, img, brand, itemId, itemAvailability ) VALUES (
--     'meat', '$4', 'meat.png', 'SaveOnFoods', '10', 'unavailable'
-- );

INSERT INTO Items (itemName, price, img, brand, itemId, itemAvailability, storeAddress, category ) VALUES ('bananas', '$1', 'https://images.costcobusinessdelivery.com/ImageDelivery/imageService?profileId=12027981&itemId=30669&recipeName=680', 'Walmart', '1', 'available', '9251 Alderbridge Way, Richmond, BC V6X 0N1', 'produce');
INSERT INTO Items (itemName, price, img, brand, itemId, itemAvailability, storeAddress, category ) VALUES ('bananas', '$2', 'https://i5.walmartimages.com/asr/41305aa3-3de8-4bab-80e9-484cf63cadc5_1.e46fb74bc2e4fa0751ad18233d4d4854.jpeg?odnHeight=450&odnWidth=450&odnBg=ffffff', 'Superstore', '2', 'unavailable', '4651 No. 3 Rd, Richmond, BC V6X 2C4', 'produce');
INSERT INTO Items (itemName, price, img, brand, itemId, itemAvailability, storeAddress, category ) VALUES ('bananas', '$0.90', 'https://i0.wp.com/superstore.mangopoint.in/wp-content/uploads/2019/10/banana-karpuravalli-500x500.jpg?fit=330%2C330&ssl=1', 'Costco', '3', 'available', '9151 Bridgeport Rd, Richmond, BC V6X 3L9', 'produce');
INSERT INTO Items (itemName, price, img, brand, itemId, itemAvailability, storeAddress, category ) VALUES ('eggs', '$5', 'https://www.verywellhealth.com/thmb/kXxeAfjFaNtlyEYmCRtKxoLbtCY=/2880x1920/filters:no_upscale():max_bytes(150000):strip_icc()/uncover-hidden-egg-ingredients-1324275-primary-recirc-3cf777cca7044ee1992cc0a27d6449fa.jpg', 'Superstore', '4', 'unavailable', '4651 No. 3 Rd, Richmond, BC V6X 2C4', 'protein');
INSERT INTO Items (itemName, price, img, brand, itemId, itemAvailability, storeAddress, category ) VALUES ('eggs', '$6', 'https://www.unlockfood.ca/EatRightOntario/media/Website-images-resized/All-About-Eggs-resized.jpg', 'Walmart', '5', 'available', '9251 Alderbridge Way, Richmond, BC V6X 0N1', 'protein');
INSERT INTO Items (itemName, price, img, brand, itemId, itemAvailability, storeAddress, category ) VALUES ('chocolate', '$4', 'https://perfectdailygrind.com/wp-content/uploads/2020/04/Hs_5Ce8ecmXodh-AdEVHyT07irPaZ-zAAhYkKYRJgS5CVzHKs0cAAdyeAF9TIgyh4KI5gqYmyuIDwJnf2f9wCdNvJ5WbQOlSoRr5zmmzMalyR1-RQxvlOtTZkJq9G_GPUiVZ6_WX-1-1.jpeg', 'Superstore', '6', 'available', '3185 Grandview Hwy, Vancouver, BC V5M 2E9', 'snack');
INSERT INTO Items (itemName, price, img, brand, itemId, itemAvailability, storeAddress, category ) VALUES ('chocolate', '$5', 'https://www.heart.org/-/media/Images/News/2019/February-2019/0212Chocolate_SC.png', 'Superstore', '7', 'unavailable', '3185 Grandview Hwy, Vancouver, BC V5M 2E9', 'snack');
INSERT INTO Items (itemName, price, img, brand, itemId, itemAvailability, storeAddress, category ) VALUES ('toilet paper', '$8', 'https://www.mayrand.ca/globalassets/mayrand/catalog-mayrand/entretien/40414-papier-hygienique-mega-264-feuilles-x12-charmin.png', 'Walmart', '8', 'available', '9251 Alderbridge Way, Richmond, BC V6X 0N1', 'household');
INSERT INTO Items (itemName, price, img, brand, itemId, itemAvailability, storeAddress, category ) VALUES ('toilet paper', '$7.90', 'https://images.heb.com/is/image/HEBGrocery/000912650', 'Costco', '9', 'unavailable', '9151 Bridgeport Rd, Richmond, BC V6X 3L9', 'household');
INSERT INTO Items (itemName, price, img, brand, itemId, itemAvailability, storeAddress, category ) VALUES ('chicken', '$18.99', 'https://i.pinimg.com/550x/ec/30/7b/ec307bfa3ded904a6eda6e0d668531b3.jpg', 'Safeway', '10', 'unavailable', '8671 No 1 Rd, Richmond, BC V7C 1V2', 'meat');
INSERT INTO Items (itemName, price, img, brand, itemId, itemAvailability, storeAddress, category ) VALUES ('beef', '$33.72', 'https://hips.hearstapps.com/hmg-prod/images/delish-roast-beef-horizontal-1540505165.jpg', 'Walmart', '11', 'available', '9251 Alderbridge Way, Richmond, BC V6X 0N1', 'meat');
INSERT INTO Items (itemName, price, img, brand, itemId, itemAvailability, storeAddress, category ) VALUES ('salmon', '$32.59', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQME7frMp2eIbAaNGoi23UfaF4-Bi0wZ__C1w&usqp=CAU', 'Superstore', '12', 'unavailable', '4651 No. 3 Rd, Richmond, BC V6X 2C4', 'seafood');
INSERT INTO Items (itemName, price, img, brand, itemId, itemAvailability, storeAddress, category ) VALUES ('mussel', '$15.99', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1ivU4IWGsFjfG4PlMzcLiTgUDbajkvDuFjw&usqp=CAU', 'Costco', '13', 'available', '9151 Bridgeport Rd, Richmond, BC V6X 3L9', 'seafood');
INSERT INTO Items (itemName, price, img, brand, itemId, itemAvailability, storeAddress, category ) VALUES ('milk', '$4.99', 'https://i5.walmartimages.ca/images/Enlarge/611/022/6000204611022.jpg', 'Superstore', '14', 'unavailable', '4651 No. 3 Rd, Richmond, BC V6X 2C4', 'dairy');
INSERT INTO Items (itemName, price, img, brand, itemId, itemAvailability, storeAddress, category ) VALUES ('milk', '$5.42', 'https://www.lactaid.com/sites/lactaid_us/files/styles/jjbos_adaptive_images_generic-desktop/public/product-images/whole_milk.jpg', 'Walmart', '15', 'available', '9251 Alderbridge Way, Richmond, BC V6X 0N1', 'dairy');
INSERT INTO Items (itemName, price, img, brand, itemId, itemAvailability, storeAddress, category ) VALUES ('cheese', '$6.99', 'https://myculturedpalate.com/wp-content/uploads/2010/01/Homemade-Mozzarella-Cheese-sliced-500x375.jpg', 'Superstore', '16', 'available', '3185 Grandview Hwy, Vancouver, BC V5M 2E9', 'dairy');
INSERT INTO Items (itemName, price, img, brand, itemId, itemAvailability, storeAddress, category ) VALUES ('reese', '$2', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjeIWAefE1s00F2Gk6aEeDHpJNY4wADWhVdYUkhR99ZRQd_ghf4CuImowuGXe_9sVIsqo&usqp=CAU', 'Superstore', '17', 'unavailable', '3185 Grandview Hwy, Vancouver, BC V5M 2E9', 'snack');
INSERT INTO Items (itemName, price, img, brand, itemId, itemAvailability, storeAddress, category ) VALUES ('bread', '$5.99', 'https://www.kingarthurbaking.com/sites/default/files/2020-02/the-easiest-loaf-of-bread-youll-ever-bake.jpg', 'Walmart', '18', 'available', '9251 Alderbridge Way, Richmond, BC V6X 0N1', 'bakery');
INSERT INTO Items (itemName, price, img, brand, itemId, itemAvailability, storeAddress, category ) VALUES ('croissant', '$7.90', 'https://www.theflavorbender.com/wp-content/uploads/2020/05/French-Croissants-SM-2363.jpg', 'Costco', '19', 'unavailable', '9151 Bridgeport Rd, Richmond, BC V6X 3L9', 'bakery');
INSERT INTO Items (itemName, price, img, brand, itemId, itemAvailability, storeAddress, category ) VALUES ('prawns', '$17.99', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAAz3M_kM0x6dte8xiwD8li8YAuUOcazfUUw&usqp=CAU', 'Safeway', '20', 'unavailable', '8671 No 1 Rd, Richmond, BC V7C 1V2', 'seafood');
