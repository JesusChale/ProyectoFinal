class usuario {
  constructor(nombre, apellidos, telefono, email, contraseña, direccion1, direccion2, cp, colonia, ciudad, estado, pais, uso) {
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.telefono = telefono;
    this.email = email;
    this.contraseña = contraseña;
    this.direccion1 = direccion1;
    this.direccion2 = direccion2;
    this.cp = cp;
    this.colonia = colonia;
    this.ciudad = ciudad;
    this.estado = estado;
    this.pais = pais;
    this.uso = uso;
  }
  
}

function comprobarNuevoPerf() {
  var pasa = true;
  var inpNombre = document.getElementById("nuevNombre");
  var errorNombre = document.getElementById("errorNombre");
  if (inpNombre.value == "") {
    errorNombre.innerHTML = "*No puede estar vacio este campo";
    pasa = false;
  } else {
    errorNombre.innerHTML = "";
  }
  var inpApellidos = document.getElementById("apellidos");
  var errorApellido = document.getElementById("errorApellido");
  if (inpApellidos.value == "") {
    errorApellido.innerHTML = "*No puede estar vacio este campo";
    pasa = false;
  } else {
    errorApellido.innerHTML = "";
  }
  var inpTelefono = document.getElementById("telefono");
  var errorTelefono = document.getElementById("errorTel");
  if (inpTelefono.value == "") {
    errorTelefono.innerHTML = "*No puede estar vacio este campo";
    pasa = false;
  } else {
    if (!(/^[0-9]{10}$/.test(inpTelefono.value))) {
      errorTelefono.innerHTML = "*El numero de telefono solo puede ser numerico";
      pasa = false;
    } else {
      errorTelefono.innerHTML = "";
    }
  }
  var inpEmail = document.getElementById("email");
  var errorEmail = document.getElementById("errorEmail");
  if (inpEmail.value == "") {
    errorEmail.innerHTML = "*No puede estar vacio este campo";
    pasa = false;
  } else {
    if (!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(inpEmail.value))) {
      errorEmail.innerHTML = "*El correo debe contener un @ y un punto";
      pasa = false;
    } else {
      errorEmail.innerHTML = "";
    }

  }
  var inpContraseña = document.getElementById("contraseña");
  var errorCont = document.getElementById("errorCont");
  if (inpContraseña.value == "") {
    errorCont.innerHTML = "*No puede estar vacio este campo";
    pasa = false;
  } else {
    errorCont.innerHTML = "";
  }
  var inpConfirmar = document.getElementById("confirmar");
  var errorConf = document.getElementById("errorConf");
  if (inpConfirmar.value == "") {
    errorConf.innerHTML = "*No puede estar vacio este campo";
    pasa = false;
  } else {
    if (inpContraseña.value != inpConfirmar.value) {
      errorConf.innerHTML = "*Valor diferente al de la contraseña";
      pasa = false;
    } else {
      errorConf.innerHTML = "";
    }
  }
  //--------------------------------
  var inpDireccion1 = document.getElementById("direccion1");
  var inpDireccion2 = document.getElementById("direccion2");
  var errorDireccion = document.getElementById("errorDireccion");
  if (inpDireccion1.value == "") {
    errorDireccion.innerHTML = "*No puede estar vacio este campo";
    pasa = false;
  } else {
    errorDireccion.innerHTML = "";
  }
  var inpCp = document.getElementById("cp");
  var inpColonia = document.getElementById("colonia");
  var errorCp = document.getElementById("errorCp");
  if (inpCp.value == "") {
    errorCp.innerHTML = "*No puede estar vacio este campo";
    pasa = false;
  } else {
    errorCp.innerHTML = "";
  }
  //_------------------------------
  var inpCiudad = document.getElementById("ciudad");
  var errorCiudad = document.getElementById("errorCiudad");
  if (inpCiudad.value == "") {
    errorCiudad.innerHTML = "*No puede estar vacio este campo";
    pasa = false;
  } else {
    errorCiudad.innerHTML = "";
  }
  var inpEstado = document.getElementById("estado");
  var errorEstado = document.getElementById("errorEstado");
  if (inpEstado.value == "") {
    errorEstado.innerHTML = "*No puede estar vacio este campo";
    pasa = false;
  } else {
    errorEstado.innerHTML = "";
  }
  var inpPais = document.getElementById("pais");
  var errorPais = document.getElementById("errorPais");
  if (inpPais.value == "") {
    errorPais.innerHTML = "*No puede estar vacio este campo";
    pasa = false;
  } else {
    errorPais.innerHTML = "";
  }

  if (pasa == true) {
    const user = new usuario(inpNombre.value, inpApellidos.value, inpTelefono.value, inpEmail.value, inpContraseña.value, inpDireccion1.value, inpDireccion2.value, inpCp.value, inpColonia.value, inpCiudad.value, inpEstado.value, inpPais.value, false);
    console.log(user);
    crearUsuario(user);
  }
}


