// client-side js
// run by the browser each time your view template is loaded

$(function() {
  $.get('/users', function(users) {
    users.forEach(function(user) {
      $('<li></li>').text(user[0] + " " + user[1] + " " + user[2] + " " + user[3]).appendTo('ul#users');
    });
  });

  $('form').submit(function(event) {
    event.preventDefault();
    var machineName = $('input#machineName').val();
    var streetAddress = $('input#streetAddress').val();
    var cityName = $('input#cityName').val();
    var countryName = $('input#countryName').val();    
    $.post('/users?' + $.param({machineName:machineName, streetAddress:streetAddress, cityName:cityName, countryName:countryName}), function() {
      $('<li></li>').text(machineName + " " + cityName + " " + streetAddress + " " + countryName).appendTo('ul#users');
      $('input#machineName').val('');
      $('input#streetAddress').val('');
      $('input#cityName').val('');
      $('input#countryName').val('');      
      $('input').focus();
    });
  });
});
