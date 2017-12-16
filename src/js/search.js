/**
*
*   SEARCH.JS
*
*   This script handles the event when user clicks sumbit button.
*
**/

$('form').submit(function(e) {

  // Prevent default submit event
   e.preventDefault();

   // Removes class welcome
   $('.welcome').remove();

   // Display results made from scratch
   displayInfo();

   // Displays result using Fnugg Widget
   // displayWidget();
});
