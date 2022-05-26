/**
 * Validate user input and update the item information in the database.
 */

function updateItem() {
    itemName = document.getElementById("item_name").value
    itemPrice = document.getElementById("price").value
    storeName = document.getElementById("store").value
    name_required = document.getElementById("name_required")
    price_required = document.getElementById("new_price")
    store_required = document.getElementById("store_required")
    number_required = document.getElementById("number_required")
    confirmation_required = document.getElementById("confirmation_unsucessful")
    item_updated_successfully = document.getElementById("item_updated_successfully")


    if (itemName.trim().length === 0) {
        price_required.style.visibility = "hidden";
        number_required.style.visibility = "hidden";
        store_required.style.visibility = "hidden";
        item_updated_successfully.style.visibility = "hidden";
        name_required.style.visibility = "visible";
        $("#item_name").css({ "border": '#FF0000 1px solid'});
    } else if (storeName.trim().length === 0) {
        name_required.style.visibility = "hidden";
        number_required.style.visibility = "hidden";
        price_required.style.visibility = "hidden";
        item_updated_successfully.style.visibility = "hidden";
        store_required.style.visibility = "visible";
        $("#store").css({ "border": '#FF0000 1px solid'});
    } else if (itemPrice.trim().length === 0) {
        name_required.style.visibility = "hidden";
        store_required.style.visibility = "hidden";
        number_required.style.visibility = "hidden";
        item_updated_successfully.style.visibility = "hidden";
        price_required.style.visibility = "visible";
        $("#price").css({ "border": '#FF0000 1px solid'});
    } else if (isNaN(itemPrice) || itemPrice < 0.05 || itemPrice > 9999) {
        name_required.style.visibility = "hidden";
        store_required.style.visibility = "hidden";
        price_required.style.visibility = "hidden";
        item_updated_successfully.style.visibility = "hidden";
        number_required.style.visibility = "visible";
        $("#price").css({ "border": '#FF0000 1px solid'});

    } else if (!document.getElementById('confirm_yes').checked) {
        name_required.style.visibility = "hidden";
        store_required.style.visibility = "hidden";
        price_required.style.visibility = "hidden";
        item_updated_successfully.style.visibility = "hidden";
        number_required.style.visibility = "hidden";
        $("#confirm_box").css({ "border": '#FF0000 1px solid'});
        confirmation_required.style.visibility = "visible";
    } else {
        $.post('/update_item', {
            itemName: itemName,
            newPrice: '$' + itemPrice,
            itemStore: storeName
        });
        name_required.style.visibility = "hidden";
        store_required.style.visibility = "hidden";
        price_required.style.visibility = "hidden";
        number_required.style.visibility = "hidden";
        $("#confirmation_unsucessful").hide();
        item_updated_successfully.style.visibility = "visible";


    }
}