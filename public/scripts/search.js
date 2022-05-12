function search_item() {
    localStorage.setItem("keyword", $("#search_input").val());
}


function setup() {
    $("#search_button").click(search_item);
}

$(document).ready(setup);