function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}


function populateWatchlist() {
    $.get('/watchlist_items', (result) => {
        console.log(result);

        result.forEach((item) => {
            console.log(item);

            let itemCard = `<div class="product shadow">
            <div class="productimg shadow-sm">
                <a href="/product/${item.itemid}">
                    <div class="product_img"> 
                        <img src="${item.img}" width="100%">
                    </div>
                </a>
            </div>
            <div class="product_textbox">
                <h3 class="product_title">
                    ${capitalize(item.itemName)}
                </h3>
                <div class="product_description">
                    ${item.brand}

                </div>
            </div>
        </div>`

        $("#items").append(itemCard);
        })
    })
}

$(document).ready(() => {
    populateWatchlist();
})