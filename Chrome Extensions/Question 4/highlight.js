// This script highlights all occurences of 'qry'. The variable 'qry' should
// be set before calling this script

// original qry
var qry1 = qry

// escape characters which have special meanings in regular expressions
qry =  qry.replace(/([-()\[\]{}+?*.$\^,:#<!\\])/g, '\\$1').
      replace(/\x08/g, '\\x08');

console.log("highlighter is running with qry = " + qry + "...");

// get all HTML from the body
var text = document.body.innerHTML;

// Create a regular expression to find all occurences of the 
// query which is not inside of a tag. The first argument is the query in parentheses: 
//  (qry) - the parentheses creates a 'grouping' that allows us to reference the match
//      and to use the query with a negative lookahead to make sure the query does not appear within a tag.
//  ?! - this is a negative lookahead (we will not count matches with the subsequent pattern)
//  [^<] - the character is NOT a '<'   (
//  * - repeat the previous pattern 0 or more times
//  > - the pattern ends with a '>'

// This basically says that if we see a closing tag ('>') before an opening tag ('<'), 
// then we do not want to count this as a match (because the match would occur inside of a tag, e.g.
// <p id = 'qry'>
// 

// We can analyze this using: https://regex101.com/
//      Ex: (hello)(?![^<]*>)

// The second argument specifies:
//      g - finds all occurences
//      i - case insensitive

var findWord = RegExp("("+qry+")" + '(?![^<]*>)', "gi"); 

m = text.match(findWord);

if (m != null) {

    console.log("Search for " + qry + " finds " + m.length + " matches");

    // add <span> tags and background-color for each match (stored in $1)
    text = text.replace(findWord, "<span style ='background-color:yellow'>$1</span>");

    // reset the inner HTML of the body
    document.body.innerHTML = text;

}


