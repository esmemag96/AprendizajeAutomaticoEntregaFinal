function sendRequest() {
    var grade1 = parseInt(document.getElementById("1stGrade").value)
    var grade2 = parseInt(document.getElementById("2ndGrade").value)
    var id = parseInt(document.getElementById("TeacherID").value)
    // Type check
    if (grade1 < 1 || grade1 > 100 || grade2 < 1 || grade2 > 100 || id > 3 || id < 1) {
        alert("La calificacion tiene que estar entre 1 y 100 y el ID tiene que ser un numero del 1 al 3 (Solo hay 3 profesores)");
    } else {
        grade1 = grade1 * .45
        grade2 = grade2 * .45
        var data = JSON.stringify({ 'TeacherID': id, "1stGrade": grade1, "2ndGrade": grade2 })
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                result = document.getElementById("prediction")
                var json = JSON.parse(xhttp.responseText);
                console.log(json.prediction)
                result.textContent = "The grade of the professor next year should be: " + (json.prediction / .45);
            }
        };
        xhttp.open("POST", "http://localhost:5000/predict", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(data);
    }
}

function trainModelRequest() {
    var data = JSON.stringify({ 'train': true })
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            result = document.getElementById("training")
            var json = JSON.parse(xhttp.responseText);
            console.log(json.trainingComplete)
            if (json.trainingComplete) {
                result.textContent = "The training was made succesfully";
            } else {
                result.textContent = "The training failed";
            }
        }
    };
    xhttp.open("POST", "http://localhost:5000/train", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(data);
}