var numbers = /^[0-9]+$/;

$('#foodForm').submit((event)=>{
  let name=$("#name").val()
  let description=$("#description").val()
  let price=$("#price").val()
  let categoryId=$("#categoryId").val()

  if(name.match(numbers)||description.match(numbers)){
    alert("Number only not allowed")
    throw new Error("Number only not allowed");
  }


  let data= {
    "name": name,
    "description": description,
    "price":price,
    "categoryId":categoryId
  }

  $.ajax({
    type: "POST",
    url: "http://localhost:3000/menu",
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
