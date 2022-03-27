

$('#categoryForm').submit((event)=>{
  let name=$("#name").val()
  let description=$("#description").val()


  let data= {
    "name": name,
    "description": description,
  }

  $.ajax({
    type: "POST",
    url: "http://localhost:3000/category",
    data: JSON.stringify(data),// now data come in this function
    contentType: "application/json; charset=utf-8",
    crossDomain: true,
    dataType: "json",
    success: function (data, status, jqXHR) {
      console.log(data)
      alert(jqXHR.responseJSON.message);// write success in " "

    },

    error: function (jqXHR, status) {
      // error handler
console.log(jqXHR.responseJSON)
      alert(jqXHR.responseJSON.message)

    }
  });
  event.preventDefault();
})
