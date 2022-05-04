//retrieves the text from a double click
function findWord(){
    word = window.getSelection().toString();
    return word;
 }
 document.body.addEventListener('dblclick',findWord);

 
 // display the text from a double click
 function display(){
    var foundword = findWord() ;
    console.log(foundword);
    console.log(foundword.length)
 }
 document.body.addEventListener('dblclick',display);

 var msg = "";
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
            console.log(word + " is not a valid word, please try a different word.");
            msg = word + " is not a valid word, please try a different word.";
        }
        // if request is successful
        if (this.readyState == 4 && this.status == 200) {
            recordStr = this.responseText; // JSON format
            
            record = JSON.parse(recordStr);
            msg = ""
            for (var i = 0; i < record.definitions.length; i++) {
                msg += (i+1) + " " + record.definitions[i].definition;
                msg += "\n"
            }
            console.log(msg);
        }
    }
    // submit a 'get' request to the wordsAPI; 'false' is used to make the request synchronously
    xhttp.open("GET", link, false);
    xhttp.setRequestHeader("X-RapidAPI-Host", "wordsapiv1.p.rapidapi.com");
    xhttp.setRequestHeader("X-RapidAPI-Key", "8dc8c1b89bmshb35f0c5a6ad2260p19de8cjsnad3259bac4af");
    xhttp.send(data);
     
}  
document.body.addEventListener('dblclick',getAPI);

//get mouse click coordinates
function mouseDiv(e){
    if(findWord().length > 1){
        let x = e.pageX;
        let y = e.pageY;
        addDiv(x,y);
    }
}
document.body.addEventListener('dblclick',mouseDiv)


 //Add a div to the document and return its handle
function addDiv(x,y) {
    var e = document.createElement('div');
    e.id = "mickVespaFinal";
    $(e).addClass("circle");
    e.innerHTML = msg;
    

     //move above word
    let adjY = y + 50; 
    let adjX = x

    $(e).css("left",adjX);
    $(e).css("top",adjY);
    document.body.appendChild(e);

     $(e).show( "fast").delay(4000).fadeOut('fast', function() {
          $(this).remove();
     });    
     return e;
}

