product = $("#name").text()
console.log(product)

function colorcode(availability){
    if (availability == "available") {
        $(".availability").css("color", "green")
    } else if (availability == "unavailable") {
        $(".availability").css("color", "red")
    }
}


fetch(`/getallproducts/${product}`)
.then(response => response.json())
.then(data => {
    console.log(data)
    data.forEach((items) => {
        $(document).ready(function() {
            console.log(items.itemAvailability)
            colorcode(items.itemAvailability)
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