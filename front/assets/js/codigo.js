// console.log(window);

fetch("http://localhost:3600/search",{method: 'GET',headers: {
    'Content-type': 'application/json; charset=UTF-8',
}}).then(response=>response.json())
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
        json[v].forEach(p=>{productoHTML += `
        <div class="col-3">
            <p>lorem ipsum moro ccss ana ana ano</p>
        </div>
        `;});
        productos.innerHTML = productoHTML;

    })
}
// document.querySelector("[id='bebida energetica'] h6")