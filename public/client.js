// client-side js
// run by the browser each time your view template is loaded

$(function() {
  $.get('/users', function(users) {
    users.forEach(function(user) {
      $('<li></li>').text(user[0] + " " + user[2] + " " + user[1]).appendTo('ul#users');
    });
  });

  $('form').submit(function(event) {
    event.preventDefault(); 

    var spanName = document.getElementById("place-name");
    var name_down = document.getElementById("cityName");
    var spanAddress = document.getElementById("place-address");
    var address_down = document.getElementById("streetAddress");  
      
    
    var machineName = $('input#machineName').val();
    var cityName = spanName.textContent;
    var streetAddress = spanAddress.textContent;     
    
    $.post('/users?' + $.param({machineName:machineName, cityName:cityName, streetAddress:streetAddress}), function() {
      $('<li></li>').text(machineName + " " + cityName + " " + streetAddress).appendTo('ul#users');
      $('input#machineName').val('');
      $('input#cityName').val('');
      $('input#streetAddress').val('');     
      $('input').focus();
    });
  });
});  

           