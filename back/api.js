var sqlConnection = require('./db');

const idValid = ['price','category','product','discount'];

// construye el WHERE a través de los filtros
function filterToWhere(...params) {
    let validos = [];
    params.forEach((p,i)=>{
        if (p) validos.push(i);
    });
    if (validos.length == 0) return "";
    if (validos.length == 1) return "WHERE " + params[validos[0]];
    if (validos.length > 1) {
        let where = "WHERE ";
        validos.forEach((p,i,v)=>{
            where += params[p];
            where += i <= v.length -2 ? "AND " :"";
        });
        return where;
    }
}

// función que construye la query para la busqueda
function buildQuery(tagSeach){
    // CAMPOS A ENTREGAR
    let campos = "p.id id_p, c.id id_c, p.name product, url_image, price, discount, c.name category";

    // PARÁMETROS PARA EL WHERE
    let prodFilter = tagSeach && tagSeach.product && "p.name LIKE " + sqlConnection.escape("%"+tagSeach.product+"%")+ " " || "";
    let catFilter = tagSeach && tagSeach.cats && "c.id IN (" + sqlConnection.escape(tagSeach.cats) + ") " || "";  
    let where = filterToWhere(prodFilter, catFilter);

    // PARÁMETROS DE ORDENAMIENTO DE PRODUCTOS
    var orden = tagSeach && tagSeach.sort && idValid.includes(tagSeach.sort) && 'ORDER BY ' + sqlConnection.escapeId(tagSeach.sort,false) + ' ' || "ORDER BY id_c ASC ";
    return "SELECT "+ campos +" FROM product p INNER JOIN category c ON p.category = c.id " + where + orden;
}

// funcion que hace la consulta a mysql
function query(q ,req ,res ){
    console.log(q);
    sqlConnection.query(q,(err, rows, fields)=>{
        if (err){
            res.send({
                message:"error a la DB, reconectar por favór",
                code: 501,
                dcode: err.errno,
                detail: err.code
                });
        }
        if (rows && rows.length == 0){
            console.log("dentro del vacío");
            res.json({
                message: "ningun resultado devuelto",
                code: 404,
                dcode: 0,
                detail: ""
                })
        }
        if (rows && rows.length > 0){
            res.json(rows);
        }
    });
}

// sólo exporta las funciones para enviar el contenido al front
module.exports = {
    busqueda: function(req, res){
        let q = buildQuery(req.query);
        query(q,req,res);
    },

    categorias: function(req, res){
        q = "SELECT * FROM category";
        query(q,req,res);
    },

    productos: function(req, res){
        q = "SELECT name FROM product WHERE name LIKE '%%'";
        query(q,req,res);
    }
}