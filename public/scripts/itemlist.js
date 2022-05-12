fetch('/all_items')
.then(response => response.json())
.then(data => {
    console.log(data)
    data.forEach((items) => {
        $(document).ready(function() {
            $("#items_list").append(`<tr>
                <td>${items.name}</td>
                <td>${items.price}</td>
                <td>${items.img}</td>
                <td>${items.location}</td>
                <td>${items.id}</td>
            </tr>`)
            $('.name').html(items.name)
        })
    })
});