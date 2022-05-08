//retrieves the text from a double click

//TODO
// Add word on top of Definition/Synonyms
// ADD Noun/Verb/Adjectvie
// ADD "more" link reaveling more definitions
// ADD "Websearch" link to google with (word + deffinition)
function findWord() {
  word = window.getSelection().toString();
  return word;
}
document.body.addEventListener("dblclick", findWord);

// display the text from a double click
function display() {
  var foundword = findWord();
  console.log(foundword);
  console.log(foundword.length);
}
document.body.addEventListener("dblclick", display);

var msg = "";
var thes = "";
var type = "";

function getAPI() {
  const data = null;
  var xhttp = new XMLHttpRequest();
  xhttp.withCredentials = true;
  var searchWord = findWord();
  var link = "https://wordsapiv1.p.rapidapi.com/words/" + searchWord;

  // since Javascript is asynchronous, we respond to a state change event for the request by
  // defining a function and assigning it to 'xhttp.onreadystatechange'.
  xhttp.onreadystatechange = function () {
    // if request is unsuccessful
    if (this.readyState == 0 || this.status == 404 || this.status == 400) {
      console.log(
        word +
          " is not a valid word in this database, please try a different word."
      );
      msg[0] =
        "not a valid word in this database, please try a different word.";
      type[0] = " ";
      thes[0] = " ";
    }
    // if request is successful
    if (this.readyState == 4 && this.status == 200) {
      recordStr = this.responseText; // JSON format

      record = JSON.parse(recordStr);
      msg = [];
      for (var i = 0; i < record.results.length; i++) {
        if (record.results[i].definition === "undefined") {
          msg[i] = "";
        } else {
          msg[i] = record.results[i].definition;
        }
      }
      //console.log(msg);

      type = [];
      for (var i = 0; i < record.results.length; i++) {
        if (record.results[i].partOfSpeech === "undefined") {
          type[i] = "";
        } else {
          type[i] = record.results[i].partOfSpeech;
        }
      }

      thes = [];
      sim_words = [];

      for (var j = 0; j < record.results.length; j++) {
        if (record.results[j].synonyms === undefined) {
          thes[j] = "";
        } else {
          for (var x = 0; x < record.results[j].synonyms.length; x++) {
            sim_words.push(record.results[j].synonyms[x] + " ");
          }
          thes[j] = sim_words;
          sim_words = []
        }
      }
      console.log(thes[0]);
    }
  };

  // submit a 'get' request to the wordsAPI; 'false' is used to make the request synchronously
  xhttp.open("GET", link, false);
  xhttp.setRequestHeader("X-RapidAPI-Host", "wordsapiv1.p.rapidapi.com");
  xhttp.setRequestHeader(
    "X-RapidAPI-Key",
    "8dc8c1b89bmshb35f0c5a6ad2260p19de8cjsnad3259bac4af"
  );
  xhttp.send(data);
}
document.body.addEventListener("dblclick", getAPI);

//get mouse click coordinates
function mouseDiv(e) {
  if (findWord().length > 1) {
    let x = e.pageX;
    let y = e.pageY;
    addDiv(x, y);
  }
}
document.body.addEventListener("dblclick", mouseDiv);

//Add a div to the document and return its handle
function addDiv(x, y) {
  total_defs = msg.length
  var e = document.createElement("div");
  e.id = "mickVespaFinal";
  $(e).addClass("circle");
  
  e.innerHTML =
    `<span style="display: block;font-size: 20px;font-weight: bold; text-align: center">` +
    word +
    `</span> <br>`;
  
  var THTML = "<table class='demo'><thead><tr><th>Definition </th><th> Type </th><th> Synonyms </th> </tr> </thead><tbody>";
  for(j=0; j <= msg.length-1; j++)
  {
      THTML += "<tr><td>"+ msg[j] + "</td><td>" + type[j] + "</td><td>" + thes[j] + "</td></tr>";
  }
  THTML += "</tr></tbody></table>";
  e.innerHTML += THTML + "<br>";


  let btn = document.createElement("button");
  btn.innerHTML = "More";
  btn.onclick = function () {
    window.open("https://www.google.com/search?q=" + word + "+definition");
  };

  let btn2 = document.createElement("button");
  btn2.innerHTML = "Next";
  btn2.id = "btn2ID"
  e.appendChild(btn);

  //move above word
  let adjY = y + 50;
  let adjX = x;

  $(e).css("left", adjX);
  $(e).css("top", adjY);
  document.body.appendChild(e);

  $(document).on("click", function (e) {
    var container = $("#mickVespaFinal");

    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      container.remove();
    }
  });
  return e;
}
