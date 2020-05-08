function requestPrediction() {//Function to request prediction from server.
    //Input elements on the HTML(DOM)
    var grade1 = parseInt(document.getElementById("1stGrade").value)
    var grade2 = parseInt(document.getElementById("2ndGrade").value)
    var id = parseInt(document.getElementById("TeacherID").value)
    // Type check
    if (grade1 < 1 || grade1 > 100 || grade2 < 1 || grade2 > 100 || id > 3 || id < 1 || isNaN(id) || isNaN(grade1) || isNaN(grade2)) {//Type check before sending it to the api
        alert("The grades must be between 1 and 100 and the ID must be between 1 and 3 (Only three professors)");
    } else {//If all the inputs are correct, then the grades are formated to be compatible with the model's input.
        grade1 = grade1 * .45
        grade2 = grade2 * .45
        var data = JSON.stringify({ 'TeacherID': id, "1stGrade": grade1, "2ndGrade": grade2 })//JSON object to be sent to the api.
        var xhttp = new XMLHttpRequest();//New HMLHTTP request (Like ajax)
        xhttp.onreadystatechange = function () {//Clousure that is called when the response from the api is receved.
            result = document.getElementById("prediction")//DOM element in the HTML to display the result.
            if (this.readyState == 4 && this.status == 200) {//If the state of the response is correct, then:
                var json = JSON.parse(xhttp.responseText);//Parsed JSON.
                result.textContent = "The grade of the professor next year should be: " + (json.prediction / .45);//Result added to the HTML
            }else{
                result.textContent = "Something Went wrong, please try again";//Result added to the HTML
            }
        };
        xhttp.open("POST", "http://localhost:5000/predict", true);//Open connection to the server, at route /predict.
        xhttp.setRequestHeader("Content-type", "application/json");//Set the content type as JSON.
        xhttp.send(data);//Send data.
    }
}

function trainModelRequest() {//Function to request the server a new trained model.
    var data = JSON.stringify({ 'train': true })//JSON object to be sent to the api.
    var xhttp = new XMLHttpRequest();//New HMLHTTP request (Like ajax)
    result = ""
    xhttp.onreadystatechange = function () {//Clousure that is called when the response from the api is receved.
        if (this.readyState == 4 && this.status == 200) {//If the state of the response is correct, then:
            var json = JSON.parse(xhttp.responseText);//Parsed JSON.
            if (json.multilineal) {//if the training is successfull, then display a success message.
                result += "Multilineal training was made succesfully"
            } else {//Else, display error message
                result += "Multilineal training failed"
            }
            if (json.threeD){
                result += "\n3d training was made succesfully"
            } else {
                result += "\n3d training failed"
            }
            if (json.tree){
                result += "\nDesicion training was made succesfully"
            } else {
                result += "\nDesicion training failed"
            }
            alert(result)
        }
        
    };
    
    xhttp.open("POST", "http://localhost:5000/train", true);//Open connection to the server, at route /train.
    xhttp.setRequestHeader("Content-type", "application/json");//Set the content type as JSON.
    xhttp.send(data);//Send data.
}

function getGraphs() {//Function to request the server a new trained model.
    var data = JSON.stringify({ 'getGraphs': true, })//JSON object to be sent to the api.
    var xhttp = new XMLHttpRequest();//New HMLHTTP request (Like ajax)
    var imageTag = document.getElementById("imagePng");
    result = ""
    xhttp.onreadystatechange = function () {//Clousure that is called when the response from the api is receved.
        if (this.readyState == 4 && this.status == 200) {//If the state of the response is correct, then:
            var json = JSON.parse(xhttp.responseText);//Parsed JSON.
            if (json.ImageBytes){
                imageTag.src = "data:image/png;base64," + json.ImageBytes;
            }
        }
    };
    xhttp.open("POST", "http://localhost:5000/getGraphs", true);//Open connection to the server, at route /train.
    xhttp.setRequestHeader("Content-type", "application/json");//Set the content type as JSON.
    xhttp.send(data);//Send data.
}

window.onload = function() {
    getGraphs();
};

