//---------------------------------------------------
// This function loads the parts of your skeleton 
// (navbar, footer, and other things) into html doc. 
//---------------------------------------------------
function loadSkeleton(){
    console.log("working")
    $('#navbarPlaceholder').load('../HTML/text/nav.html');
    $('#footerPlaceholder').load('../HTML/text/footer.html');
}
loadSkeleton(); 
