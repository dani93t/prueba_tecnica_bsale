window.onload = (event) => {
    var busqueda = window.location.search || "";
    cargar(busqueda);
};

function cargar(params) {
    fetch("http://localhost:3600/search"+ params, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    }).then(response=>response.json())
    .then(json=>agrupar(json))
    .then(json=>cargarProductos(json)).catch(
        err=>console.log(err)
    );
}

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
        <div class="col-12 col-lg-3 bg-white">
            <p class="text-uppercase my-lg-0 px-4">${p.product}</p>
            <img class="w-100" src="${p.url_image || "./assets/img/carro_compra.webp"}"></img>
            <p class="my-lg-0 px-4">${p.discount ? `<span class="text-muted tached">$${p.price}</span>`: ""} <span class="text-body">$${Math.floor(p.price*((100-p.discount)/100))}</span>pesos</p>
            ${p.discount && `<p class="my-lg-0 px-4">${p.discount}% de descuento</p>` || ""}
        </div>
        `;});
        productos.innerHTML = productoHTML;
    });
}

document.getElementById("formulario").addEventListener("submit",(event)=>console.log("submiteado"));
