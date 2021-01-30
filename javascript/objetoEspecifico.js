var id=null;
function obtenerDatos() {

    var queryDict = {}
    queryDict=location.search.substring(1).split("&");
    var queryString = parseInt(queryDict[0]);
    id=parseInt(queryDict[1]);
    var categText = "";
    //console.log(queryString);
    id= parseInt(queryDict[1]);

    //Breadcrumb
    var subtitulo = document.getElementById("subtituloOl");
    var liHome = subtitulo.getElementsByTagName("li")[0];
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
    

    if (categText != "") {
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
            llenarObjeto(datos);
        }
    }


}


function llenarObjeto(datos) {
    
    //Obtener producto
    var product = datos[id];
    
    //Llenar imagen
    var seccionImagen = document.getElementById("imagen");
    var img=document.createElement("img");
    img.setAttribute("src",product.source);
    img.setAttribute("alt",product.sourceAlt);
    seccionImagen.appendChild(img);
    

        
    //Llenar informacion 
    var seccionDatos=document.getElementById("inf");
    var pNombre=document.createElement("p");
    pNombre.setAttribute("class","subtitulos");
    var nombre =document.createTextNode(product.nombre);
    pNombre.appendChild(nombre);
    seccionDatos.appendChild(pNombre);

    var hr1 =document.createElement("hr");
    seccionDatos.appendChild(hr1);
    var br1 =document.createElement("br");
    seccionDatos.appendChild(br1);

    var pPrecio=document.createElement("p");
    pPrecio.setAttribute("class","subtitulos");
    var precio =document.createTextNode("Precio: "+product.nombre);
    pPrecio.appendChild(precio);
    seccionDatos.appendChild(pPrecio);

    var pesos=document.createElement("p");
    var tipoCambio =document.createTextNode("*Pesos Mexicanos");
    pesos.appendChild(tipoCambio);
    seccionDatos.appendChild(pesos);

    var hr2 =document.createElement("hr");
    seccionDatos.appendChild(hr2);
    var br2 =document.createElement("br");
    seccionDatos.appendChild(br2);

    var btnComprar =document.createElement("button");
    btnComprar.setAttribute("class","boton boton-gris");
    var txtBtn =document.createTextNode("Comprar");
    btnComprar.appendChild(txtBtn);
    seccionDatos.appendChild(btnComprar);
    
}

function comprobarNuevoPerf(){
    
    var inpNombre = document.getElementById("nuevNombre");
    var errorNombre=document.getElementById("errorNombre");
    if(inpNombre.value==""){
        errorNombre.innerHTML="*No puede estar vacio este campo";
    }else{
        errorNombre.innerHTML="";
    }
    var inpApellidos =document.getElementById("apellidos");
    var errorApellido=document.getElementById("errorApellido");
    if(inpApellidos.value==""){
        errorApellido.innerHTML="*No puede estar vacio este campo";
    }else{
        errorApellido.innerHTML="";
    }
    var inpTelefono =document.getElementById("telefono");
    var errorTelefono=document.getElementById("errorTel");
    if(inpTelefono.value==""){
        errorTelefono.innerHTML="*No puede estar vacio este campo";
    }else{
        if (!(/^[0-9]{10}$/.test(inpTelefono.value))) {
            errorTelefono.innerHTML="*El numero de telefono solo puede ser numerico";
        }else{
            errorTelefono.innerHTML="";
        }  
    }
    var inpEmail =document.getElementById("email");
    var errorEmail=document.getElementById("errorEmail");
    if(inpEmail.value==""){
        errorEmail.innerHTML="*No puede estar vacio este campo";
    }else{
        if (!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(inpEmail.value))) {
            errorEmail.innerHTML="*La contraseña debe contener un @ y un punto";
        }else{
            errorEmail.innerHTML="";
        }
        
    }
    var inpContraseña =document.getElementById("contraseña");
    var errorCont=document.getElementById("errorCont");
    if(inpContraseña.value==""){
        errorCont.innerHTML="*No puede estar vacio este campo";
    }else{
        errorCont.innerHTML="";
    }
    var inpConfirmar =document.getElementById("confirmar");
    var errorConf=document.getElementById("errorConf");
    if(inpConfirmar.value==""){
        errorConf.innerHTML="*No puede estar vacio este campo";
    }else{
        errorConf.innerHTML="";
    }
    //--------------------------------
    var inpDireccion =document.getElementById("direccion1");
    var errorDireccion=document.getElementById("errorDireccion");
    if(inpDireccion.value==""){
        errorDireccion.innerHTML="*No puede estar vacio este campo";
    }else{
        errorDireccion.innerHTML="";
    }
    var inpCp =document.getElementById("cp");
    var errorCp=document.getElementById("errorCp");
    if(inpCp.value==""){
        errorCp.innerHTML="*No puede estar vacio este campo";
    }else{
        errorCp.innerHTML="";
    }
    //_------------------------------
    var inpCiudad =document.getElementById("ciudad");
    var errorCiudad=document.getElementById("errorCiudad");
    if(inpCiudad.value==""){
        errorCiudad.innerHTML="*No puede estar vacio este campo";
    }else{
        errorCiudad.innerHTML="";
    }
    var inpEstado =document.getElementById("estado");
    var errorEstado=document.getElementById("errorEstado");
    if(inpEstado.value==""){
        errorEstado.innerHTML="*No puede estar vacio este campo";
    }else{
        errorEstado.innerHTML="";
    }
    var inpPais =document.getElementById("pais");
    var errorPais=document.getElementById("errorPais");
    if(inpPais.value==""){
        errorPais.innerHTML="*No puede estar vacio este campo";
    }else{
        errorPais.innerHTML="";
    }
    
    


}