

function init (){
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
	starTile(context, 50);
}
function starTile(context, height, width = null){
	if (width == null){
		width = height
	}
	var totH = context.canvas.height;
	var totW = context.canvas.width;
		for(var i = 0 ; i < totW;i+=width){
			for(var j = 0 ; j < totH; j +=height){
				starBlock(context, i, j , height)
			}
		}
}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
function starBlock(context, startX, startY, tileH, tileW = null){
	if (tileW == null){
		tileW = tileH
	}
	var maxStar = 5;
	var minStar = 3;
	var radius = 2;
	var numStars = Math.round( Math.random() * (maxStar- minStar) +minStar);
	var coords = [];
	for (var i = 0; i < numStars; i++){
		var coord = {x: Math.random()*(startX - (startX - tileW))  + startX ,  y:Math.random()*(startY - (startY - tileH))  + startY };
		coords.push(coord);
	}
	for (var i = 0 ; i < coords.length;i++){
		context.beginPath();
		context.arc(coords[i].x, coords[i].y,radius,0,2*Math.PI);
		context.stroke();
	}

	//draw lines between
	for (var i = 0 ; i < coords.length - 1;i++){
		context.beginPath();
		context.moveTo(coords[i].x, coords[i].y);
		context.lineTo(coords[i + 1].x, coords[i+1].y);
		context.stroke();
	}

}