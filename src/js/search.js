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
   $('#welcome').remove();

   // Uncomment/comment to display results made without using Fnugg widget
   displayInfo();

   // Uncomment/comment to displays result using Fnugg Widget
   // displayWidget();
});

// Prevents user from submitting form when hitting enter key
$('#search').keydown(function(event){
  if(event.keyCode == 13) {
    event.preventDefault();
    return false;
  }
});
