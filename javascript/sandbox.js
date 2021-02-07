//index.html
var queryString = parseInt(location.search.substring(1));

function obtenerCateg() {
    //Carousel
    var carousel = document.getElementById("carouselExampleIndicators");
    //Breadcrumb
    var subtitulo = document.getElementById("subtituloOl");
    var liHome = subtitulo.getElementsByTagName("li")[0];
    var categText = "";

    //json
    const xhttp = new XMLHttpRequest();
    switch (queryString) {
        case 0:
            xhttp.open('GET', 'json/almacenamiento.json', true);
            categText = "Almacenamiento";

            break;
        case 1:
            xhttp.open('GET', 'json/audio.json', true);
            categText = "Audio";
            break;
        case 2:
            xhttp.open('GET', 'json/cables.json', true);
            categText = "Cables y Accesorios";
            break;
        case 3:
            xhttp.open('GET', 'json/consumibles.json', true);
            categText = "Consumibles";
            break;
        case 4:
            xhttp.open('GET', 'json/electronica.json', true);
            categText = "Electronica y Hogar";
            break;
        case 5:
            xhttp.open('GET', 'json/energia.json', true);
            categText = "Energia";
            break;
        case 6:
            xhttp.open('GET', 'json/enfriamento.json', true);
            categText = "Enfriamento";
            break;
        case 7:
            xhttp.open('GET', 'json/gabinetes.json', true);
            categText = "Gabinetes";
            break;
        default:
            queryString = 8;
            xhttp.open('GET', 'json/recomendaciones.json', true);
            break;
    }
    //Carousel y Breadcrumb
    if (categText != "") {
        //Carousel
        carousel.parentElement.removeChild(carousel);
        //Breadcrumb
        liHome.removeChild(liHome.childNodes[0]);
        liHome.classList.remove("active");
        liHome.removeAttribute("aria-current");
        var aHome = document.createElement("a");
        aHome.setAttribute("href", "index.html");
        var aText = document.createTextNode("Principal");
        aHome.appendChild(aText);
        liHome.appendChild(aHome);
        //Breadcrumb - Categoria
        var liCat = document.createElement("li");
        liCat.setAttribute("class", "breadcrumb-item active");
        liCat.setAttribute("aria-current", "page");
        var categoria = document.createTextNode(categText);
        liCat.appendChild(categoria);
        subtitulo.appendChild(liCat);
    }
    //xhttp
    xhttp.send();
    xhttp.onload = function () {
        if (xhttp.readyState === 4 && xhttp.status == 200) {
            var datos = JSON.parse(xhttp.responseText);
            //console.log(datos);
            llenarCateg(datos);
        }
    }

}

function llenarCateg(datos) {

    //Obtener divisor donde estaran todos los productos
    var divPrincipal = document.getElementById("productos");
    for (var x = 0; x < datos.length; x++) {
        //Obtener producto
        var product = datos[x];
        //Divisor de anuncio
        var divProd = document.createElement("div");
        divProd.setAttribute("class", "col border");
        divPrincipal.appendChild(divProd);
        //Imagen
        var img = document.createElement("img");
        img.setAttribute("class", "img-anuncio");
        img.setAttribute("src", product.source);
        img.setAttribute("alt", product.sourceAlt);
        divProd.appendChild(img);
        //Divisor contenido
        var divCont = document.createElement("div");
        divCont.setAttribute("class", "contenido-anuncio d-flex flex-column");
        divProd.appendChild(divCont);
        //h4 - Nombre
        var hProd = document.createElement("h4");
        hProd.setAttribute("class", "fw500");
        var nombre = document.createTextNode(product.nombre);
        hProd.appendChild(nombre);
        divCont.appendChild(hProd);
        //p - Precio
        var pPrecio = document.createElement("p");
        pPrecio.setAttribute("class", "precio");
        var precio = document.createTextNode(product.precio);
        pPrecio.appendChild(precio);
        divCont.appendChild(pPrecio);
        //a - Boton para detalles
        var aBtn = document.createElement("a");
        aBtn.setAttribute("href", "producto.html?" + queryString + "&" + x);
        aBtn.setAttribute("class", "boton boton-gris d-block stretched-link align-self-end mt-auto");
        var btnTxt = document.createTextNode("Ver Detalles");
        aBtn.appendChild(btnTxt);
        divCont.appendChild(aBtn);

    }
}

