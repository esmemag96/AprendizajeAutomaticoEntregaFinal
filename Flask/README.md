# Flask API
Ruta Desarrollo: http://127.0.0.1:5000/

**Train** 🌟
----
Quien sabe que entrena, solo dice entrenar.

* ### **URL**
    `/train`

* ### **Method**
    `GET`

* ### **URL Params**
    **Required:** <br>
    `creo que ninguno porque vale vergs`

    **Optional:** <br>
    `creo que ninguno porque vale vergs`

* ### **Data Params**
    <If making a post request, what should the body payload look like? URL Params rules apply here too.>

    `None *pero también creo*`

* ### **Success Response**
    `no se, hay error`

* ### **Success Response**
    `creo que no regresa ni verga, no tiene control de error`

* ### **Sample Call**
    `este quien sabe`

**Predict** 🌟
----
Quien sabe que predice.

* ### **URL**
    `/predict`

* ### **Method**
    `GET`

* ### **URL Params**
    **Required:** <br>
    
        TeacherID: <TeacherID>  
        ClassID: <ClassID>
        grade1: <0...100>
        grade2: <0...100>

    **Optional:** <br>
    `creo que ninguno porque vale vergs`

* ### **Data Params**
    <If making a post request, what should the body payload look like? URL Params rules apply here too.>

    `None *pero también creo`

* ### **Success Response**
    ```json
    {
        "predictionResult": 95.6888888888889 || None, "status": "Success || Failure",
        "comment": <comment>
    }
    ```

* ### **Success Response**
    `creo que no regresa ni verga, no tiene control de error`

* ### **Sample Call**
    `este quien sabe`

**Sentiment analysis** 🌟
----
Análisis de sentimiento de un texto, quien sabe que sea el valor que regresa.

* ### **URL**
    `/sentiment-analysis`

* ### **Method**
    `GET`

* ### **URL Params**
    **Required:** <br>
    `creo que ninguno porque vale vergs`

    **Optional:** <br>
    `creo que ninguno porque vale vergs`

* ### **Data Params**
    <If making a post request, what should the body payload look like? URL Params rules apply here too.>

    `None *pero también creo*`

* ### **Success Response**
    `no se, hay error`

* ### **Success Response**
    `creo que no regresa ni verga, no tiene control de error`

* ### **Sample Call**
    `este quien sabe`

**Get Graphs** 🌟
----
No se que regresa ni como pedir ni por que método, imposible saber.

* ### **URL**
    `/getGraphs`

* ### **Method**
    `GET`

* ### **URL Params**
    **Required:** <br>
    
        TeacherID: <TeacherID>  
        ClassID: <ClassID>

    **Optional:** <br>
    `creo que ninguno porque vale vergs`

* ### **Data Params**
    <If making a post request, what should the body payload look like? URL Params rules apply here too.>

    `None *pero también creo*`

* ### **Success Response**
    ```json
    {
        "3DGraph": <base64 image bytes>, 
        "status": <"Success || Fail">, 
        "graphData": {
            "ecoa1": [<int Array>],
            "mean1": <mean>,
            "ecoa2": [<int Array>],
            "mean2": <mean> 
        }, 
        "comment": <comment>
    }
    ```

* ### **Success Response**
    `creo que no regresa ni verga, no tiene control de error`

* ### **Sample Call**
    `este quien sabe`