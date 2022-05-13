function editEmail() {
    email = document.getElementById('new_email').value;

    $.post('/edit_email', {
        newEmail: email
    });

}

function editFirstName() {
    firstName = document.getElementById('first_name').value;

    $.post('/edit_first_name', {
        newFirstName: firstName
    });
}

function editLastName() {
    lastName = document.getElementById('last_name').value;

    $.post('/edit_last_name', {
        newLastName: lastName
    });
}

function editAddress() {
    address = document.getElementById('new_address').value;

    $.post('/edit_address', {
        newAddress: address
    });
}