//contacto.html

class Duda {
    constructor(nombre, email, telefono, duda) {
        this.nombre = nombre;
        this.email = email;
        this.telefono = telefono;
        this.duda = duda;
    }
    //Obtencion de errores
    get errores() {
        var error = [];
        this.validateNombre(error);
        this.validateEmail(error);
        this.validateTel(error);
        this.validateDuda(error);
        return error;
    }
    //Metodos obtener errores
    validateNombre(error) {
        if (this.nombre == "") {
            error.push("Nombre");
        }
    }
    validateEmail(error) {
        if (!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.email))) {
            error.push("E-mail");
        }
    }
    validateTel(error) {
        if (this.telefono != "") {
            if (!(/^[0-9]{10}$/.test(this.telefono))) {
                error.push("Telefono");
            }
        }
    }
    validateDuda(error) {
        if (this.duda == "") {
            error.push("Duda o Comentario");
        }
    }
    //Mandar a localStorage
    save() {
        var datos = [];
        var dudaNew = { nombre: this.nombre, email: this.email, telefono: this.telefono, duda: this.duda };
        if (localStorage.getItem("duda") == null) {
            //localStorage.setItem("duda",JSON.stringify(datos));
        } else {
            console.log("Entrar");
            datos = JSON.parse(localStorage.getItem("duda"));
        }
        datos.push(dudaNew);

        localStorage.setItem("duda", JSON.stringify(datos));
        console.log(datos);
    }
}



function validarContacto() {
    var valorNombre = document.getElementById("nombre").value;
    var valorEmail = document.getElementById("email").value;
    var valorTel = document.getElementById("telefono").value;
    var valorDuda = document.getElementById("duda").value;

    var dudas = new Duda(valorNombre, valorEmail, valorTel, valorDuda);

    var error = dudas.errores;

    if (error.length > 0) {
        //Mostrar Error
        var divAlert = document.createElement("div");
        divAlert.setAttribute("class", "alert alert-danger alert-dismissible fade show alerta");
        divAlert.setAttribute("role", "alert");
        var btnAlert = document.createElement("button");
        btnAlert.setAttribute("type", "button");
        btnAlert.setAttribute("class", "btn-close");
        btnAlert.setAttribute("data-dismiss", "alert");
        btnAlert.setAttribute("aria-label", "Close");
        var alertTxt = "1";
        if (error.length == 1) {
            alertTxt = "El campo " + error[0] + " debe ser llenado correctamente";
        } else {
            alertTxt = "Los campos ";
            //error.forEach(a => alertTxt += a + ", ");
            for (var x = 0; x < (error.length - 1); x++) {
                alertTxt += error[x] + ", ";
            }
            alertTxt += error[x] + " ";
            alertTxt += "deben ser llenados correctamente";
        }
        var alertTxtNd = document.createTextNode(alertTxt);
        divAlert.appendChild(alertTxtNd);
        divAlert.appendChild(btnAlert);
        var formCont = document.getElementsByClassName("contacto")[0];
        formCont.parentNode.insertBefore(divAlert, formCont);
    } else {
        //Guardar Duda
        dudas.save();
        document.getElementById("nombre").value = "";
        document.getElementById("email").value = "";
        document.getElementById("telefono").value = "";
        document.getElementById("duda").value = "";
    }
}

