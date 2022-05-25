/**
 * Assign the project to an employee.
 * @param {Object} employee - The employee who is responsible for the project.
 * @param {string} employee.name - The name of the employee.
 * @param {string} employee.department - The employee's department.
 */


product = $("#name").text()
console.log(product)

/**
 * Capitalize a word.
 * @param {string} word - Any word.
 * @returns {string} The capitalized word.
 */

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

/**
 * Fetch all the similar items from the database and display in 'Similar Product' section on the website.
 */

fetch(`/getallproducts/${product}`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        data.forEach((items) => {
            $(document).ready(function () {
                if (itemejsid != items.itemid) {
                    $("#others").append(
                        `
            <a class="links" href="/product/${items.itemid}">
                <p style="margin-bottom: 0px"> <span class="availability"> ${items.itemAvailability} </span> for ${items.price} at ${items.brand} 
                <i class="material-icons" style="float:right">navigate_next</i>
                </p>
            </a>`)
                }})
        })
    });

/**
 * Check if the item is on watchlist or not.
 * @param {requestCallback} handleResult - The callback that return true if item is on watchlist and false the otherwise.
 * @returns {boolean} Return true if item is on watchlist and false the otherwise.
 */

function isOnWatchlist(handleResult) {
    let itemid = document.location.href.split("product/")[1];

    $.get(`/is_on_watchlist/${itemid}`, (result) => {
        console.log(`is item ${itemid} on user's watchlist: `, result.is_item_on_watchlist);

        if (result.is_item_on_watchlist) {
            handleResult(true);
        } else {
            handleResult(false);
        }
    })
}

$(document).ready(() => {
    isOnWatchlist((isOnWatchlist) => {
        if (isOnWatchlist) {
            $("#favourite-button").css('color', 'red');
        } else {
            $("#favourite-button").css('color', 'rgb(129, 129, 129)');
        }
    });
})

/**
 * When button is clicked, add item to watchlist if item is not on watchlist, or remove item from watchlist if item is already on watchlist.
 */

function addOrRemoveFromWatchlist() {
    isOnWatchlist((isOnWatchlist) => {
        if (isOnWatchlist) {
            removeFromWatchlist();
        } else {
            addToWatchlist();
        }
    });
}

/**
 * Add the item to watchlist in the database and change the icon to red indicating item is added.
 */

function addToWatchlist() {
    let itemid = document.location.href.split("product/")[1];

    $.post('/add_to_watchlist', {
        itemid: itemid
    })

    $("#favourite-button").css('color', 'red');
}

/**
 * Remove the item from watchlist in database and change the icon color to grey indicating item is removed from watchlist.
 */

function removeFromWatchlist() {
    let itemid = document.location.href.split("product/")[1];

    $.post('/remove_from_watchlist', {
        itemid: itemid
    })

    $("#favourite-button").css('color', 'rgb(129, 129, 129)');
}