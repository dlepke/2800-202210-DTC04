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
    $("#results_display").append(`<a href="/product/${item.itemId}"><div id=${item.itemId} class=items> 
    <div class="item_img"><img src=""></div>
    <div class="item_info">${item.itemName}<br>
    ${item.price}<br>
    ${item.brand}</div></div>
    </a><hr>`)
}

function apply_sort(){
    select = document.getElementById("sort_options");
    sort = select.options[select.selectedIndex].value;
    //checkedValue = testing.filter(":checked").val();
    //console.log(testing);
    //console.log(sort);
    $.ajax({
        url:`https://dtc04-foodbuddy.herokuapp.com/apply_sort`,
        type: "post",
        data:{
            name: keyword,
            sort: sort
        },
        success: apply_filter
    })
}

function apply_filter(data){
    console.log(data);
    $("#results_display").empty();
    availability = $("input[name=product_available]").filter(":checked").val();
    store = $("input[name=store]").filter(":checked").val();
    console.log(availability);
    //console.log(availability == undefined);
    for(count = 0; count < data.length; count++){
        if((availability == data[count].itemAvailability || availability === undefined) && (store == data[count].brand.toLowerCase() || store == undefined)){
            display_item(data[count]);
            //console.log(data[count].itemAvailability == availability)
            //console.log(availability === undefined)
        }
    }
    
}

function setup(){
    $("#apply_filter").click(apply_sort);
}

$(document).ready(setup);