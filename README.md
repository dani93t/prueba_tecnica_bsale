# prueba técnica bsales

## descripcion
La prueba técnica de bsale, consiste en desplegar un simulador de una tienda online que vende productos comestibles entre ellos snack, bebidas, y licores entre otros. Esta se conecta a través de una API desarrollada específicamente para que funcione en la web y en ella están almacenada la información de los productos existentes.

La web, que es la vista, tiene un campo de búsqueda para que el usuario busque mediante palabras clave un producto específico o puedes filtrar la categoría usando el boton desplegable en donde una vez hecho la consulta retorna los productos deseados. La web, tambien es responsiva para aumentar la compatibilidad de la aplicación a los móbiles. 

La tienda se encuentra hospedada en https://bsale-tech-demo-front-daniel-t.herokuapp.com/ y si desa acceder a la API, puede acceder a https://bsales-tech-demo-back-daniel-t.herokuapp.com

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

### apiRest

Api de la tienda online de la prueba técnica de bsale permite acceder a los contenidos de la tienda, específicamente los productos y las categorías de ellas, cuyos datos son retornados en formato json para la integración simple en losproyectos.

Esta compuesto por dos rutas, una para acceder a los productos y la otra para las categorías, donde el de los productos es compatible con los filtros de palabras claves, categorías y ordenamiento de datos.

La API usa mysql como base de datos para extraer el contenido.

Para más información puede entrar [`aquí`](./back#readme)

### front
front-end de la tienda online de la prueba técnica de bsale en donde se encuentra la parte visual de la aplicación web, en otras palabras, la página web de la tienda.

Esta aplicación, permite visualizar los productos disponibles en la tienda, así también los filtros para buscar un producto en específico ingresando una palabra clave o filtrando la categoría. La página también es responsiva, es decir, que la web está preparada para ajustarse a un dispositivo movil.

Esta tienda online se conecta a una API que fue desarrollada de manera independiente, y que en ella almacena los productos. Al hacer clic en el campo de búsqueda, hace una llamada al servidor para extraer el contenido y actualizar el estado sin actualizar la página cambiando también la query string de la url para la cual, y para la facilidad del manejo entre la vista y la API, comparten la misma query string.

Para más información puede entrar [`aquí`](./front#readme)