/**
 * Update user's email in the database.
 */

function editEmail() {
    let email = document.getElementById('new_email').value;

    $.post('/edit_email', {
        newEmail: email
    });

}

/**
 * Update user's first name in the database.
 */


function editFirstName() {
    let firstName = document.getElementById('first_name').value;

    $.post('/edit_first_name', {
        newFirstName: firstName
    });
}

/**
 * Update user's last name in the database.
 */

function editLastName() {
    let lastName = document.getElementById('last_name').value;

    $.post('/edit_last_name', {
        newLastName: lastName
    });
}

/**
 * Update user's address in the database.
 */


function editAddress() {
    let address = document.getElementById('new_address').value;

    $.post('/edit_address', {
        newAddress: address
    });
}