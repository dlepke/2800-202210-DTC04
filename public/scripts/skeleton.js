//---------------------------------------------------
// This function loads the parts of your skeleton 
// (navbar, footer, and other things) into html doc. 
//---------------------------------------------------
function loadSkeleton(){
    console.log("working")
    $('#navbarPlaceholder').load('../text/nav.html');
    $('#footerPlaceholder').load('../text/footer.html');
}

function change_css(){
    //console.log($(this).attr("id"));
    icon_type = $(this).attr("id");
    if(icon_type == "home"){
        $("#home").css("color", "rgb(116, 173, 122)")
        $("#search").css("color", "rgb(129, 129, 129)")
        $("#watchlist").css("color", "rgb(129, 129, 129)")
    }else if(icon_type == "search"){
        $("#search").css("color", "rgb(116, 173, 122)")
        $("#home").css("color", "rgb(129, 129, 129)")
        $("#watchlist").css("color", "rgb(129, 129, 129)")
    }else{
        $("#watchlist").css("color", "rgb(116, 173, 122)")
        $("#search").css("color", "rgb(129, 129, 129)")
        $("#home").css("color", "rgb(129, 129, 129)")
    }
}

function setup(){
    loadSkeleton(); 
    $("body").on("click", ".single_icon", change_css)
}

$(document).ready(setup);