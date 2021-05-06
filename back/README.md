# API tienda online

Api de la tienda online de la prueba técnica de bsale que permite acceder a los contenidos de la tienda, específicamente los productos y las categorías de ellas, cuyos datos son retornados en formato json para su facil integración en proyectos que lo requiera.

Esta API, está compuesto por tres rutas, uno para buscar un producto en específico mediante filtros, otro para extraer las categorías existentes de la tienda y otra para extraer un listado pequeño de productos usado para autocompletado de productos sugeridos.

La demo de esta API se encuentra hospedada en [heroku](https://www.heroku.com/home) haciendo clik [aquí](https://bsales-tech-demo-back-daniel-t.herokuapp.com)


## Instalación y ejecución del servidor

instalar los paquetes.
```
npm install
```

Iniciar servidor con el siguente comando

```
npm start
```

El servidor por defecto se iniciará en el puerto 3000 del localhost o bien http://localhost:3000.

## Funcionamiento y uso

La API usa como base de datos MySQL que fue proporcionada por la empresa y es mediante ella en donde se encuentra hospedado la información. La API por su parte se encarga de procesar las peticiones dadas por el usuario a la base de datos y entregar la información deseada.

A continuación se explicará en detalle las rutas disponibles para el uso de la API.

### "**/search**"
Esta ruta extrae el listado de los productos incluidos en la tienda con todos sus detalles: nombre, categoria, precio, descuento e ids, y ésta es usado para ser mostrado en la pantalla principal de la aplicación web. Esta ruta es compatible con filtros en formato Query String que son ingresados por el usuario que son 3 en total, *product*, *cats* y *sort*, las cuales serán explicadas a continuación.

1. **product:** Filtra el nombre del producto mediante una secuencia de caracteres de tamaño 1 o mayor.
2. **cats:** Filtra los productos según la o las categoría/s especificadas por el usuario.
3. **sort:** Ordena los resultados de manera ascendente según el producto (*product*), categoría (*category*), precio (*price*) o descuento (*discount*). Si ingresa algo distinto de los mencionados, retorna los datos con el ordenamiento por defecto que trae la API, es decir, por el id del producto. 
4. **sin filtros:** es posible solicitar la información sin utilizar filtros la cual retornará todos los productos de la tienda y ordenada por el id del producto.

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

### **"/categories"**

Esta ruta retorna los nombres de las categorías con su id y sirve para rellenar el campo del filtrado por categorías. La razon de esta ruta, es porque está pensada para proyectos escalables en donde pueden integrarse nuevas categorias a la tienda.

**ejemplo de solicitud:**
```bash
curl -X GET 127.0.0.1:3000/categories
```

**ejemplo de respuesta:**
```json
[
    {
        "category":"bebida energetica",
        "id":1,
    },
    {
        "category":"bebida",
        "id":2,
    },
    {
        ...
    }
]
```

### "/products"

Esta ruta retorna un reducido listado de nombres de productos, pensado para ser integrado en un autocompletado en el campo de busqueda.

**ejemplo de solicitud:**
```bash
curl -X GET 127.0.0.1:3000/products?key=mani
```

**ejemplo de respuesta:**
```json
[
    {
        "name":"mani salado",
    },
    {
        "name":"mani sin sal",
    },
    {
        ...
    }
]
```