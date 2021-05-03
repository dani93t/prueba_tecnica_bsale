# Vista web tienda online

front-end de la tienda online de la prueba técnica de bsale en donde se encuentra la parte visual de la aplicación web, en otras palabras, la página web de la tienda.

Esta aplicación, permite visualizar los productos disponibles en la tienda, así también los filtros para buscar un producto en específico ingresando una palabra clave o filtrando la categoría. La página también es responsiva, es decir, que la web está preparada para ajustarse a un dispositivo movil.

Esta tienda online se conecta a una API que fue desarrollada de manera independiente, y que en ella almacena los productos. Al hacer clic en el campo de búsqueda, hace una llamada al servidor para extraer el contenido y actualizar el estado sin actualizar la página cambiando también la query string de la url para la cual, y para la facilidad del manejo entre la vista y la API, comparten la misma query string.


## Instalación y ejecución del servidor


instalar las dependencias.
```
npm install
```

iniciar servidor con el siguente comando

```
npm start
```

## uso

Al iniciar la aplicación, ésta se encuentra dividida en dos secciones. En la parte superior se encuentra el campo de busqueda y el filtro de categorías además de la página de inicio o "home" y el boton de buscar, y en la parte inferior se muestran los productos retornados por la API con su respectivo nombre, imagen, precio y posible descuento, además de un boton de compra en donde actualmente no tiene una funcionalidad definida.

Al momento de navegar por la aplicación actualizando los filtros de búsqueda se almacenará los resultados en la url, la cual, en el caso de retroceder en el navegador, realizará las consultas realizadas anteriores sin recargar la página.

También, al igual que en muchas páginas, es posible acceder a una búsqueda específica usando la query string de la url.