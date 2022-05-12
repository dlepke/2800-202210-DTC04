fetch('/all_items')
.then(response => response.json())
.then(data => {
    console.log(data)
    data.forEach((items) => {
        $(document).ready(function() {
            $("#items_list").append(`<tr>
                <td>${items.itemName}</td>
                <td>${items.price}</td>
                <td>${items.img}</td>
                <td>${items.brand}</td>
                <td>${items.itemId}</td>
            </tr>`)
            $('.name').html(items.name)
        })
    })
});