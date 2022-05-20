keyword = localStorage.getItem("keyword");
console.log(keyword);
search_by = null

function check_keyword() {
    if (keyword == "produce" || keyword == "dairy" || keyword == "meat" || keyword == "seafood" || keyword == "snack" || keyword == "bakery") {
        get_items_by_category(keyword);
        search_by = 'category'
    } else {
        get_items_by_name(keyword);
        search_by = 'name'
    }
}

// function fetch_item() {
//     fetch('/search_item')
//         .then(response => response.json())
//         .then(data => {
//             //console.log(data)
//             data.forEach((item) => {
//                 //console.log(item.price);
//                 if (item.itemName == keyword.toLowerCase()) {
//                     display_item(item);
//                 }
//             })
//         });
// }

function get_items_by_name(keyword) {
    $.ajax({
        url: `https://dtc04-foodbuddy.herokuapp.com/search_item_by_name`,
        type: "post",
        data: {
            name: keyword
        },
        success: process_items
    })
    //$.get(`/search_item_by_name/${keyword}`, process_items(items))
}

function get_items_by_category(keyword) {
    $.ajax({
        url: `https://dtc04-foodbuddy.herokuapp.com/search_item_by_category`,
        type: "post",
        data: {
            category: keyword
        },
        success: process_items
    })
    // $.post('/search_item_by_category',
    //     {
    //         category: keyword
    //     },
    //     process_items(items))
}

function process_items(items) {
    if (items.length == 0) {
        $("#results_display").append("<p id='no_product'><i>No product found</i></p>")
    } else {
        //console.log(items);
        $("#results_display").empty();
        for (count = 0; count < items.length; count++) {
            display_item(items[count]);
        }
    }
}

function search_item() {
    //keyword = $("#search_text").val();
    $("#error_message").remove();
    reset_filter();
    if ($("#search_text").val() == "") {
        $("#search_bar").append("<p id='error_message'><i>Enter search keyword to proceed</i></p>")
    } else {
        localStorage.setItem("keyword", $("#search_text").val());
        keyword = localStorage.getItem("keyword");
        //console.log($("#search_text").val());
        $("#results_display").empty();
        //fetch_item();
        get_items_by_name(keyword);
        search_by = 'name'
    }
}

function display_item(item) {
    // console.log(item)
    // console.log(item.itemid)
    $("#results_display").append(`<a href="/product/${item.itemid}"><div id=${item.itemid} class=items> 
    <div class="item_img"><img class ="pic" src="${item.img}"></div>
    <div class="item_info"><span>${capitalize(item.itemName)}</span><br>
    <span id="item_price"><b>${item.price}</b></span><br>
    <span>${item.brand}</span></div></div>
    </a><hr>`)
}

function apply_sort() {
    select = document.getElementById("sort_options");
    sort = select.options[select.selectedIndex].value;
    //checkedValue = testing.filter(":checked").val();
    //console.log(testing);
    //console.log(sort);
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
    // $.post(`/apply_sort_${search_by}`,
    //     {
    //         key: keyword,
    //         sort: sort
    //     },
    //     apply_filter(items)).then(()=>{
    //         $("#filter_form").css("display", "none");
    //     })
}

function apply_filter(data) {
    console.log(data);
    $("#results_display").empty();
    availability = $("input[name=product_available]").filter(":checked").val();
    store = $("input[name=store]").filter(":checked").val();
    console.log(availability);
    //console.log(availability == undefined);
    for (count = 0; count < data.length; count++) {
        if ((availability == data[count].itemAvailability || availability === undefined) && (store == data[count].brand.toLowerCase() || store == undefined)) {
            display_item(data[count]);
            //console.log(data[count].itemAvailability == availability)
            //console.log(availability === undefined)
        }
    }

}

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

function toggle_filter() {
    //console.log($("#filter_form").css("display"));
    if ($("#filter_form").css("display") == "none") {
        $("#filter_form").css("display", "");
    } else {
        $("#filter_form").css("display", "none");
    }
}

function reset_filter() {
    $(".radio_buttons").prop("checked", false);
}

// function change_icon_color() {
//     $("#search").css("color", "rgb(116, 173, 122)")
//     $("#home").css("color", "rgb(129, 129, 129)")
//     $("#watchlist").css("color", "rgb(129, 129, 129)")
// }

function setup() {
    $("#apply_filter").click(apply_sort);
    $("#toggle_filter").click(toggle_filter);
    $("#reset").click(reset_filter);
    $("#search_submit").click(search_item);
    //fetch_item();
    //change_icon_color();
    check_keyword();
}

$(document).ready(setup);

//https://dtc04-foodbuddy.herokuapp.com/ 
//http://localhost:5050/