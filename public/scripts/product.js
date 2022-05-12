product = $("#name").text()
console.log(product)
fetch(`/getallproducts/${product}`)
.then(response => response.json())
.then(data => {
    console.log(data)
    data.forEach((items) => {
        $(document).ready(function() {
            $("#others").append(
            `<tr>
                <td>${items.price}</td>
                <td>${items.location}</td>
            </tr>`)
        })
    })
});