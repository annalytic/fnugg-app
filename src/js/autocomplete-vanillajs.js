/**
*
*   AUTOCOMPLETE-VANILLAJS.JS
*
*   Creating own autocomplete using HTML5 datalist element and vanilla js.
*
**/

// Get input element, and add a eventlistener for keyup.
// When the event keyup fires run function "a"utocomplete".

// Create datalist element and append it to form.
var options = document.createElement('datalist');
options.setAttribute("id", "options");
document.querySelector('form').appendChild(options);

// Get input element
var search = document.getElementById('search');

search.addEventListener("keyup", function(event){
  autocomplete(event);
});

// Create XMLHttpRequest object
var xhr = new XMLHttpRequest();

// Function for autocompletion
function autocomplete(event) {

  // Get the input element where the event fired
  var input = event.target;

  // Minimum number of characters before we start to generate suggestions
  var minChars = 2;

  if (input.value.length < minChars ) {
      return;
  } else {

    xhr.onreadystatechange = function() {

    if (this.readyState == 4 && this.status == 200) {

      // We covert the JSON response to an object
      var response = JSON.parse( this.responseText );

      // Remove any previously loaded options in the datalist
      options.innerHTML = "";

      // Add each suggestion to datalist
      response.result.forEach(function(item) {

          // Create a new <option> element.
          var option = document.createElement('option');
          option.value = item.name;

          // Attach the option to the datalist element
          options.appendChild(option);
      });
    }
  };

  // Open request
  xhr.open("GET", "https://api.fnugg.no/suggest/autocomplete?q=" + search.value, true);

  // Send request to webserver
  xhr.send();

  }
}
