/**
 * Validate the user input and update password in database.
 */

function changePassword() {
    password = document.getElementById('new_password').value;
    confirm_password = document.getElementById('confirm_password').value;
    change_successful = document.getElementById('change_successful');
    missmatch_warning = document.getElementById('missmatch');

    if (password === confirm_password) {
        $.post('/change_password', {
            newPassword: password
        });
        change_successful.style.visibility = "visible";
        missmatch_warning.style.visibility = "hidden";
    } else {
        missmatch_warning.style.visibility = "visible";
        change_successful.style.visibility = "hidden";
    }
}