console.log(window.location.search);
var busqueda = window.location.search || "";

fetch("http://localhost:3600/search"+ busqueda, {
    method: 'GET',
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    }
}).then(response=>response.json())
.then(json=>agrupar(json))
.then(json=>cargarProductos(json));


function agrupar(json) {
    let jsonAgrupado = {};
    json.forEach((v)=> { 
        if(!jsonAgrupado[v.category]) jsonAgrupado[v.category]=[];
        jsonAgrupado[v.category].push(v)});
    return jsonAgrupado;
}

function cargarProductos(json) {
    let categorias = document.getElementById("productos");
    let categoriasHTML = "";
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

    Object.keys(json).forEach(v=>{
        let productos = document.querySelector("#"+v.replace(" ","-")+" .row");
        let productoHTML = "";
        json[v].forEach(p=>{
            productoHTML += `
        <div class="col-12 col-lg-3">
            <img class="w-100" src="${p.url_image || "./assets/img/carro_compra.webp"}"></img>
            <p class="text-uppercase">${p.product}</p>
            <p>$${p.price} pesos</p>
            <p>${p.discount}% de descuento</p>
        </div>
        `;});
        productos.innerHTML = productoHTML;

    })
}
// document.querySelector("[id='bebida energetica'] h6")