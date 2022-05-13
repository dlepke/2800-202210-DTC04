function changePassword() {
    password = document.getElementById('confirm_password').value;

    $.post('/change_password', {
        newPassword: password
    });
}