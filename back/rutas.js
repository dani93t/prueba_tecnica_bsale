var express = require('express');
var sqlConnection = require('./db');
var router = express.Router();


router.get('/search',(req, res)=>{
    let campos = "p.id id, p.name product, url_image, price, discount, c.name category";
    var tagSeach = req.query;

    var producto = tagSeach && tagSeach.product && "WHERE p.name LIKE " + sqlConnection.escape("%"+tagSeach.product+"%")+ " " || "";
    // var catFilter = tagSeach && tagSeach.filter_cat && "category = " + tagSeach.filter_cat +" " || "";  

    // var where = ("WHERE " + producto + (producto && catFilter && "AND " || "") + catFilter) || "";
    var orden = tagSeach && tagSeach.order_key && "ORDER BY " + tagSeach.order_key +" " || "ORDER BY category ASC ";

    q = "SELECT "+campos+" FROM product p INNER JOIN category c ON p.category = c.id " +producto + orden;
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

router.get("**", (req,res)=>{
    res.redirect(301,'/search');
})

// WHERE campo IN (1,2,3) sql;

module.exports = router;