//Draw a line

/**
context.moveTo(startX, startY);
context.lineTo(endX, endY);
context.stroke();
*/

function clear() {
	document.querySelectorAll('canvas').forEach(function(a){
		a.remove()
	})
}
async function run() {
	var canvas = document.createElement('canvas');
	canvas.width = window.innerWidth;
	console.log(canvas.width);
	canvas.height = window.innerHeight;
	console.log(canvas.height);

	var body = document.getElementsByTagName("body")[0];
	body.appendChild(canvas);
	var context = canvas.getContext('2d');

	context.rect(0, 0, canvas.width, canvas.height);
	context.fillStyle = 'blue';
	context.fill();
	var stop1 = Math.random();
	var stop2 = Math.random();
	while(true){
		await sleep(10);
	      // add linear gradient
      	var grd = context.createLinearGradient(0, 0,  context.canvas.width,0);
      	// light blue
      	if(Math.random() < .5) {
      		if(Math.random() < .5) {
      			stop1 = stop1 + .02*Math.random();
      			stop2 = stop2 + .02* Math.random();
      		}
      		else {
      			stop1 = stop1 - .02*Math.random();
      			stop2 = stop2 - .02* Math.random();
      		}
      	}
      	else{
      		if(Math.random() < .5) {
      			stop1 = stop1 + .02*Math.random();
      			stop2 = stop2 - .02* Math.random();
      		}
      		else {
      			stop1 = stop1 - .02*Math.random();
      			stop2 = stop2 + .02* Math.random();
      		}
      	}
      	if ( stop1 >stop2){
      		var garb = stop1;
      		stop1 = stop2;
      		stop2 = garb;
      	}
      	if (stop1 > 1) {
      		stop1 = 1;
      	}
      	if (stop2 > 1) {
      		stop2 = 1;
      	}
      	if (stop1 < 0) {
      		stop1 = 0;
      	}
      	if (stop2 < 0) {
      		stop2 = 0;
      	}
      	grd.addColorStop(stop1, 'black');   
      	// dark blue
      	context.globalAlphas = '.5'
      	grd.addColorStop(stop2, 'white');
      	context.fillStyle = grd;
      	context.fill();
	}
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}