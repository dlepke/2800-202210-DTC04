function addItem() {
    itemName = document.getElementById("item_name").value
    itemPrice = document.getElementById("price").value
    storeName = document.getElementById("store").value
    avail = "available"
    name_required = document.getElementById("name_required")
    price_required = document.getElementById("price_required")
    store_required = document.getElementById("store_required")

    if (itemName === null) {
        name_required.style.visibility = "visible";
    } else if (itemPrice === null) {
        price_required.style.visibility = "visible";
    } else if (storeName === null) {
        store_required.style.visibility = "visible";
    } else {
        $.post('/add_item', {
            newItem: itemName,
            newItemPrice: itemPrice,
            newItemStore: storeName
        });
    }
}