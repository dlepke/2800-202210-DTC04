product = $("#name").text()
console.log(product)
fetch(`/getallproducts/${product}`)
.then(response => response.json())
.then(data => {
    console.log(data)
    data.forEach((items) => {
        $(document).ready(function() {
            $("#others").append(
            `
            <a href="/product/${items.itemid}">
                <p style="margin-bottom: 0px"> ${items.itemAvailability} for ${items.price} at ${items.brand} </p>
            </a>`)
        })
    })
});