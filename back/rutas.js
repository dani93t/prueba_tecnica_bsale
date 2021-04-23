var express = require('express');
var sqlConnection = require('./db');
var router = express.Router();


router.get('/search',(req, res)=>{
    var tagSeach = req.query;
    var q = "SELECT * FROM product WHERE name LIKE"+ sqlConnection.escape("%"+tagSeach.product+"%")+ "ORDER BY category";
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