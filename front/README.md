# Vista web tienda online

front-end de la tienda online para la prueba técnica para bsale la cual se encuentra la parte visual de dicha aplicación.

La query string de la página comparte con la api para tener un manejo más directo a la tienda y los datos de la api.

Como se trata de una aplicación mediante api-rest, la página no recarga en el caso de modificación de estado y realiza una nueva petición a la api con los datos actualizados.

## Instalación y ejecución del servidor

primero, ir a la carpeta back:

```
cd ./front
```

instalar las dependencias.
```
npm install
```

finalemte, iniciar servidor con el siguente comando

```
npm start
```

## uso

Al abrir la página, se muestra una interfaz en donde sale un campo de búsqueda y un boton desplegable para filtrar las categorías. En la parte inferiór se encuentra los productos con su respectivo precio y descuento si lo hay y un boton de compra la cual no tiene funcion alguna.

Mientras navega por la página cambiando los campos de búsqueda se almacenará los estados la cual en caso de retroceso, ésta recargará los contenidos de ella. 

También es posible acceder a una búsqueda específica mediante url con el query string específico.