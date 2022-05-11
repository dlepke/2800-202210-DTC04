keyword = localStorage.getItem("keyword");
console.log(keyword);

fetch('/search_item')
    .then(response => response.json())
    .then(data => {
        console.log(data)

        data.forEach((item) => {
            //console.log(item.price);
            if (item.itemName == keyword.toLowerCase()) {
                display_item(item);
            }
        })
    });

function display_item(item) {
    $("#results_display").append(`<div id=${item.itemId} class=items> 
    <div class="item_img"><img src=""></div>
    <div class="item_info">${item.itemName}<br>
    $${item.price}</div></div>
    <hr>`)
}
