# Ejercicio Técnico - Backend

## Corriendo localmente

En el directorio del proyecto, puede ejecutar:

### `npm run dev`

## URL api en la nube

### `https://enigmatic-retreat-28061.herokuapp.com/`

## Funcionalidades de las API REST.

Dada una dirección IP, encuentra el país al que pertenece, y
muestra:

<li>El nombre y código ISO del país.</li>
<li>Los idiomas oficiales del país.</li>
<li>Distancia estimada entre Buenos Aires y el país, en km.</li>
<li>Moneda local.</li>

## Models
Se uso Mongodb Atlas
<br>
<li><strong>src/db/models/Stats.js</strong> :Modelado de la tabla stats.</li>

## Controllers
Se establecen los metodos que las api llamaran al visitar las rutas
<br>
<li><strong>src/controllers/stats.controller.js</strong> :Devuelve las estadisticas obtenidas en el trace.</li>
<li><strong>src/controllers/trace.controller.js</strong> :Dada una ip consulta datos en las api (http://api.ipapi.com/,https://restcountries.eu/rest/v2/alpha/{code}) y procesa y almacena en la tabal stats.</li>

## Routes
Se define todos los endpoint de la api
<br>
<li><strong>src/routes/stats.routes.js</strong> :El endpoint -> /stats</li>
<li><strong>src/routes/trace.routes.js</strong> :El endpoint -> /trace</li>


--------------------------------------

# Desarrollado por
<p>Edgar Daniel Mogollón - 02 Junio 2021</p>
