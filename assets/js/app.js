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

  $('#register').click(function(){
    $('#register-modal').show();
    console.log("holi")
  })


})

function registrar(){
  var email= document.getElementById('email').value;
  var password= document.getElementById('password').value;

  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
  alert(errorMessage)
});

}

function ingreso(){
  var email2= document.getElementById('email2').value;
  var password2= document.getElementById('password2').value;

  firebase.auth().signInWithEmailAndPassword(email2, password2).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;

  alert(errorMessage);
  // ...
});
}

function observador(){
  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log('existe usuario activo')
    // User is signed in.
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    var providerData = user.providerData;
    // ...
  } else {
    console.log('no existe usuario activo')
    // User is signed out.
    // ...
  }
});
}

observador();
