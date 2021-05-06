var express = require('express');
var router = express.Router();
var api = require('./api');


// listado de rutas que se usará en la API
router.get('/search',api.busqueda);

router.get("/categories", api.categorias);

router.get("/products", api.productos);
// ruta para que al colocar cualquier direccion distinta a "/search" 
// te redireccione automáticamente a "/search"
router.get("**", (req,res)=>{
    res.redirect(301,'/search');
})

module.exports = router;
// http://127.0.0.1:5500/front/index.html?cats=1%27;--&cats=4&cats=6