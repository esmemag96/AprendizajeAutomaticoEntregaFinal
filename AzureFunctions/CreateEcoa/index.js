const { TextAnalyticsClient, AzureKeyCredential } = require("@azure/ai-text-analytics");//requeriento para correr la base de datos con mongoose
const Ecoa = require('../models/EcoaModel.js');//requerimiento para hacer uso de la schema de la ecoa

module.exports = async function (context, req) {
    //recuperamos los datos del request 
    const key = '31dfe30a273742bba0bb7c0af0609320';//key para poder hacer la peticion 
    const endpoint = 'https://profesores.cognitiveservices.azure.com/';//endpoint para poder hacer la peticion 
    const textAnalyticsClient = new TextAnalyticsClient(endpoint,  new AzureKeyCredential(key));
    //recuperamos los datos del request 
    let docs1 = {
        idStudent: req.body.idStudent,
        idProfessor: req.body.idProfessor,
        idClass: req.body.idClass,
        questions : [],
        totalScore:0
    }
    //funciones para obtener el analisis de texto de las ecoas realizadas para poder obtener el setiment y keyphrases 
    const sentimentResult = await textAnalyticsClient.analyzeSentiment(req.body.questions);
    const keyPhraseResult = await textAnalyticsClient.extractKeyPhrases(req.body.questions);
    var positive = 0
    var neutral = 0
    var negative = 0
    //creamos un loop para poder hacer agregar los valores del analisis de texto en un json de respuesta 
    if (sentimentResult && keyPhraseResult){
    sentimentResult.forEach((document, index) => {
            const num2 = keyPhraseResult[index].keyPhrases;
            let doc = {
                    id: document.id,
                    sentiment:document.sentiment,
                    confidenceScores : document.confidenceScores, 
                    keyPhrases:num2 ,
                    answers:req.body.questions[index]
            }
            //obtenemos la suma de los scores realizado por el anlisis de texto 
            positive= positive + document.confidenceScores.positive
            neutral= neutral + document.confidenceScores.neutral
            negative= negative + document.confidenceScores.negative
            docs1.questions.push(doc)
          });
          //obtenemos el promedio de las sumas 
          let sumas = {
            positive: (positive*100)/5,
            neutral:(neutral*100)/5,
            negative : (negative*100)/5, 
    }
        docs1.totalScore = sumas 
        //nos conectamos a la base
        const conect = await connectToDatabase()        
        try { 
            const savecoa = await Ecoa.addEcoa(new Ecoa(docs1))
            context.res = {//si el user  existe regresa todo info del user regresamos un 200
                status: 200,
                body: "savecoa"
            };
            
            context.done();
                  } 
        catch (error) {
            context.res = {//si el user no se guardo regresa un error regresamos un 400 
                status: 400,
                body: error
            };
            
            context.done();
            }
              
 
    }

};