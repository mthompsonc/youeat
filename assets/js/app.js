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

/*
* Función para crear registro de usuario en Firebase
*/

function registrar(){
  var email= document.getElementById('email').value;
  var password= document.getElementById('password').value;

  firebase.auth().createUserWithEmailAndPassword(email, password).then(()=>{
     location.reload();
  }).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
  alert(errorMessage)
});

}

/*
* Función para identificar sign in en Firebase
*/

function ingreso(){
  var email2= document.getElementById('email2').value;
  var password2= document.getElementById('password2').value;
  firebase.auth().signInWithEmailAndPassword(email2, password2).then(()=>{
     location.reload();
  }).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;

  alert(errorMessage);
  // ...
});
}

/*
* Función de Firebase que observa qué sucede con el usuario, si se conectó o no, si existe verificación del email, etc.
*/

function observador(){
  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    aparece();
    console.log('existe usuario activo')
    useractive();
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
    nouser();
  }
});
}

observador();

/*
* Esta función reemplaza botones, siempre y cuando el usuario esté logueado.
*/

function aparece(){
  console.log("Holi holi aparece aparece")
  var contenedor= document.getElementById('menu');
  contenedor.innerHTML= `
  <li><a href="#" id="home">Inicio</a></li>
  <li><a href="#" id="profile">Perfil</a></li>
  <li><a href="#" id="close" onclick="cerrar()">Cerrar Sesión</a></li>
  `

    $('#home').click(function(){
      $('#myHome').show();
      $('#about').hide();
      $('#profile2').hide();
    })

    $('#profile').click(function(){
      $('#myHome').hide();
      $('#about').hide();
      $('#profile2').show();
    })


}

/*
* Función para cerrar sesión
*/

function cerrar(){
  firebase.auth().signOut()
  .then(function(){
    console.log('Saliendo..');
     location.reload();
  })
  .catch(function(error){
    console.log(error);
  })
}

/*
* Se activa cuando la función observador (de Firebase) nota que no hay usuario logueado.
*/

function nouser(){
  $('#aboutus').click(function(){
    $('#about').show();
    $('#myHome').hide();
    $('#profile2').hide();
  })

  $('#register').click(function(){
    $('#loginModal').show();
    console.log("holi");
  })
}

/*
* Se activa cuando la función observador (de Firebase) nota que hay un usuario logueado.
*/
  function useractive(){
    $('#about').hide();
    $('#myHome').show();
    $('#profile2').hide();
  }


/*
* Función que se activa al cargar el documento.
*/

$(document).ready(function(){

  $('#about').show();
  $('#myHome').hide();
  $('#profile2').hide();
})

/** Función que muestra las recetas*/

console.log(data);

var cont = $('.container');
var platoFondo = $('.platoFondo');
var postre = $('.postre');
var bebestible = $('.bebestible');
var panaderiaPasteleria = $('.panaderiaPasteleria');
var everyone = $('.everyone');

//evento para que funcione el select
$('#categorias').on('change', function(){

  //guardo el valor del select en la variable selection
  var selection = $('#categorias').val();

  if (selection === 'platoFondo') {
    for (var i = 0; i < data.length; i++){
      if (data[i].tipo === 'plato de fondo') {
        postre.children().remove();
        bebestible.children().remove();
        panaderiaPasteleria.children().remove();
        everyone.children().remove();
        platoFondo.append('<div class="row">' +
                        '<div class= "col-md-12 text-center">'+
                        '<img src="assets/' + data[i].foto + '">' +
                        '<h3>' + data[i].nombre + '</h3>' +
                        '<p>Ingredientes: ' + data[i].ingredientes + '</p>' +
                        '<p>Receta: ' + data[i].receta + '</p>' + '<p>Sede: ' + data[i].tipo + '</p>' +
                          '</div>' +
                        '</div>')
      }
    }
  }

  if (selection === 'postre') {
    for (var i = 0; i < data.length; i++){
      if (data[i].tipo === 'postre') {
        platoFondo.children().remove();
        bebestible.children().remove();
        panaderiaPasteleria.children().remove();
        everyone.children().remove();
        postre.append('<div class="row">' +
                        '<div class= "col-md-12 text-center">'+
                        '<img src="assets/' + data[i].foto + '">' +
                        '<h3>' + data[i].nombre + '</h3>' +
                        '<p>Ingredientes: ' + data[i].ingredientes + '</p>' +
                        '<p>Receta: ' + data[i].receta + '</p>' + '<p>Sede: ' + data[i].tipo + '</p>' +
                          '</div>' +
                        '</div>')
      }
    }
  }

  if (selection === 'bebestible') {
    for (var i = 0; i < data.length; i++){
      if (data[i].tipo === 'bebestible') {
        platoFondo.children().remove();
        postre.children().remove();
        panaderiaPasteleria.children().remove();
        everyone.children().remove();
        bebestible.append('<div class="row">' +
                        '<div class= "col-md-12 text-center">'+
                        '<img src="assets/' + data[i].foto + '">' +
                        '<h3>' + data[i].nombre + '</h3>' +
                        '<p>Ingredientes: ' + data[i].ingredientes + '</p>' +
                        '<p>Receta: ' + data[i].receta + '</p>' + '<p>Sede: ' + data[i].tipo + '</p>' +
                          '</div>' +
                        '</div>')
      }
    }
  }

  if (selection === 'panaderiaPasteleria') {
    for (var i = 0; i < data.length; i++){
      if (data[i].tipo === 'panaderia/pasteleria') {
        platoFondo.children().remove();
        postre.children().remove();
        bebestible.children().remove();
        everyone.children().remove();
        panaderiaPasteleria.append('<div class="row">' +
                        '<div class= "col-md-12 text-center">'+
                        '<img src="assets/' + data[i].foto + '">' +
                        '<h3>' + data[i].nombre + '</h3>' +
                        '<p>Ingredientes: ' + data[i].ingredientes + '</p>' +
                        '<p>Receta: ' + data[i].receta + '</p>' + '<p>Sede: ' + data[i].tipo + '</p>' +
                          '</div>' +
                        '</div>')
      }
    }
  }

  if (selection === 'everyone') {
    platoFondo.children().remove();
    postre.children().remove();
    bebestible.children().remove();
    panaderiaPasteleria.children().remove();
    for (var i = 0; i < data.length; i++){
        everyone.append('<div class="row">' +
                        '<div class= "col-md-12 text-center">'+
                        '<img src="assets/' + data[i].foto + '">' +
                        '<h3>' + data[i].nombre + '</h3>' +
                        '<p>Ingredientes: ' + data[i].ingredientes + '</p>' +
                        '<p>Receta: ' + data[i].receta + '</p>' + '<p>Sede: ' + data[i].tipo + '</p>' +
                          '</div>' +
                        '</div>')
    }
  }
})
