//Categorias
var recomendaciones = [{id: 0,nombre: 'Router Mercusys MW302R 300mbps',source: 'img/Productos/845973089351.jpg',
sourceAlt: 'Router Mercusys',precio: '$298.00 MXN'}];
var almacenamiento = [{
    id: 0,nombre: 'Disco Duro Solido 480GB A400 Kingston',source: 'img/Productos/740617263442.jpg',sourceAlt: 'SSD 480GB',
    precio: '$1,445.00 MXN'},
{id: 1, nombre: 'Disco Duro WD 3.5 1TB 72000RPM',source: 'img/Productos/WD10EZEX.jpg',sourceAlt: 'D.D.1TB WD',
precio: '$1,148.00 MXN'},
{id: 2,nombre:'Disco Duro Purpura WD 2TB',source: 'img/Productos/WD20PURZ.jpg',sourceAlt: 'D.D.Purpura 2TB',precio: '$1,677.00 MXN'},
{id: 3,nombre: 'Disco Duro Solido 120GB Adata SU650',source: 'img/Productos/4713218461155.jpg',sourceAlt: 'SSD 120GB',
precio: '$539.00 MXN'}];
var audio = [{
    id: 0,nombre: 'Diadema HP-300C microfono 2 jacks vorago',source: 'img/Productos/7502266670148.jpg',sourceAlt: 'Diadema HP300C',
    precio: '$219.00 MXN'},
{id: 1,nombre: 'Diadema Vorago HP-204',source: 'img/Productos/7502266671732.jpg',sourceAlt: 'Diadema Vorago HP-300C',
precio: '$290.00 MXN'},
{id: 2,nombre: 'Manos libres Vorago BTE-400 Bluetooth',source: 'img/Productos/7502266677291.jpg',sourceAlt: 'Manos libres BTE-400',
precio: '$326.45 MXN'}];
cables =[{id: 0,nombre:'Cable Micro USB 107 Vorago Negro',source: 'img/Productos/7502266671459.jpg',sourceAlt: 'Cable Micro USB',
precio: '$67.00 MXN'}];
consumibles = [{id: 0,nombre: 'Cartcuho de Tinta HP 662 Tricolor',source: 'img/Productos/886112670122.jpg',sourceAlt: 'Cartucho HP 662',
precio: '$280.00 MXN'}];
electronica = [{id: 0,nombre: 'Escritorio para computadora AM100GEN08',source: 'img/Productos/798302168527.png',
sourceAlt: 'Escritorio cafe',precio: '$656.00 MXN'}];
energia = [{id: 0,nombre: 'Power Bank PT100 Adata 1000MAH Verde',source: 'img/Productos/4712366961135.jpg',sourceAlt: 'Power Bank 1000',
precio: '$347.00 MXN'}];
enfriamento = [{id: 0,nombre: 'Disipador de Calor CPU Gemini M4 Cooler Master',source: 'img/Productos/884102014949.jpg',
sourceAlt: 'Cooler Master M4',precio: '$931.00 MXN'}];
gabinetes = [{id:0,nombre: 'Gabinete PC Slim Bern Acteck 500W', source: 'img/Productos/7506215902335.jpg',sourceAlt: 'Gabinete Bern',
precio: '$1,307.00 MXN'}];

//index.html
var categEleg = recomendaciones;
var queryString = parseInt(location.search.substring(1));

function obtenerCateg() {
    //Carousel
    var carousel = document.getElementById("carouselExampleIndicators");
    //Breadcrumb
    var subtitulo = document.getElementById("subtituloOl");
    var liHome = subtitulo.getElementsByTagName("li")[0];
    var categText = "";

    

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
        default:
            queryString = 8;
            break;    
    }
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


}

function obtener(id,categoria) {
    //console.log(categoria.find(a=>a.id === id));
    return categoria.find(a=>a.id === id);
}


function llenarCateg() {
    obtenerCateg();
    
    //Obtener tamaño categoria
    var size = 0;
    for (var obj of categEleg){
        size++;
    }
    console.log("Tamaño: "+size);
    //Obtener divisor donde estaran todos los productos
    var divPrincipal = document.getElementById("productos");
    for (var x = 0;x<size;x++){
        //Obtener producto
        var product = obtener(x,categEleg);
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
    
}