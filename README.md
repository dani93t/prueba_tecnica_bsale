# prueba técnica bsales

## descripcion
La prueba técnica de bsale, consiste en desplegar un simulador de una tienda online que vende productos comestibles entre ellos snack, bebidas, y licores entre otros. Esta tienda Online, usa una API REST para gestionar el contenido de la página evitando entre otras cosas la recarga de página.

Como todo API REST, está compuesto por dos partes, Servidor y Cliente, en donde el Cliente, es decir, la aplicación web y vista, se encuentra los componentes visuales para buscar y encontrar el producto deseado por la persona, y el Servidor se encuentra toda la lógica de negocio para buscar y entregar asincrónicamente mediante JSON el contenido deseado por el usuario es decir el listado de producto.

El lado del cliente se encuentra la interfaz visual de la tienda online en donde en la parte superior se encuentra los campos de búsqueda y en la parte inferior los productos. Esta web es responsiva e implementa una búsqueda en tiempo real al momento de ingresar algún filtro en la aplicación web.

El lado del servidor se encuentra la API en donde se gestiona todo el contenido web, en este caso los productos con sus respectivas categorías, las cuales están resumidas en 3 rutas, uno para los productos en general, otro para las categorías, y otro que retorna un pequeño listado de productos que está pensando en un autocompletado de búsqueda (actualmente no implementado en cliente).

La demo de esta prueba técnica, se encuentra desplegada en heroku en donde puedes acceder al [Cliente](https://bsale-tech-demo-front-daniel-t.herokuapp.com/) o bien a la [API](https://bsales-tech-demo-back-daniel-t.herokuapp.com) 

## uso
Puede probar el proyecto desde este repositorio clonandolo o descargando el proyecto. 

primero, debe descargar o clonar el repositorio
```bash
git clone https://github.com/dani93t/prueba_tecnica_bsale.git
```

Para iniciar el lado back, debe hacer lo siguiente:

primero, ir a la carpeta back:

```bash
cd back
```

instalar los paquetes.
```bash
npm i
```

luego, iniciar servidor con el siguente comando
```bash
npm start
```

Una vez iniciada el backend, debe iniciar el front, para esto, habra una nueva consola desde la carpeta raíz del proyecto, e ir a la carpeta "front":

```bash
cd front
```

instalar los paquetes.
```bash
npm i
```

Luego, al igual con el back, debe iniciar la aplicación con el siguente comando

```bash
npm start
```
Con todo esto, ya se puede iniciar de manera local el proyecto.

## funcionamiento
Como fue explicado al principio, este repositorio está dividido en dos subproyecto, uno para la api y la otra para el front la cual puede hacer un vistazo en https://bsale-tech-demo-front-daniel-t.herokuapp.com/ para la vista o https://bsales-tech-demo-back-daniel-t.herokuapp.com. 

El detalle de estos proyectos se describirá a continuación.

### API

Api de la tienda online de la prueba técnica de bsale que permite acceder a los contenidos de la tienda, específicamente los productos y las categorías de ellas, cuyos datos son retornados en formato json para su facil integración en proyectos que lo requiera.

Esta API, está compuesto por tres rutas, uno para buscar un producto en específico mediante filtros, otro para extraer las categorías existentes de la tienda y otra para extraer un listado pequeño de productos usado para autocompletado de productos sugeridos.

La demo de esta API se encuentra hospedada en [heroku](https://www.heroku.com/home) haciendo clik [aquí](https://bsales-tech-demo-back-daniel-t.herokuapp.com)

Para más información entra [`aquí`](./back#readme)

### cliente

Cliente de la tienda online de la prueba técnica de bsale en donde se encuentra la aplicación web con todos sus componentes visuales tales como los campos de filtro, y el área visual donde se encuentra los productos.

Esta aplicación, tiene el fin de mostrar productos disponibles en la tienda, e interactuar con el usuario para filtrar el o los productos para dar mayor facilidad a la hora de buscar un producto en específico. Como característica de la aplicación web, es responsiva para dispositivos móviles, no se recarga al modificar los filtros y posee una búsqueda en tiempo real (live search) en donde al modificar un campo en los filtros, se actualiza de manera automática.

Esta tienda online funciona mediante API REST que fue desarrollada de manera independientemente para que funcione en esta aplicación, en donde al interactuar con los filtros disponible, realiza peticiones ajax (GET) para obtener y actualizar la vista mediante datos JSON sin recargar la página, y que a su vez cambia la query string de la url para almacenar el estado de la consulta para el usuario, y que, para la facilidad del manejo del cliente y la API, comparten la misma query string.

La demo del cliente se encuentra hospedada en [heroku](https://www.heroku.com/home) haciendo clik [aquí](https://bsale-tech-demo-front-daniel-t.herokuapp.com/)

Para más información puede entrar [`aquí`](./front#readme)