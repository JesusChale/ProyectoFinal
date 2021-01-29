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
            xhttp.open('GET','json/almacenamiento.json',true);
            categText = "Almacenamiento";

            break;
        case 1:
            xhttp.open('GET','json/audio.json',true);
            categText = "Audio";
            break;
        case 2:
            xhttp.open('GET','json/cables.json',true);
            categText = "Cables y Accesorios";
            break;
        case 3:
            xhttp.open('GET','json/consumibles.json',true);
            categText = "Consumibles";
            break;
        case 4:
            xhttp.open('GET','json/electronica.json',true);
            categText = "Electronica y Hogar";
            break;
        case 5:
            xhttp.open('GET','json/energia.json',true);
            categText = "Energia";
            break;
        case 6:
            xhttp.open('GET','json/enfriamento.json',true);
            categText = "Enfriamento";
            break;
        case 7:
            xhttp.open('GET','json/gabinetes.json',true);
            categText = "Gabinetes";
            break;
        default:
            queryString = 8;
            xhttp.open('GET','json/recomendaciones.json',true);
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
        aHome.setAttribute("href","index.html");
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
    xhttp.onload = function() {
        if(xhttp.readyState === 4 && xhttp.status == 200) {
            var datos = JSON.parse(xhttp.responseText);
            //console.log(datos);
            llenarCateg(datos);
        }
    }
    
}

function llenarCateg(datos) {
    
    //Obtener divisor donde estaran todos los productos
    var divPrincipal = document.getElementById("productos");
    for (var x = 0;x<datos.length;x++){
        //Obtener producto
        var product = datos[x];
        //Divisor de anuncio
        var divProd = document.createElement("div");
        divProd.setAttribute("class","col border");
        divPrincipal.appendChild(divProd);
        //Imagen
        var img = document.createElement("img");
        img.setAttribute("class","img-anuncio");
        img.setAttribute("src",product.source);
        img.setAttribute("alt",product.sourceAlt);
        divProd.appendChild(img);
        //Divisor contenido
        var divCont = document.createElement("div");
        divCont.setAttribute("class","contenido-anuncio d-flex flex-column");
        divProd.appendChild(divCont);
        //h4 - Nombre
        var hProd = document.createElement("h4");
        hProd.setAttribute("class","fw500");
        var nombre = document.createTextNode(product.nombre);
        hProd.appendChild(nombre);
        divCont.appendChild(hProd);
        //p - Precio
        var pPrecio = document.createElement("p");
        pPrecio.setAttribute("class","precio");
        var precio = document.createTextNode(product.precio);
        pPrecio.appendChild(precio);
        divCont.appendChild(pPrecio);
        //a - Boton para detalles
        var aBtn = document.createElement("a");
        aBtn.setAttribute("href","producto.html?"+queryString+"&"+x);
        aBtn.setAttribute("class","boton boton-gris d-block stretched-link align-self-end mt-auto");
        var btnTxt = document.createTextNode("Ver Detalles");
        aBtn.appendChild(btnTxt);
        divCont.appendChild(aBtn);

    }
}

//contacto.html

function validarContacto() {
    var valorNombre = document.getElementById("nombre").value;
    var valorEmail = document.getElementById("email").value;
    var valorTel = document.getElementById("telefono").value;
    var valorDuda = document.getElementById("duda").value;
    var error = [];
    if (valorNombre == "") {
        error.push("Nombre");
    }
    if (!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(valorEmail))) {
        error.push("E-mail");
    }
    if (valorTel != ""){
        if (!(/^[0-9]{8}$/.test(valorTel))) {
        error.push("Telefono");
        }
    }
    if (valorDuda == "") {
        error.push("Duda o Comentario");
    }
    console.log(error.length);
    
    if (error.length > 0) {
        var divAlert = document.createElement("div");
        divAlert.setAttribute("class","alert alert-danger alert-dismissible fade show alerta");
        divAlert.setAttribute("role","alert");
        var btnAlert = document.createElement("button");
        btnAlert.setAttribute("type","button");
        btnAlert.setAttribute("class","btn-close");
        btnAlert.setAttribute("data-dismiss","alert");
        btnAlert.setAttribute("aria-label","Close");
        var alertTxt = "1";
        if (error.length == 1){
            alertTxt = "El campo " + error[0] + " debe ser llenado correctamente";
        } else {
            alertTxt = "Los campos ";
            //error.forEach(a => alertTxt += a + ", ");
            for(var x = 0;x<(error.length-1);x++){
                alertTxt += error[x] + ", ";
            }
            alertTxt += error[x] + " ";
            alertTxt += "deben ser llenados correctamente";
        }
        var alertTxtNd = document.createTextNode(alertTxt);
        divAlert.appendChild(alertTxtNd);
        divAlert.appendChild(btnAlert);
        var formCont = document.getElementsByClassName("contacto")[0];
        formCont.parentNode.insertBefore(divAlert,formCont);
    }
}