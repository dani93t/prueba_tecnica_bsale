import {config} from "./configuration.js";
// usar uno de los dos según el entorno, por defecto usar el localhost

var articulos = [];


window.onpopstate = window.onload = (event) => {
    var busqueda = window.location.search || "";
    getSearch(busqueda);
};

// función que realiza la conexion al backend para obtener los datos solicitados
// lo cual lo hace mediante una petición asincrónica
function getSearch(params) {
    fetch( config.IPapi +"/search"+ params, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    }).then(
        response=>response.json()
    )
    .then(json=>
        prosessData(json)
    )
    .catch(
        err=>showError({
            message: "no se ha podido conectar al servidor",
            code: 404,
            dcode: 0,
            detail: err,
            etype: "D"
            })
    );
}

// procesa el resultado y decide si enviarlo como error o
// llenar la vista
function prosessData(json){
    if (json.message){
        showError(json);
    }else{
        articulos = json;
        let agrupado = groupCats(json);
        printProducts(agrupado);
    }
}

const eTypeClass = {
    "W": "alert-warning",
    "D": "alert-danger"
}
// muestra en pantalla cualquier tipo de error generado en la aplicación
function showError(err) {
    let categorias = document.getElementById("productos");
    categorias.innerHTML = `
        <div class="alert ${eTypeClass[err.etype]} mt-5" role="alert">
            <p>Error ${err.code}. ${err.message}</p>
            <p class="my-0 font-weight-bolder">Detalles:</p>
            <p class="mt-0">${err.dcode}. ${err.detail}</p>
        </div>
    `;
}

// funcion que agrupa el json resultante de la base de datos en 
// categorías independientes
function groupCats(json) {
    let jsonAgrupado = {};
    json.forEach((v)=> { 
        if(!jsonAgrupado[v.category]) jsonAgrupado[v.category]=[];
        jsonAgrupado[v.category].push(v)});
    return jsonAgrupado;
}

// funcion que se encarga de rellenar los productos en el html
function printProducts(json) {
    let categorias = document.getElementById("productos");
    let categoriasHTML = "";
    // dibuja en el HTML las categorías
    Object.keys(json).forEach(v=>{
        categoriasHTML += `
        <article class="my-5" id="${v.replace(" ","-")}">
            <h4 class="text-uppercase text-black-50">${v}</h4>
            <hr>
            <div class="row">
                <p>contenido aquí</p>
            </div>
        </article>
        `;}
    )
    categorias.innerHTML = categoriasHTML;

    // dibuja en el HTML los productos
    Object.keys(json).forEach(v=>{
        let productos = document.querySelector("#"+v.replace(" ","-")+" .row");
        let productoHTML = "";
        json[v].forEach(p=>{
            productoHTML += `
                <div class="col-6 col-lg-4 col-xl-3 my-md-3 px-0 px-md-3">
                    <div class="bg-white h-100 shadow-sm border">
                        <div class="p-titulo">
                            <p class="text-uppercase my-lg-0 px-4 text-center font-weight-bold">${p.product}</p>
                        </div>
                        <img class="w-100 p-image" src="${p.url_image || "./assets/img/carro_compra.png"}"></img>
                        <div class="border-top w-75 py-2 ml-auto mr-auto d-flex">
                            <div class="precio">
                                <p class="my-0 font-weight-bolder">${p.discount ? `<span class="text-muted tached">$${p.price}</span>`: ""} <span class="text-body">$${Math.floor(p.price*((100-p.discount)/100))}</span></p>
                                ${p.discount && `<p class="my-0">${p.discount}% desc.</p>` || ""}
                            </div>
                            <div class="buy">
                                <span class="fa fa-shopping-cart fa-2x"></span>
                            </div>
                        </div>
                    </div>
                </div>
        `;});
        productos.innerHTML = productoHTML;
    });
}


/////////////////////////////////////////////////
// EXTRACCIÓN DE CATEGORÍAS
////////////////////////////////////////////////


document.getElementById("lista-categoria").addEventListener("click",(e)=>{
    let listaCats =  document.querySelector("#lista-categoria + .dropdown-menu");
    if (listaCats.innerHTML == false){
        getCats(listaCats);
    }
},{once:true});

// extrae las categorias desde la base de datos
function getCats(listaCats) {
    fetch( config.IPapi +"/categories", {
        method: 'GET',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    }).then(response=>response.json())
    .then(json=>printCats(json, listaCats))
    .catch(
        err=>console.log(err)
    );
}

// llena el listado de categorías en el html
// específicamente en el filtrado de categorias1
function printCats(cats,listaCats) {
    var url_str = window.location.href;
    let url = new URL(url_str);
    let catsFilter = "";
    let catsAttr = url.searchParams.getAll("cats");
    cats.forEach((c)=>{
        catsFilter += `
        <div class="form-check my-2" style="justify-content: left;">
            <input class="form-check-input ml-sm-2" id="cats${c.id}" type="checkbox" name="cats" value="${c.id}" ${catsAttr.includes(c.id.toString()) ? "checked":""} >
            <label class="form-check-label" for="cats${c.id}">
                ${c.name}
            </label>
        </div>
        `;
    });
    listaCats.innerHTML = catsFilter;
}


/////////////////////////////////////////////////
// ENVÍO DE FORMULARIO
////////////////////////////////////////////////

// evento del submit para realizar una nueva llamada a la API
// y actualizar la url sin recargar la página

var form = document.querySelector("#formulario");
var interval;

form.addEventListener("submit",
    (event)=>{
        event.preventDefault();
        let queryString = createQueryString(event.target);
        history.pushState(null, "", "index.html"+queryString);
        getSearch(queryString);
    });

form.addEventListener("input",(e)=>{
    if (interval){
        clearTimeout(interval);
    }
    interval = setTimeout(()=>{
        let algo = createQueryString(form);
        history.pushState(null, "", "index.html"+algo);
        getSearch(algo);
    },
        500);
});

// genera la query string para actualizar la url
function createQueryString(form) {
    const params = new URLSearchParams();
    for (const key in form) {
        if (form[key] && form[key].type){
            switch (form[key].type) {
                case "text":
                    form[key].value && params.append(form[key].name,form[key].value);
                    break;
                case "search":
                    form[key].value && params.append(form[key].name,form[key].value);
                    break;
                case "checkbox":
                    form[key].checked && params.append(form[key].name, form[key].value);
                    break;
                case "radio":
                    form[key].checked && params.append(form[key].name, form[key].value);
                    break;
                default:
                    break;
            }
        }
    }
    return params.toString() && "?" + params.toString() || "";
}