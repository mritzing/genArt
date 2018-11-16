

async function init (){
	var canvas = document.createElement('canvas');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	var body = document.getElementsByTagName("body")[0];
	body.appendChild(canvas);
	context = canvas.getContext('2d');
	context.rect(0, 0, canvas.width, canvas.height);
	context.fillStyle = 'rgba(20,28,58,1)';
	context.fill();
	var coords = tile(context, 100);

	x = canvas.width /2;
	y = canvas.height /2 ;
	canvas.addEventListener('mousemove', function(event) {
	    var rect = canvas.getBoundingClientRect();
	    x = event.clientX - rect.left;
	    y = event.clientY - rect.top;
	    console.log("x: " + x + " y: " + y); 
	}, false);
	//console.log(mouse);
	//console.log(coords);
	while (true){
		coords = displace(coords, x, y);
		fillTransparent(context, .35);	
		for (var i = 0 ; i < coords.length;i++){
			drawShapes(context, coords[i]);
		}
		await sleep(1);
	}
}


function tile(context, height, width = null){
	if (width == null){
		width = height
	}
	cList = [];
	var totH = context.canvas.height;
	var totW = context.canvas.width;
		for(var i = 0 ; i < totW;i+=width){
			for(var j = 0 ; j < totH; j +=height){
				cList.push(starBurst(context, i, j , height));
			}
		}
	return cList;
}

function displace(coords = [], x, y){
	
	for (var i = 0 ; i < coords.length;i++){
		for (var j = 0 ; j < coords[i].length;j++){
			if ( (x -coords[i][j].x)**2  + (y -coords[i][j].y)**2 < 200**2){
			coords[i][j].x +=  Math.random()*(x -coords[i][j].x )/20 ;
			coords[i][j].y += Math.random()*(y-coords[i][j].y )/20;
			}
		}
	}
	return coords;
}

function fillTransparent(context, val) {
      context.rect(0, 0, context.canvas.width, context.canvas.height);
      context.fillStyle = 'rgba(20,28,58,' + val + ')';
      context.fill();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
function starBurst(context, startX, startY, tileH, tileW = null){
	if (tileW == null){
		tileW = tileH
	}
	var maxStar = 5;
	var minStar = 3;
	
	var numStars = Math.round( Math.random() * (maxStar- minStar) +minStar);
	var coords = [];

	var lx = startX;
	var ly = startY;
	var rx = startX + tileW;
	var ry = startY + tileH;
	for (var i = 0; i < numStars; i++){
		var coord = {x: Math.random()*(tileW)  + startX ,  y:Math.random()*(tileH)  + startY };
		coords.push(coord);
	}
	drawShapes(context, coords);
	return coords;
}
function drawShapes(context, coords) {
	var radius = 4;
	/**
	for (var i = 0 ; i < coords.length - 1;i++){
		console.log((coords[i].x- coords[i+1].x)**2 + (coords[i].y - coords[i+1].y)**2);
		if((coords[i].x- coords[i+1].x)**2 + (coords[i].y - coords[i+1].y) **2 < 250**2){
			context.beginPath();
			context.moveTo(coords[i].x, coords[i].y);
			context.lineTo(coords[i + 1].x, coords[i+1].y);
			context.strokeStyle = "#ffffff"
			context.stroke();
		}
	}*/

	for (var i = 0 ; i < coords.length;i++){
		context.beginPath();
		context.arc(coords[i].x, coords[i].y,radius,0,2*Math.PI);
		context.fillStyle = "#FFF58C";
		context.fill();
		context.strokeStyle = "#ffffff"
		context.stroke();
	}
}