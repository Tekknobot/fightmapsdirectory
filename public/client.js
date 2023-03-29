// client-side js
// run by the browser each time your view template is loaded

$(function() {
  $.get('/users', function(users) {
    users.forEach(function(user) {
      $('<li></li>').text(user[0] + " " + user[1] + " " + user[2]).appendTo('ul#users');
    });
  });

  $('form').submit(function(event) {
    event.preventDefault();
    var machineName = $('input#machineName').val();
    var streetAddress = $('input#streetAddress').val();
    var cityName = $('input#cityName').val();    

    var spanName = document.getElementById("place-name");
    var name_down = document.getElementById("cityName");
    var spanAddress = document.getElementById("place-address");
    var address_down = document.getElementById("streetAddress");  
      
    function gfg_Run() {
      name_down.innerHTML = spanName.textContent;
      address_down.innerHTML = spanAddress.textContent;
    }       
    
    $.post('/users?' + $.param({machineName:machineName, streetAddress:streetAddress, cityName:cityName}), function() {
      $('<li></li>').text(machineName + " " + cityName + " " + streetAddress).appendTo('ul#users');
      $('input#machineName').val('');
      $('input#cityName').val('');
      $('input#streetAddress').val('');     
      $('input').focus();
    });
  });
});  

           