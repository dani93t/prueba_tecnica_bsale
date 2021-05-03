# API tienda online

Api de la tienda online de la prueba técnica de bsale permite acceder a los contenidos de la tienda, específicamente los productos y las categorías de ellas, cuyos datos son retornados en formato json para la integración simple en losproyectos.

Esta compuesto por dos rutas, una para acceder a los productos y la otra para las categorías, donde el de los productos es compatible con los filtros de palabras claves, categorías y ordenamiento de datos.

La API usa mysql como base de datos para extraer el contenido.

## Instalación y ejecución del servidor


instalar los paquetes.
```
npm install
```

Iniciar servidor con el siguente comando

```
npm start
```

## Uso

Como fue explicado al inicio, la api tiene dos rutas para acceder a los datos, uno para obtener el listado de productos y otro para traer las sólo categorías de la tienda. Los filtros para las rutas, en especial para productos, se hacen por medio de Query String y los datos que retorna la api están en formato JSON.

A continuación se explicará en detalle la funcionalidad de las dos rutas incluidas en la API.

### /search
Esta ruta extrae los productos incluidos en la tienda la cual es compatible con filtros en Query String que son ingresados por el usuario que son 3 en total, producto, categorias y ordenamiento, las cuales serán explicadas a continuación.

1. **product:** Este parámetro filtra el nombre del producto mediante una secuencia de caracteres de tamaño 1 o mayor.
2. **cats:** Permite filtrar los productos según la o las categoría/s especificadas por el usuario.
3. **sort:** Ordena los resultados obtenidos por la ruta anterior según el atributo dado por el usuario que puede ser 'product','category','price' ó 'discount'. Al ingresar algo distinto de los mencionados retorna con el ordenamiento por defecto que trae la api, es decir, por la id del producto. 
4. **sin filtros:** es posible solicitar la información sin utilizar filtros, pero retornará todos los productos de la tienda y estará ordenada por categoría.

**ejemplo de solicitud**
```bash
curl -X GET http://127.0.0.1:3000/search?cats=1&cats=2&sort=price
```

**ejemplo de respuesta:**
```json
[
    {
        "id_p": 35,
        "id_c": 1,
        "product": "ENERGETICA MAKKA DRINKS",
        "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/makka-drinks-250ml0455.jpg",
        "price": 1190,
        "discount": 0,
        "category": "bebida energetica"
    },
    {
        "id_p": 7,
        "id_c": 1,
        "product": "ENERGETICA SCORE",
        "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/logo7698.png",
        "price": 1290,
        "discount": 0,
        "category": "bebida energetica"
    },
    {
        ...
    }
]
```

### /categories

Esta ruta retorna los nombres de las categorías con su respectivo identificador que están incluidas en la tienda online. Como es una extracción de una serie de datos no tiene filtros adicionales.

**ejemplo de solicitud:**
```bash
curl -X GET 127.0.0.1:3000/categories
```

**ejemplo de respuesta:**
```json
[
    {
        category:"bebida energetica",
        id:1,
    },
    {
        category:"bebida",
        id:2,
    },
    {
        ...
    }
]
```