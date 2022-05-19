function search_item() {
    if($("#search_input").val() == ""){
        $(".search").append(`<p id='error_message'><i>Enter search keyword to proceed</i></p>`)
    }else{
        localStorage.setItem("keyword", $("#search_input").val());
        window.location.href = "/results";
    }
}

function search_by_category(){
    //console.log($(this).attr("id"));
    localStorage.setItem("keyword", $(this).attr("id"));
    window.location.href = "/results";
}

function setup() {
    $("#search_button").click(search_item);
    $("body").on("click", ".icon", search_by_category);
}

$(document).ready(setup);