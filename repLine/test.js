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
      var lines = [];
      var variance = 200;
      for (var gen = 0; gen < 3000; gen++){
            var line =[];
            for (var i = step; i <= size - step; i+=step){
                  var rand = Math.random() * variance * 2 - 1*variance;
                  var point = {x: i,y: j + rand};
                  line.push(point);
            }
            lines.push(line)
            variance +=1;
      }
      while(true){
      for (m = 1000 ; m < lines.length-1; m++){
            for (var i = 0; i < lines[m].length - 1; i++){
                  context.beginPath();
                  context.moveTo(lines[m][i].x, lines[m][i].y);
                 // context.lineTo(lines[m][i+1].x, lines[m][i+1].y)      
                  var xc = (lines[m][i].x + lines[m+1][i].x) /2 ;
                  var yc = (lines[m][i].y + lines[m+1][i].y) /2 ;
                 // console.log(line[i].x, line[i].y);
                  context.quadraticCurveTo(lines[m][i+1].x, lines[m][i+1].y,xc,yc);
                 // console.log(lines[m][i+1].x, lines[m][i+1].y,xc,yc);
                  context.stroke();
            }
            fillTransparent(context, .01);
      await sleep(1);

      }
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