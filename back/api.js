var sql = require('./db');

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
    let prodFilter = tagSeach && tagSeach.product && typeof tagSeach.product == 'string' && "p.name LIKE " + sql.escape("%"+tagSeach.product+"%")+ " " || "";
    let catFilter = tagSeach && tagSeach.cats && "c.id IN (" + sql.escape(tagSeach.cats) + ") " || "";  
    let where = filterToWhere(prodFilter, catFilter);

    // PARÁMETROS DE ORDENAMIENTO DE PRODUCTOS
    var orden = tagSeach && tagSeach.sort && idValid.includes(tagSeach.sort) && 'ORDER BY ' + sql.escapeId(tagSeach.sort,false) + ' ' || "ORDER BY id_c ASC ";
    return "SELECT "+ campos +" FROM product p INNER JOIN category c ON p.category = c.id " + where + orden;
}

// funcion que hace la consulta a mysql
function query(q ,req ,res ){
    console.log(q);
    sql.query(q,(err, rows, fields)=>{
        if (err){
            res.send({
                message:"error a la DB, reconectar por favór",
                code: 501,
                dcode: err.errno,
                detail: err.code,
                etype: "D" 
                });
        }
        if (rows && rows.length == 0){
            res.json({
                message: "ningun resultado devuelto",
                code: 404,
                dcode: 0,
                detail: "",
                etype: "W"
                })
        }
        if (rows && rows.length > 0){
            res.json(rows);
        }
    });
}

// retorna un pequeño listado de nombres de productos
function queryProduc(query) {
    if (query.key && typeof query.key == 'string'){
        return "SELECT name FROM product WHERE name LIKE "+ sql.escape("%"+ query.key +"%") + " LIMIT 5";
    }else{
        return "SELECT name FROM product LIMIT 0";
    }
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
        q = queryProduc(req.query);
        query(q,req,res);
    }
}