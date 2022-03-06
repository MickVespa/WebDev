//initate src storage
let src_values = [];

// get all the src values
let scriptz = document.scripts;
for (let i = 0; i < scriptz.length; i++) {
    if (scriptz[i].src.substring(0,5) === "https") { 
        src_values.push(scriptz[i].src);
        //if (src_values[i] !== null) {
          //  console.log(src_values[i]);
        //}     
    }
}

// create string that will contain the HTML for the links
let string = '<ul style = "padding:0px;">\n';
for (let i = 0; i < src_values.length; i++) {
    string += '<li>' + src_values[i] + '</li>';
}
string += '</ul>';

// create a div to hold the elements
let div = document.createElement('div');
div.classList.add('question2');

// set the links string to the innerHTML
div.innerHTML = string;

// append the div to the body so that it is displayed on the page
document.body.append(div)

