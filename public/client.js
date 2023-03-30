// client-side js
// run by the browser each time your view template is loaded

$(function() {
  $.get('/users', function(users) {
    users.forEach(function(user) {
      $('<h1></h1>').text(user[0]).appendTo('ul#users');
      $('<h2></h2>').text(user[0]).appendTo('ul#users');
      $('<h3></h3>').text(user[0]).appendTo('ul#users');
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

           