function crearUsuario(user) {
  var anterior = document.getElementById("usuAnterior");
  var valido = true;
  let conjunto = [];
  let opcional = JSON.parse(localStorage.getItem('usuarios'));
  if (opcional != null) {
    conjunto = JSON.parse(localStorage.getItem('usuarios'));
    for (var i = 0; i < conjunto.length; i++) {
      if (conjunto[i].email == user.email) {
        valido = false;
      }
    }
  }
  //console.log(user);
  if (valido == true) {
    conjunto.push(user);
    localStorage.setItem('usuarios', JSON.stringify(conjunto));
    var guardado = localStorage.getItem('usuarios');
    console.log(JSON.parse(guardado));
    anterior.innerHTML = "";

    document.getElementById("email").value = "";
    document.getElementById("nuevNombre").value = "";
    document.getElementById("apellidos").value = "";
    document.getElementById("telefono").value = "";
    document.getElementById("contraseña").value = "";
    document.getElementById("confirmar").value = "";
    document.getElementById("direccion1").value = "";
    document.getElementById("direccion2").value = "";
    document.getElementById("cp").value =null;
    document.getElementById("colonia").value = "";
    document.getElementById("ciudad").value = "";
    document.getElementById("estado").value = "";
    document.getElementById("pais").value = "";
    alert("Usuario creado");
  } else {
    anterior.innerHTML = "Usuario creado previamente"
  }
}

function cargarDatos() {
  var inicio = false;
  let conjunto = [];
  var usuarioUsando = new usuario("", "", "", "", "", "", "", "", "", "", "", "");
  let opcional = JSON.parse(localStorage.getItem('usuarios'));
  if (opcional != null) {
    conjunto = JSON.parse(localStorage.getItem('usuarios'));
    for (var i = 0; i < conjunto.length; i++) {
      if (conjunto[i].uso == true) {
        inicio = true;
        usuarioUsando = conjunto[i];
      }
    }
  }
  if (inicio == true) {
    document.getElementById("usuAnterior").value = "";
    document.getElementById("nuevNombre").value = usuarioUsando.nombre;
    document.getElementById("apellidos").value = usuarioUsando.apellidos;
    document.getElementById("telefono").value = usuarioUsando.telefono;
    document.getElementById("contraseña").value = usuarioUsando.contraseña;
    document.getElementById("confirmar").value = usuarioUsando.contraseña;
    document.getElementById("direccion1").value = usuarioUsando.direccion1;
    document.getElementById("direccion2").value = usuarioUsando.direccion2;
    document.getElementById("cp").value = parseInt(usuarioUsando.cp);
    document.getElementById("colonia").value = usuarioUsando.colonia;
    document.getElementById("ciudad").value = usuarioUsando.ciudad;
    document.getElementById("estado").value = usuarioUsando.estado;
    document.getElementById("pais").value = usuarioUsando.pais;
  } else {
    document.getElementById("usuAnterior").value = "*No hay ningun usuario que haya iniciado sesion";
  }
}

function eliminarUsuario() {
  let conjunto = [];
  let opcional = JSON.parse(localStorage.getItem('usuarios'));
  if (opcional != null) {
    conjunto = JSON.parse(localStorage.getItem('usuarios'));
    console.log(conjunto);
    for (var i = 0; i < conjunto.length; i++) {
      if (conjunto[i].uso == true) {
        var removed = conjunto.splice(i, 1);
        localStorage.setItem('usuarios', JSON.stringify(conjunto));
        alert("Usuario eliminado");
      }
    }
    var guardado = localStorage.getItem('usuarios');
    console.log(JSON.parse(guardado));
  }
}

