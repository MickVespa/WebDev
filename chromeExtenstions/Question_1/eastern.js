if (!document.URL.includes('easternct.edu')) {
    alert("To use this function, go to one of Eastern's pages");
} else {

    // change the color of the menu bar
    let menuBar = document.getElementsByClassName('main-menu-bg')[0]; // menu bar at top of the screen
    menuBar.style.backgroundColor = "#ffc87c";

    // hide the picture under the menu bar
    let picturess = document.getElementsByClassName('impact home sliders')[0];
    picturess.style.visibility = "hidden";  

    // add links for commonly used web pages
    let links = [{text: 'email', link: 'https://www.office.com/?auth=2&home=1'},
                 {text: 'blackboard', link: 'https://easternct.blackboard.com/'},
                 {text: 'gdancik.github', link: 'http://gdancik.github.io'},
                 {text: 'Google', link: 'https://google.com'}];
   
    // create string that will contain the HTML for the links
    let string = '<ul style = "padding:0px;">\n';
    for (let li of links) {
        string += '<li><a href = "' + li.link + '">' + li.text + '</a></li>';
    }
    string += '</ul>';

    // create a div to hold the elements
    let div = document.createElement('div');
    div.className = 'headerCTA header-column';
    div.classList.add('question1-4');

    // set the links string to the innerHTML
    div.innerHTML = string;

    // append the div to the body so that it is displayed on the page
    document.body.append(div)
}
