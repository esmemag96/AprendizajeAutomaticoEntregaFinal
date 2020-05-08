//Initiate jQuery on load.
$(function() {
  //Translate text with flask route
  $("#translate").on("click", function(e) {
    e.preventDefault();
    var translateVal = document.getElementById("text-to-translate").value;
    var languageVal = document.getElementById("select-language").value;
    var translateRequest = { 'text': translateVal, 'to': languageVal }

    if (translateVal !== "") {
      $.ajax({
        url: '/translate-text',
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        dataType: 'json',
        data: JSON.stringify(translateRequest),
        success: function(data) {
          for (var i = 0; i < data.length; i++) {
            document.getElementById("translation-result").textContent = data[i].translations[0].text;
            document.getElementById("detected-language-result").textContent = data[i].detectedLanguage.language;
            if (document.getElementById("detected-language-result").textContent !== ""){
              document.getElementById("detected-language").style.display = "block";
            }
            document.getElementById("confidence").textContent = data[i].detectedLanguage.score;
          }
        }
      });
    };
  });
  //Run sentinment analysis on input and translation.
$("#sentiment-analysis").on("click", function(e) {
  e.preventDefault();
  var inputText = document.getElementById("text-to-translate").value;

  var sentimentRequest = { "inputText": inputText};

  if (inputText !== "") {
    $.ajax({
      url: "/sentiment-analysis",
      method: "POST",
      headers: {
          "Content-Type":"application/json"
      },
      dataType: "json",
      data: JSON.stringify(sentimentRequest),
      success: function(data) {
        console.log(data[0])
        console.log(data[1])
        for (var i = 0; i < data[0].documents.length; i++) 
        {
          if (typeof data[0].documents[i] !== "undefined"){
            if (data[0].documents[i].id === "1") {
              document.getElementById("input-sentiment").textContent = data[0].documents[i].score;
            }
          }
        }
        for (var i = 0; i < data[1].documents.length; i++) 
        {
          if (typeof data[1].documents[i] !== "undefined"){
            if (data[1].documents[i].id === "1") {
              document.getElementById("translation-sentiment").textContent = data[1].documents[i].keyPhrases;
            }
          }
        }
        if (document.getElementById("input-sentiment").textContent !== '' && document.getElementById("translation-sentiment").textContent !== ""){
          document.getElementById("sentiment").style.display = "block";
        }
      }
    });
  }
});
// In the next section, you'll add code for speech synthesis here.
})