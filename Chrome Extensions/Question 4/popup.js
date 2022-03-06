function typed() {
    if (document.getElementById("searchString").value==="") {
        document.getElementById("btn2").disabled = true;
    } else {
        document.getElementById("btn2").disabled = false;
    }
}

//keep secondary input hidden until primary input is filled
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("searchString").addEventListener('keyup', function() {
        typed()
    });
});


document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("btn2").addEventListener("click", 
        function() {
            document.getElementById("text2").hidden = false;
            document.getElementById("searchString2").type = Text;
            document.getElementById("text3").hidden = false;
            document.getElementById("searchString3").type = Text;
        })
});

function hideText2() {
    if (document.getElementById("searchString2").value==="") {
        document.getElementById("searchString2").type="hidden";
        document.getElementById("text2").hidden=true;
    } 
}

function hideText3() {
    if (document.getElementById("searchString3").value==="") {
        document.getElementById("searchString3").type="hidden";
        document.getElementById("text3").hidden=true;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("searchString2").addEventListener('blur', function() {
        hideText2()
    })
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("searchString3").addEventListener('blur', function() {
        hideText3()
    })
});



// injects 'highlight.js' which highlights the specified 'term' on the page 
function highlight(term) {

    let codeString = "var qry = \"" + term + "\";";
    
    // executes scripts on the page
    // execute codeString statement then callback function 
    chrome.tabs.executeScript(null, {code: codeString},

        // call back function runs highlight.js script
        function() { 
            chrome.tabs.executeScript(null, {file: "highlight.js"});
            window.close();
        }
    );
    
}

// Chrome extensions do not allow inline Javascript in popups for security reasons.
// Innstead we add a listener for button click, in this case calling 'highlight()'
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("btnHighlight").addEventListener("click", 
        function() {
            let search = document.getElementById("searchString").value + "|" + document.getElementById("searchString2").value + "|" + document.getElementById("searchString3").value
            if (search == '') {
                return;
            }
            highlight(search);
        })
});
