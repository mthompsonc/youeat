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
        document.getElementById("list").innerHTML = ['<img class="preview" src="', e.target.result, '" title="', escape(theFile.name), '"/>'].join('');
      };
    })(f);

    reader.readAsDataURL(f);
  }
}

/* Agregando imagen de input a firebase */

window.onload= inicializar;

var fichero;
var storageRef;

function inicializar() {
  fichero = document.getElementById('inputfiles');
  fichero.addEventListener('change', subirImagenFirebase, false);

  /* hijo del directorio raíz del firebase de mi proyecto */
  storageRef = firebase.storage().ref();

}

function subirImagenFirebase() {
  var imagenASubir = fichero.files[0];

  var uploadTask = storageRef.child('imgrecetas/' + imagenASubir.name).put(imagenASubir);
}


/*Creando registro de usuario firebase*/

function registrar() {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
    location.reload();
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
    alert(errorMessage)
  });

}

/* Función para ingresar el usuario */
function ingreso() {
  var email2 = document.getElementById('email2').value;
  var password2 = document.getElementById('password2').value;
  firebase.auth().signInWithEmailAndPassword(email2, password2).then(() => {
    location.reload();
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    alert(errorMessage);
    // ...
  });
}

/* Observa qué sucede con el usuario, si se conectó o no, si existe verificación del email, etc. */
function observador() {
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

/* Esta función reemplaza botones, siempre y cuando el usuario esté activo. */
function aparece() {
  console.log("Holi holi aparece aparece")
  var contenedor = document.getElementById('menu');
  contenedor.innerHTML = `
  <li><a href="#" id="home">Inicio</a></li>
  <li><a href="#" id="profile">Perfil</a></li>
  <li><a href="#" id="close" onclick="cerrar()">Cerrar Sesión</a></li>
  `

  $('#home').click(function() {
    $('#myHome').show();
    $('#about').hide();
    $('#profile2').hide();
  })

  $('#profile').click(function() {
    $('#myHome').hide();
    $('#about').hide();
    $('#profile2').show();
  })


}


function cerrar() {
  firebase.auth().signOut()
    .then(function() {
      console.log('Saliendo..');
      location.reload();
    })
    .catch(function(error) {
      console.log(error);
    })
}
/* se activa cuando no hay usuario logueado */
function nouser() {
  $('#aboutus').click(function() {
    $('#about').show();
    $('#myHome').hide();
    $('#profile2').hide();
  })

  $('#register').click(function() {
    $('#loginModal').show();
    console.log("holi");
  })
}
/* se activa cuando hay un usuario logueado*/
function useractive() {
  $('#about').hide();
  $('#myHome').show();
  $('#profile2').hide();
}



$(document).ready(function() {
  $('#about').show();
  $('#myHome').hide();
  $('#profile2').hide();

})
