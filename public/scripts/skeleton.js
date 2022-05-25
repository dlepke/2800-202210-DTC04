/**
 * Loading the skeleton on the html page.
 */

function loadSkeleton(){
    console.log("working")
    $('#navbarPlaceholder').load('../text/nav.html');
    $('#footerPlaceholder').load('../text/footer.html');
}

function setup(){
    loadSkeleton(); 
}

$(document).ready(setup);