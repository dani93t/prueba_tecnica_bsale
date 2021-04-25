var express = require('express');
var sqlConnection = require('./db');
var router = express.Router();


// función que procesa la solicitud desde el front y retorna la lista de productos 
router.get('/search',(req, res)=>{
    var tagSeach = req.query;

    // CAMPOS A ENTREGAR
    let campos = "p.id id, p.name product, url_image, price, discount, c.name category";
    
    // PARÁMETROS PARA EL WHERE
    var producto = tagSeach && tagSeach.product && "WHERE p.name LIKE " + sqlConnection.escape("%"+tagSeach.product+"%")+ " " || "";
    // var catFilter = tagSeach && tagSeach.filter_cat && "category = " + tagSeach.filter_cat +" " || "";  

    // PARÁMETROS DE ORDEN DE PRODUCTOS
    var orden = tagSeach && tagSeach.order_key && "ORDER BY " + tagSeach.order_key +" " || "ORDER BY category ASC ";

    // función que realiza la consulta a a la base de datos
    q = "SELECT "+campos+" FROM product p INNER JOIN category c ON p.category = c.id " +producto + orden;
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

// ruta para que al colocar cualquier direccion distinta a "/search" 
// te redireccione automáticamente a "/search"
router.get("**", (req,res)=>{
    res.redirect(301,'/search');
})

// WHERE campo IN (1,2,3) sql;
// "("+foo.join()+")"

module.exports = router;