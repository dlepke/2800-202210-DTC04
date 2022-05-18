fetch('/account_list_data')
.then(response => response.json())
.then(data => {
    console.log(data)

    data.forEach((user) => {
        $(document).ready(function() {
            $("#account-list").append(`<tr>
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
                <td>${user.email}</td>

            </tr>`)
        })
    })
});