function actualizarUsuario() {
  let conjunto = [];
  let opcional = JSON.parse(localStorage.getItem('usuarios'));
  if (opcional != null) {
    conjunto = JSON.parse(localStorage.getItem('usuarios'));
    console.log(conjunto);
    for (var i = 0; i < conjunto.length; i++) {
      if (conjunto[i].uso == true) {

        var nombre = document.getElementById("nuevNombre").value;
        var apellidos = document.getElementById("apellidos").value;
        var telefono = document.getElementById("telefono").value;
        var contraseña = document.getElementById("contraseña").value;
        var direccion1 = document.getElementById("direccion1").value;
        var direccion2 = document.getElementById("direccion2").value;
        var cp = document.getElementById("cp").value;
        var colonia = document.getElementById("colonia").value;
        var ciudad = document.getElementById("ciudad").value;
        var estado = document.getElementById("estado").value;
        var pais = document.getElementById("pais").value;

        var usuarioUsando = new usuario(nombre, apellidos, telefono, conjunto[i].email, contraseña, direccion1, direccion2, cp, colonia, ciudad, estado, pais, true)
        var removed = conjunto.splice(i, 1, usuarioUsando);
        localStorage.setItem('usuarios', JSON.stringify(conjunto));
        alert("Usuario actualizado");
      }
    }
    var guardado = localStorage.getItem('usuarios');
    console.log(JSON.parse(guardado));
  }
}

function inicioSesion() {
  let conjunto = [];
  var inicio = false;
  var cierre = false;
  var cuenta = document.getElementById("email").value;
  var contraseña = document.getElementById("password").value;
  var usuarioUsando = new usuario("", "", "", "", "", "", "", "", "", "", "", "");
  let opcional = JSON.parse(localStorage.getItem('usuarios'));
  if (opcional != null) {
    conjunto = JSON.parse(localStorage.getItem('usuarios'));
    for (var i = 0; i < conjunto.length; i++) {
      console.log(conjunto);

      if (conjunto[i].uso == true ) {
        if( conjunto[i].email == cuenta && conjunto[i].contraseña == contraseña){
          conjunto[i].uso = false;
        console.log(conjunto);
        usuarioUsando = conjunto[i];
        var removed = conjunto.splice(i, 1, usuarioUsando);
        localStorage.setItem('usuarios', JSON.stringify(conjunto));
        
        document.getElementById("cerrarSesion").classList.remove("hide");
        }else{
          document.getElementById("alertaId").classList.remove("hide");
          console.log("error");
        }
        cierre = true;
      }
    }
    if (cierre == false) {
      for (var i = 0; i < conjunto.length; i++) {
        if (conjunto[i].email == cuenta && conjunto[i].contraseña == contraseña) {
          usuarioUsando = conjunto[i];
          usuarioUsando.uso = true;
          inicio=true;
          var removed = conjunto.splice(i, 1, usuarioUsando);
          localStorage.setItem('usuarios', JSON.stringify(conjunto));
        }
      }
    }
  }
  if (inicio != true) {
    if (cierre == false) {
      document.getElementById("alertaId").classList.remove("hide");
      console.log("error");
    }
  }
  setTimeout(function(){ location.reload(true) }, 3000);  
}

function posibleCuenta(){
  let conjunto = [];
  let opcional = JSON.parse(localStorage.getItem('usuarios'));
  if (opcional != null) {
    conjunto = JSON.parse(localStorage.getItem('usuarios'));
    console.log(conjunto);
    for (var i = 0; i < conjunto.length; i++) {
      if (conjunto[i].uso == true) {
        var texto=document.getElementById("texto");
        texto.innerHTML="Necesitamos que confirme su correo y contraseña";
        var texto=document.getElementById("titulo");
        texto.innerHTML="Cerrar sesion";
        var texto=document.getElementById("titulo");
      }
    }
    var guardado = localStorage.getItem('usuarios');
    console.log(JSON.parse(guardado));
  }
  
}