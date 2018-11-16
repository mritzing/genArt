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
  var body = document.getElementsByTagName("body")[0];
  body.appendChild(canvas);

  context = canvas.getContext('2d');
	context.rect(0, 0, canvas.width, canvas.height);
	context.fillStyle = 'white';
	context.fill();
  var treeW = 300;
  var center = context.canvas.width/2;

  var tree = [];
  var divisions = 5;
  var start = {lx: (center - treeW/2),rx: ( center+ treeW/2) , ly: canvas.height, ry:canvas.height };
  var end = {lx: (center - treeW/2),rx: ( center+ treeW/2) , ly: canvas.height - canvas.height/divisions, ry: canvas.height - canvas.height/divisions};
  console.log(end);
  branch(context, start, end, canvas.height/divisions );
}

function branch(context, startPoint, endPoint , height) {
  //left line 
  if (startPoint.ly > 0){
    context.beginPath();
    context.moveTo(startPoint.lx, startPoint.ly);
    context.lineTo(endPoint.lx , endPoint.ly);
    context.stroke();
    //right line
    context.beginPath();
    context.moveTo(startPoint.rx, startPoint.ry);
    context.lineTo(endPoint.rx, endPoint.ry);
    context.stroke();
    console.log(startPoint.ly, endPoint.ly);
    var startPL = {lx: (endPoint.lx), rx: (endPoint.rx + endPoint.lx) /2  , ly: endPoint.ly, ry:endPoint.ly};
    var endPL = {lx: (endPoint.lx - (endPoint.rx - endPoint.lx) /2) ,rx: endPoint.lx  , ly:   endPoint.ly - height, ry:endPoint.ly - height };
    console.log("LEFT" , endPL);
    branch(context, startPL , endPL, height);
    var startPR = {lx: (endPoint.rx + endPoint.lx) /2,rx: (endPoint.rx) , ly: endPoint.ly, ry:endPoint.ly};
    var endPR = {lx:endPoint.rx  ,rx:  (endPoint.rx + (endPoint.rx - endPoint.lx) /2)  , ly: endPoint.ly - height, ry:endPoint.ly - height };
    branch(context, startPR , endPR, height);

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