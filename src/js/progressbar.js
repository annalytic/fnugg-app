/**
*   PROGRESSBAR.JS
*
*   Creates circular progress bar using HTML5 canvas element for
*   displaying percentage of slopes and lifts that are open at a specific skiresort.
**/

function createCanvas(percentage) {
  var canvas = document.createElement('canvas');
  canvas.setAttribute('height','80');
  canvas.setAttribute('width','80');
  var context = canvas.getContext('2d');
  var centerX = canvas.width / 2;
  var centerY = canvas.height / 2;
  var radius = 25;
  context.beginPath();
  context.arc(centerX, centerY, radius, 1.5*Math.PI, (1.5+percentage*2)*(Math.PI), false);
  context.fillStyle = 'transparent';
  context.fill();
  context.lineWidth = 4;
  context.strokeStyle = '#07A1C4';
  context.stroke();
  return canvas;
}


function progressBar(a, b) {
  var list = document.getElementsByClassName('resort-lifts-slopes__no');

  var canA = createCanvas(a);
  list[0].appendChild(canA);

  var canB = createCanvas(b);
  list[1].appendChild(canB);
}
