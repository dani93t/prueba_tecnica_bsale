var express = require('express');
var sqlConnection = require('./db');
var router = express.Router();


router.get('/search',(req, res)=>{
    var tagSeach = req.query;

    var producto = tagSeach && tagSeach.product && "name LIKE " + sqlConnection.escape("%"+tagSeach.product+"%")+ " " || "";
    var catFilter = tagSeach && tagSeach.filter_cat && "category = " + tagSeach.filter_cat +" " || "";  

    var where = ("WHERE " + producto + (producto && catFilter && "AND " || "") + catFilter) || "";
    var orden = tagSeach && tagSeach.order_key && "ORDER BY " + tagSeach.order_key +" " || "ORDER BY category ASC ";
    var q = "SELECT * FROM product "+ where + orden;
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


module.exports = router;