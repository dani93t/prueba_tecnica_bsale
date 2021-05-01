var express = require('express');
var sqlConnection = require('./db');
var router = express.Router();

// transforma los filtros en una consulta WHERE
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


// función que procesa la solicitud desde el front y retorna la lista de productos 
router.get('/search',(req, res)=>{
    let tagSeach = req.query;

    // CAMPOS A ENTREGAR
    let campos = "p.id id_p, c.id id_c, p.name product, url_image, price, discount, c.name category";
    
    // PARÁMETROS PARA EL WHERE
    let prodFilter = tagSeach && tagSeach.product && "p.name LIKE " + sqlConnection.escape("%"+tagSeach.product+"%")+ " " || "";
    let catFilter = tagSeach && tagSeach.cats && /^[0-9,]+$/.test(tagSeach.cats) && "c.id IN (" +  ( typeof tagSeach.cats == 'string' ? tagSeach.cats : tagSeach.cats.join() ) +") " || "";  
    let where = filterToWhere(prodFilter, catFilter);

    // PARÁMETROS DE ORDENAMIENTO DE PRODUCTOS
    var orden = tagSeach && tagSeach.order_key && "ORDER BY " + tagSeach.order_key +" " || "ORDER BY category ASC ";

    // función que realiza la consulta a a la base de datos
    let q = "SELECT "+campos+" FROM product p INNER JOIN category c ON p.category = c.id " + where + orden;
    console.log(q);
    sqlConnection.query(q,(err, rows, fields)=>{
        if (err){
            res.send({message:"error a la DB, reconectar por favór"});
            console.log(err);
        }
        if (!rows){
            console.log("vacío");
            res.send({message:"vacío"});
        }
        res.json(rows);
    });
});

router.get("/categories", (req,res)=>{
    sqlConnection.query("SELECT * FROM category",(err, rows, fields)=>{
        if (err){
            res.send({message:"error a la DB, reconectar por favór"});
            console.log(err);
        }
        if (!rows){
            console.log("vacío");
            res.send({message:"vacío"});
        }
        res.json(rows);
    });
})

// ruta para que al colocar cualquier direccion distinta a "/search" 
// te redireccione automáticamente a "/search"
router.get("**", (req,res)=>{
    res.redirect(301,'/search');
})

module.exports = router;