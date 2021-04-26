window.onload = (event) => {
    var busqueda = window.location.search || "";
    var hostBack = "https://bsales-tech-demo-back-daniel-t.herokuapp.com";    
    conexionBack(busqueda,hostBack);
};

// función que realiza la conexion al backend para obtener los datos solicitados
// lo cual lo hace mediante una petición asincrónica
function conexionBack(params,host) {
    fetch( host +"/search"+ params, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    }).then(response=>response.json())
    .then(json=>agruparByCategoria(json))
    .then(json=>mostrarProductos(json)).catch(
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
function mostrarProductos(json) {
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
        <div class="col-6 col-lg-3 my-4">
            <div class="bg-white h-100 shadow-sm">
                <div class="p-titulo">
                    <p class="text-uppercase my-lg-0 px-4 text-center font-weight-bold">${p.product}</p>
                </div>
                <img class="w-100 p-image" src="${p.url_image || "./assets/img/carro_compra.webp"}"></img>
                <div class="p-precio">
                    <p class="my-lg-0 px-4">${p.discount ? `<span class="text-muted tached">$${p.price}</span>`: ""} <span class="text-body">$${Math.floor(p.price*((100-p.discount)/100))}</span> pesos</p>
                    ${p.discount && `<p class="my-lg-0 px-4">${p.discount}% de descuento</p>` || ""}
                </div>
            </div>
        </div>
        `;});
        productos.innerHTML = productoHTML;
    });
}

// document.getElementById("formulario").addEventListener("submit",(event)=>console.log("submiteado"));
