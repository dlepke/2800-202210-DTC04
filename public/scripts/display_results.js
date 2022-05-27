let keyword = localStorage.getItem("keyword");
console.log(keyword);
let search_by = null

/**
 * Check the keyword to know if the user search for items by name or category.
 */

function check_keyword() {
    if (keyword == "produce" || keyword == "dairy" || keyword == "meat" || keyword == "seafood" || keyword == "snack" || keyword == "bakery") {
        get_items_by_category(keyword);
        search_by = 'category'
    } else {
        get_items_by_name(keyword);
        search_by = 'name'
    }
}

/**
 * Fetch the items by name from the database.
 * @param {string} keyword - A string reresenting the item name.
 */

function get_items_by_name(keyword) {
    $.ajax({
        url: `https://dtc04-foodbuddy.herokuapp.com/search_item_by_name`,
        type: "post",
        data: {
            name: keyword
        },
        success: process_items
    })
}

/**
 * Fetch the items by category from the database.
 * @param {string} keyword - A string reresenting the items category.
 */

function get_items_by_category(keyword) {
    $.ajax({
        url: `https://dtc04-foodbuddy.herokuapp.com/search_item_by_category`,
        type: "post",
        data: {
            category: keyword
        },
        success: process_items
    })
}

/**
 * Determine what to display on the webstie depent on the number of items retrieved from the database.
 * @param {Object[]} items - The items fetched from the database.
 */

function process_items(items) {
    if (items.length == 0) {
        $("#results_display").append("<p id='no_product'><i>No product found</i></p>")
    } else {
        $("#results_display").empty();
        for (let count = 0; count < items.length; count++) {
            display_item(items[count]);
        }
    }
}

/**
 * Validate user input and search for items by name.
 */

function search_item() {
    $("#error_message").remove();
    reset_filter();
    if ($("#search_text").val() == "") {
        $("#search_bar").append("<p id='error_message'><i>Enter search keyword to proceed</i></p>")
    } else {
        localStorage.setItem("keyword", $("#search_text").val());
        keyword = localStorage.getItem("keyword");
        $("#results_display").empty();
        get_items_by_name(keyword);
        search_by = 'name'
    }
}

/**
 * Display every item on the website.
 * @param {Object} item - An object representing an item with details like name/price/location.
 */

function display_item(item) {
    $("#results_display").append(`<a href="/product/${item.itemid}"><div id=${item.itemid} class=items> 
    <div class="item_img"><img class ="pic" src="${item.img}"></div>
    <div class="item_info"><span>${capitalize(item.itemName)}</span><br>
    <span id="item_price"><b>${item.price}</b></span><br>
    <span>${item.brand}</span></div></div>
    </a><hr>`)
}

/**
 * Fetch the items from database ascendingly by price.
 */

function apply_sort() {
    let select = document.getElementById("sort_options");
    let sort = select.options[select.selectedIndex].value;
    $.ajax({
        url: `https://dtc04-foodbuddy.herokuapp.com/apply_sort_${search_by}`,
        type: "post",
        data: {
            key: keyword,
            sort: sort
        },
        success: apply_filter
    }).then(() => {
        $("#filter_form").css("display", "none");
    })
}

/**
 * Filter the items by store or availability.
 * @param {Object[]} data - The items fetched from the database.
 */

function apply_filter(data) {
    console.log(data);
    $("#results_display").empty();
    let availability = $("input[name=product_available]").filter(":checked").val();
    let store = $("input[name=store]").filter(":checked").val();
    console.log(availability);
    for (let count = 0; count < data.length; count++) {
        if ((availability == data[count].itemAvailability || availability === undefined) && (store == data[count].brand.toLowerCase() || store == undefined)) {
            display_item(data[count]);
        }
    }

}

/**
 * Capitalize a word.
 * @param {string} word - Any word.
 * @returns {string} The capitalized word.
 */

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

/**
 * Toggle the filter on and off when filter button is clicked.
 */

function toggle_filter() {
    if ($("#filter_form").css("display") == "none") {
        $("#filter_form").css("display", "");
    } else {
        $("#filter_form").css("display", "none");
    }
}

/**
 * Reset the filter form, clear out the checked radio buttons.
 */

function reset_filter() {
    $(".radio_buttons").prop("checked", false);
}

function setup() {
    $("#apply_filter").click(apply_sort);
    $("#toggle_filter").click(toggle_filter);
    $("#reset").click(reset_filter);
    $("#search_submit").click(search_item);
    check_keyword();
}

$(document).ready(setup);
