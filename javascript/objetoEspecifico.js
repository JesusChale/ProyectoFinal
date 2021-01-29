
var categEleg = recomendaciones;
var categText = "";
var id= 0;

function obtenerDatos() {

    var queryDict = {}
    queryDict=location.search.substring(1).split("&");
    var queryString = parseInt(queryDict[0]);
    id=parseInt(queryDict[1]);
    console.log(queryString);

    //Breadcrumb
    var subtitulo = document.getElementById("subtituloOl");
    var liHome = subtitulo.getElementsByTagName("li")[0];

    
    switch (queryString) {
        case 0:
            categEleg = almacenamiento;
            categText = "Almacenamiento";
            break;
        case 1:
            categEleg = audio;
            categText = "Audio";
            
            break;
        case 2:
            categEleg = cables;
            categText = "Cables y Accesorios";
            break;
        case 3:
            categEleg = consumibles;
            categText = "Consumibles";
            break;
        case 4:
            categEleg = electronica;
            categText = "Electronica y Hogar";
            break;
        case 5:
            categEleg = energia;
            categText = "Energia";
            break;
        case 6:
            categEleg = enfriamento;
            categText = "Enfriamento";
            break;
        case 7:
            categEleg = gabinetes;
            categText = "Gabinetes";
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


}

function obtener(id,categoria) {
    //console.log(categoria.find(a=>a.id === id));
    return categoria.find(a=>a.id === id);
}


function llenarObjeto() {
    obtenerDatos();
    
    //Obtener divisor donde estaran todos los productos
    var divPrincipal = document.getElementById("producto");
    
    //Obtener producto
    var product = obtener(id,categEleg);
    console.log(product);

    var seccionImagen = document.getElementById("imagen");
    var img=document.createElement("img");
    img.setAttribute("src",product.source);
    img.setAttribute("alt",product.sourceAlt);
    seccionImagen.appendChild(img);
    

        

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
