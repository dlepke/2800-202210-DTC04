product = $("#name").text()
console.log(product)

function colorcode(availability){
    if (availability == "available") {
        $(".availability").css("color", "green")
    } else if (availability == "unavailable") {
        $(".availability").css("color", "red")
    }
}
function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}



fetch(`/getallproducts/${product}`)
.then(response => response.json())
.then(data => {
    console.log(data)
    data.forEach((items) => {
        $(document).ready(function() {
            console.log(items.storeAddress)
            
            // colorcode(items.itemAvailability)
            $("#others").append(
            `
            <a class="links" href="/product/${items.itemid}">
                <p style="margin-bottom: 0px"> <span class="availability"> ${items.itemAvailability} </span> for ${items.price} at ${items.brand} 
                <i class="material-icons" style="float:right">navigate_next</i>
                </p>
            </a>`)


        })
    })
});

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

function addOrRemoveFromWatchlist() {
    isOnWatchlist((isOnWatchlist) => {
        if (isOnWatchlist) {
            removeFromWatchlist();
        } else {
            addToWatchlist();
        }
    });
}

function addToWatchlist() {
    let itemid = document.location.href.split("product/")[1];
    
    $.post('/add_to_watchlist', {
        itemid: itemid
    })

    $("#favourite-button").css('color', 'red');
}

function removeFromWatchlist() {
    let itemid = document.location.href.split("product/")[1];
    
    $.post('/remove_from_watchlist', {
        itemid: itemid
    })

    $("#favourite-button").css('color', 'rgb(129, 129, 129)');
}