//retrieves the text from a double click
function findWord(){
    word = window.getSelection().toString();
    return word;
 }
 document.body.addEventListener('dblclick',findWord);

 
 // display the text from a double click
 function display(){
    var word = findWord() ;
    console.log(word);
 }
 document.body.addEventListener('dblclick',display);

 function getAPI(){
     const data = null;
     var xhttp = new XMLHttpRequest();
     xhttp.withCredentials = true;
     var searchWord = findWord();
     var link = "https://wordsapiv1.p.rapidapi.com/words/" + searchWord + "/definitions";
     
     // since Javascript is asynchronous, we respond to a state change event for the request by
    // defining a function and assigning it to 'xhttp.onreadystatechange'.
    xhttp.onreadystatechange = function () {
        // if request is unsuccessful
        if (this.readyState == 0 || this.status == 404) {
            console.log(word + " is not a valid word, please try again.");
        }

        // if request is successful
        if (this.readyState == 4 && this.status == 200) {
            recordStr = this.responseText; // JSON format
            
            record = JSON.parse(recordStr);
            msg = ""
            for (var i = 0; i < record.definitions.length; i++) {
                msg += record.definitions[i].definition;
                msg += "            "
            }
            console.log(msg);

        }
    }
    // submit a 'get' request to the pokeapi; 'true' is used to make the request asynchronously
    xhttp.open("GET", link, true);
    xhttp.setRequestHeader("X-RapidAPI-Host", "wordsapiv1.p.rapidapi.com");
    xhttp.setRequestHeader("X-RapidAPI-Key", "8dc8c1b89bmshb35f0c5a6ad2260p19de8cjsnad3259bac4af");
    xhttp.send(data);
 }  
 document.body.addEventListener('dblclick',getAPI);
 
