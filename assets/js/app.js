$(document).ready(function(){
  $('#myHome').hide();
  $('#about').show();
  $('#profile').hide();

  $('#home').click(function(){
    $('#myHome').show();
    $('#about').hide();
    $('#profile').hide();
  })

  $('#aboutus').click(function(){
    $('#myHome').hide();
    $('#about').show();
    $('#profile').hide();
  })

  $('#user').click(function(){
    $('#myHome').hide();
    $('#about').hide();
    $('#profile').show();
  })



})
