// usar uno de los dos según el entorno, por defecto usar el localhost

// const hostBack = "https://bsales-tech-demo-back-daniel-t.herokuapp.com";    
const hostBack = "http://127.0.0.1:3000";    

var url_str = window.location.href;
var url = new URL(url_str);


window.onpopstate = window.onload = (event) => {
    var busqueda = window.location.search || "";
    console.log(busqueda);
    apiSeach(busqueda);
};

// función que realiza la conexion al backend para obtener los datos solicitados
// lo cual lo hace mediante una petición asincrónica
function apiSeach(params) {
    fetch( hostBack +"/search"+ params, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    }).then(response=>response.json())
    .then(json=>agruparByCategoria(json))
    .then(json=>printProducts(json)).catch(
        err=>console.log(err)
    );
}

// funcion que agrupa el json resultante de la base de datos en 
// categorías independientes
function agruparByCategoria(json) {
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
        <div class="col-6 col-lg-3 my-md-3 px-0 px-md-3 ">
            <div class="bg-white h-100 shadow-sm border">
                <div class="p-titulo">
                    <p class="text-uppercase my-lg-0 px-4 text-center font-weight-bold">${p.product}</p>
                </div>
                <img class="w-100 p-image" src="${p.url_image || "./assets/img/carro_compra.png"}"></img>
                <div class="border-top w-75 py-2 ml-auto mr-auto d-flex">
                    <div>
                        <p class="my-lg-0">${p.discount ? `<span class="text-muted tached">$${p.price}</span>`: ""} <span class="text-body">$${Math.floor(p.price*((100-p.discount)/100))}</span> pesos</p>
                        ${p.discount && `<p class="my-lg-0">${p.discount}% de descuento</p>` || ""}
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

document.getElementById("lista-categoria").addEventListener("click",(e)=>{
    let listaCats =  document.querySelector("#lista-categoria + .dropdown-menu");
    if (listaCats.innerHTML == false){
        getCategorias(listaCats);
    }
},{once:true});

// extrae las categorias desde la base de datos
function getCategorias(listaCats) {
    fetch( hostBack +"/categories", {
        method: 'GET',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    }).then(response=>response.json())
    .then(json=>llenarCategorias(json,listaCats))
    .catch(
        err=>console.log(err)
    );
}

// llena el listado de categorías en el html
// específicamente en el filtrado de categorias1
function llenarCategorias(cats,listaCats) {
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

document.getElementById("formulario").addEventListener("submit",
    (event)=>{
        event.preventDefault();
        let queryString = createQueryString(event.target);
        history.pushState(null, "", "index.html"+queryString);
        apiSeach(queryString);
    });

function createQueryString(form) {
    const params = new URLSearchParams();
    for (const key in form) {
        if (form[key] && form[key].type){
            switch (form[key].type) {
                case "text":
                    form[key].value && params.append(form[key].name,form[key].value);
                    break;
                case "checkbox":
                    form[key].checked && params.append(form[key].name, form[key].value);
                    break;
                default:
                    break;
            }
        }
    }

    return "?" + params.toString();
}