//dudas.html
function llenarDudas() {
    var divPrincipal = document.getElementById("dudas");
    var dudas = JSON.parse(localStorage.getItem("duda"));
    for (var x = 0; x < dudas.length; x++) {
        var divCard = document.createElement("div");
        divCard.setAttribute("class", "card");
        var divCardBody = document.createElement("div");
        divCardBody.setAttribute("id","div"+x);
        divCardBody.setAttribute("class", "card-body");
        var h4Duda = document.createElement("h4");
        h4Duda.setAttribute("id","h4"+x);
        h4Duda.setAttribute("class", "card-title");
        var h4DudaTxt = document.createTextNode(dudas[x].nombre);
        h4Duda.appendChild(h4DudaTxt);

        var btnGroup = document.createElement("div");
        btnGroup.setAttribute("class", "btn-group");

        var btnDelete = document.createElement("input");
        btnDelete.setAttribute("id", x);
        btnDelete.setAttribute("onclick", "borrarDuda(this.id);")
        btnDelete.setAttribute("type", "button");
        btnDelete.setAttribute("value", "Borrar");
        btnDelete.setAttribute("class", "boton-danger delete");

        var btnUpdate = document.createElement("input");
        btnUpdate.setAttribute("id", "upd-"+x);
        btnUpdate.setAttribute("onclick", "updateDuda(this.id);")
        btnUpdate.setAttribute("type", "button");
        btnUpdate.setAttribute("value", "Modificar");
        btnUpdate.setAttribute("class", "boton-update update");

        btnGroup.appendChild(btnDelete);
        btnGroup.appendChild(btnUpdate);

        var h5DudaEmail = document.createElement("h5");
        h5DudaEmail.setAttribute("id","h5Email"+x);
        h5DudaEmail.setAttribute("class", "card-subtitle mb-2 text-muted");
        var h5DudaTxtEmail = document.createTextNode("E-mail: " + dudas[x].email);
        h5DudaEmail.appendChild(h5DudaTxtEmail);
        var h5DudaTel = document.createElement("h5");
        h5DudaTel.setAttribute("id","h5Tel"+x);
        h5DudaTel.setAttribute("class", "card-subtitle mb-2 text-muted");
        var h5DudaTxtTel = document.createTextNode(dudas[x].telefono);
        h5DudaTel.appendChild(h5DudaTxtTel);
        var pDuda = document.createElement("p");
        pDuda.setAttribute("id","p"+x);
        pDuda.setAttribute("class", "card-text");
        var pDudaTxt = document.createTextNode(dudas[x].duda);
        pDuda.appendChild(pDudaTxt);
        divCardBody.appendChild(h4Duda);
        divCardBody.appendChild(btnGroup);
        divCardBody.appendChild(h5DudaEmail);
        divCardBody.appendChild(h5DudaTel);
        divCardBody.appendChild(pDuda);
        divCard.appendChild(divCardBody);
        divPrincipal.appendChild(divCard);
    }

}
function vaciarDudas() {
    var divPrincipal = document.getElementById("dudas");
    while (divPrincipal.firstChild) {
        divPrincipal.removeChild(divPrincipal.lastChild);
    }
}
function borrarDuda(id) {
    //Eliminar elemento
    var duda = JSON.parse(localStorage.getItem("duda"));
    duda.splice(id, 1);
    console.log(duda);
    localStorage.setItem("duda", JSON.stringify(duda));
    //Volver a llenar Dudas
    vaciarDudas();
    llenarDudas();
}
function updateDuda(idString) {
    //Obtener id
    var arrayId = idString.split("-");
    var id = arrayId[1];
    console.log(id);


    //Eliminar elemento
    var dudas = JSON.parse(localStorage.getItem("duda"));
    dudaUpdate = dudas[id];
    

    let comentario = prompt('Duda o Comentario', dudaUpdate.duda);

    var dudasNew = new Duda(dudaUpdate.nombre, dudaUpdate.email, dudaUpdate.telefono, comentario);
    var error = dudasNew.errores;
    if (error.length > 0) {
        alert("No se puede dejar el campo vacio");
    } else {
        var dudaNew = { nombre: dudasNew.nombre, email: dudasNew.email, telefono: dudasNew.telefono, duda: dudasNew.duda };
        dudas.splice(id, 1,dudaNew);
        localStorage.setItem("duda", JSON.stringify(dudas));
        //Guardar Duda
        
    }
    vaciarDudas();
    llenarDudas();
}

