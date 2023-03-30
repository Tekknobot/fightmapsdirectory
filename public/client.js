// client-side js
// run by the browser each time your view template is loaded

$(function() {
  $.get('/users', function(users) {
    users.forEach(function(user) {
      $('<p></p>').text(user[0] + " / " + user[1] + " / " + user[2]).appendTo('ul#users');
    });
  });

  $('form').submit(function(event) {
    event.preventDefault(); 

    var spanName = document.getElementById("place-name");
    var name_down = document.getElementById("locationName");
    var spanAddress = document.getElementById("place-address");
    var address_down = document.getElementById("streetAddress");  
      
    
    var machineName = $('input#machineName').val();
    var locationName = spanName.textContent;
    var streetAddress = spanAddress.textContent;     
    
    $.post('/users?' + $.param({machineName:machineName, locationName:locationName, streetAddress:streetAddress}), function() {
      $('<p></p>').text(machineName + " / " + locationName + " / " + streetAddress).appendTo('ul#users');
      $('input#machineName').val('');
      $('input#locationName').val('');
      $('input#streetAddress').val('');     
      $('input').focus();
    });
  });

  const courses = [{
    "Name": "Communications",
    "Date": "22 April 2022",
    "Code": "CS368"                
    },
    {
    "Name": "Programming",
    "Date": "22 April 2021",
    "Code": "CS368"                
    },
    {
    "Name": "Networks",
    "Date": "22 April 2002",
    "Code": "CS368"                
    }]
  const table = document.getElementById("tableBody");
  courses.map(course=>{
  let row = table.insertRow();
  let name = row.insertCell(0);
  name.innerHTML = course.Name;
  let date = row.insertCell(1);
  date.innerHTML = course.Date;
  let code = row.insertCell(2);
  code.innerHTML = course.Code;
  }); 
    
});  

           