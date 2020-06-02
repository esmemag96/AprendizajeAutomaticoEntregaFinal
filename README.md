# Teacher Grader
Enrique Lira Martínez A01023351<br/>
Emiliano Abascal Gurría A01023234<br/>
Antony Adrian Morales Rosas A01019582<br/>
Esmeralda Magdaleno Morales A01023086<br/>

# Resumen
Este proyecto fue desarrollado para el curso de “Aprendizaje Automático” impartido en el Tecnológico de Monterrey, el cual consiste en una aplicación web desplegada en la nube, la cual permite a alumnos evaluar a sus profesores utilizando lenguaje natural, mientras que también permite a profesores visualizar sus evaluaciones y una predicción de su futuro desempeño basado en evaluaciones pasadas utilizando métodos de aprendizaje automático.

# Planteamiento del problema
Hoy en dia las evaluaciones realizadas por alumnos hacia los profesores se hace normalmente con cuestionarios que van por lo general del 1 al 10, siendo el 1 la peor calificación y 10 la mejor, sin embargo en diversas situaciones los alumnos realizan estas evaluaciones de una manera rápida y aleatoria, por lo que las evaluaciones no son necesariamente representativas del desempeño del profesor. 

# Objetivo
El objetivo de este proyecto es desarrollar una plataforma en la cual se puedan llevar a cabo evaluaciones de una forma más eficiente y honesta de parte de los alumnos, de igual forma que sea útil para los profesores no solo para ver sus calificaciones, sino que también para que puedan ver retroalimentación sobre sus clases.

# Solución
Para cumplir el anterior objetivo se planteo desarrollar una aplicacion web, la cual permitirá a los alumnos realizar las evaluaciones de sus profesores a través de unas cuantas preguntas abiertas, estas preguntas se analizarán para determinar cuál es la connotación emocional de una respuesta y determinar su puntaje, basado en estas evaluaciones se determinará también la calificación de una clase, y utilizando regresiones lineales, se determinará cuál sería el resultado de sus próximas evaluaciones.

Para lograr lo anterior se implementaron dos APIs, una que realiza las predicciones de los profesores, y otra que se utiliza como backend para nuestra aplicación web, el cual se encarga de proveer de información al servicio de frontend. Tanto la API de predicciones como el frontend de nuestra app web, están desplegados en Kubernetes, la base de datos en Atlas por mongodb y el backend está desplegado en funciones “serverless”.

# Alcance
El alcance final del proyecto es contar con la aplicación web terminada con las capacidades para que los alumnos hagan evaluaciones sobre un curso y los profesores puedan visualizar sus calificaciones de manera apropiada así como las predicciones que los pueden ayudar a mejorar sus métodos de enseñanza.

# Diagrama de Arquitectura

![Diagrama](Architecture.jpg)

# Prerrequisitos
- `Docker`

# Quickstart
Guia para correr el programa de manera rápida

1. Clonar repositorio 
```bash 
git clone https://github.com/emilianoabascal/AprendizajeAutomaticoPrimeraEvaluacion
``` 
2. Ir hacia la carpeta
```bash 
cd AprendizajeAutomaticoPrimeraEvaluacion
``` 
3. Ejecutar docker

4. Si se agregó un nuevo modulo de python a ´requirements.txt´:
```bash 
docker-compose build
``` 

5. Run docker 
```bash 
docker-compose up 
``` 

6. Frontend: http://localhost:80 Backend: http://localhost:5000

7. Da click en el boton de train para entrenar el modelo con el dataset

8. Ingresa los valores a predecir 


# Uso
Esta es una explicación más detallada de los archivos y funciones principales que se usan.

## Archivos Python (Flask)
### App.py: 
Este archivo es la API que se encarga de manejar las solicitudes que vienen del Front End.

Función `home()`:  Se utiliza para que la API envíe el archivo index.html.

Función `predict()`: Se utiliza para predecir los valores, la función se llama cuando se hace una solicitud HTTP que recive un JSON con la infomración introducida en el Front End, realiza las predicciones necesarias y regresa un resultado al cliente en un JSON.

Función `trainModel()`: Se utiliza para volver a entrenar el modelo, la función se llama cuando se hace una solicitud HTTP que recive un JSON con la infomración introducida en el Front End, realiza el entrenamiento y regresa una respuesta booleana para avisar al cliente si el entrenamiento fue exitoso o no.

### Train.py: Este archivo se encarga de realizar el entrenamiento del modelo.

función `Train()`: Importamos nuestro dataset, este conjunto de datos contiene 28 preguntas que dividimos en 3 secciones, cada sección se conoce como un año escolar este se divide en el conjunto de datos de entrenamiento y Prueba

Se ajusta el modelo de regresión lineal múltiple a nuestro conjunto de entrenamiento. Utilizamos el método de ajuste junto con los argumentos del método de ajuste, los cuales serán conjuntos de entrenamiento y luego creamos un modelo de archivo que contiene el modelo de entrenamiento.

## Archivos Front End (Angular):
### Frontend/

## Archivos Docker:
### Dockerfile-nginx: 
Dockerfile para el contenedor de NGINX.
### Dockerfile-flask: 
Dockerfile para el contenedor de FLASK.
### Dockerfile-angular: 
Dockerfile para el contenedor de Angular.
### app.conf: 
Archivo de configuración para el contenedor de NGINX, usado en Dockerfile-nginx.
### app.ini: 
Archivo de configuración para el contenedor de FLASK, usado en Dockerfile-flask.
### requirements.txt: 
Archivo que se utiliza para cargar las dependencias del contenedor de flask, por ejemplo ´numpy´.
### docker-compose.yml: 
Archivo Docker-Compose para levantar todos los contenedores necesarios (Flask, NGINX).

# Arquitectura

# Versión Final
## La versión final consistirá en lo siguiente:
- Login alumnos, para poder hacer las evaluaciones de sus clases.
- Login de profesores para poder acceder al dashboard de profesores
- Dashboard de profesores para ver las evaluaciones realizadas por los alumnos, asi como una predicción sobre cual es su futura calificación dependiendo de su actual evaluación.
- Capacidad de que los profesores puedan ver sus evaluaciones y palabras clave de cada una para poder recibir retroalimentación más efectiva.
