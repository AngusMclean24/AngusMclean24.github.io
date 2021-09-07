var filteredlist; // Filtered list of elements
var chemlist; // Generated spelling of input

// Triggers when the try-button is pressed
// Gets input, makes a filtered list and outputs to page
function doTheThing() {
  var input = getInput();
  
  var sorry = "<br>Hi your message was: " + input + 
            "<br>"
  
  setOutput(sorry);
  
  return false;
}
// Retrieves the input from the input-field
function getInput() {
    // Get the input (also keep only letters and convert to lowercase)
    var input = document.getElementById('input').value.toLowerCase().replace(/[^a-zA-Z]/g, "");
    document.getElementById('input').value = input; // Update content of inputfield
    return input;
}

// Writes the output to the output-field on the page
function setOutput(output) {
    document.getElementsByTagName('output')[0].innerHTML = output;
//    applySizes();
}

// Debug
function p(line) {
    console.log(line);
}
