// client-side js
// run by the browser each time your view template is loaded

$(function() {
  $.get('/users', function(users) {
    users.forEach(function(user) {
      $('<td></td></br>').text(user[0]).appendTo('ul#users');
      $('<td></td></br>').text(user[1]).appendTo('ul#users');
      $('<td></td></br>').text(user[2]).appendTo('ul#users');
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
    
});  

           