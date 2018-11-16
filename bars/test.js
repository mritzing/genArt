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
	canvas.height = window.innerHeight;
      console.log(canvas.width);
      var body = document.getElementsByTagName("body")[0];
      body.appendChild(canvas);

      context = canvas.getContext('2d');
	context.rect(0, 0, canvas.width, canvas.height);

	context.fillStyle = 'white';
	context.fill();
      var step = 100;
      var size = context.canvas.width;    
      var j = context.canvas.height/2;
      var variance = 1;
      for (var gen = 0; gen < 1000; gen++){
            var line =[];
            for (var i = step; i <= size - step; i+=step){
                  var rand = Math.random() * variance * 2 - 1*variance;
                  var point = {x: i,y: j + rand};
                  line.push(point);
            }
            for (var i = 0; i < line.length - 1; i++){
                  context.beginPath();
                  context.moveTo(line[i].x, line[i].y);s
                  var xc = (line[i].x + line[i+1].x) /2 ;
                  var yc = (line[i].y + line[i+1].y) /2 ;
                  
                 // console.log(line[i].x, line[i].y);
                  context.quadraticCurveTo(line[i+1].x, line[i+1].y,xc,yc);
                  context.stroke();
            }
            variance +=1;
            fillTransparent(context, .0001);
      await sleep(10);
      }

}

function fillTransparent(context, val) {
      context.rect(0, 0, context.canvas.width, context.canvas.height);
      context.fillStyle = 'rgba(255, 255, 255,' + val + ')';
      context.fill();
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}