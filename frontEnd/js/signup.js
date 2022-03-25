
let alerted=false
$('#signupForm').submit((event)=>{


    let username=$("#username").val()
    let password=$("#password").val()
    let confirmPassword=$("#confirmPassword").val()
    let phone=$("#phone").val()
    let email=$("#email").val()
    let warning=$('#warning')
    let data={
               "username":username,
               "password":password,
               "confirm_password":confirmPassword,
               "phone":phone,
               "email":email
        }
    $.ajax({
        type: "POST",
        url: "http://localhost:3000/user/",
        data: JSON.stringify(data),// now data come in this function
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        dataType: "json",
        success: function (data, status, jqXHR) {

            alert(jqXHR.responseJSON.message);// write success in " "
        },

        error: function (jqXHR, status) {
            // error handler

alert(jqXHR.responseJSON.message)

        }
    });
    event.preventDefault();
})

