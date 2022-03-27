

$('#loginForm').submit((event)=>{
    let username=$("#username").val()
    let password=$("#password").val()


    let data= {
        "username": username,
        "password": password,
    }

    $.ajax({
        type: "POST",
        url: "http://localhost:3000/user/login",
        data: JSON.stringify(data),// now data come in this function
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        dataType: "json",
        success: function (data, status, jqXHR) {
            console.log(data)
            alert(jqXHR.responseJSON.message);// write success in " "
            $.cookie('token',data.data)
        },

        error: function (jqXHR, status) {
            // error handler

            alert(jqXHR.responseJSON.message)

        }
    });
    event.preventDefault();
})