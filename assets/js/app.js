$(document).ready(function(){
  $('#about').show();
  $('#myHome').hide();
  $('#profile2').hide();
/*
  $('#close').click(function(){
    $('#modal').hide();
    $('.modal-backdrop').hide();
  })
*/
  $('#home').click(function(){
    $('#myHome').show();
    $('#about').hide();
    $('#profile2').show();
  })

  $('#aboutus').click(function(){
    $('#myHome').hide();
    $('#about').show();
    $('#profile2').hide();
  })

  $('#user').click(function(){
    $('#myHome').hide();
    $('#about').hide();
    $('#profile2').hide();
  })

  $('#register').click(function(){
    $('#loginModal').show();
    console.log("holi")
  })


})

/*Previsualizar imagen*/

function archivo(evt) {
      var files = evt.target.files; // FileList object

        //Obtenemos la imagen del campo "file".
      for (var i = 0, f; f = files[i]; i++) {
           //Solo admitimos imágenes.
           if (!f.type.match('image.*')) {
                continue;
           }

           var reader = new FileReader();

           reader.onload = (function(theFile) {
               return function(e) {
               // Creamos la imagen.
                      document.getElementById("list").innerHTML = ['<img class="preview" src="', e.target.result,'" title="', escape(theFile.name), '"/>'].join('');
               };
           })(f);

           reader.readAsDataURL(f);
       }
}

      document.getElementById('files').addEventListener('change', archivo, false);


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
    aparece();
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

function aparece(){
  console.log("Holi holi aparece aparece")
  var contenedor= document.getElementById('menu');
  contenedor.innerHTML= `
  <li><a href="#" id="home">Inicio</a></li>
  <li><a href="#" id="profile">Perfil</a></li>
  <li><a href="#" id="close" onclick="cerrar()">Cerrar Sesión</a></li>
  `
}

function cerrar(){
  firebase.auth().signOut()
  .then(function(){
    console.log('Saliendo..');
  })
  .catch(function(error){
    console.log(error);
  })
}
