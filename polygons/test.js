

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
	tileMap(context, 50);
}
function tileMap(context, height, width = null){
	if (width == null){
		width = height
	}
	var totH = context.canvas.height;
	var totW = context.canvas.width;
	var vectorMap = [];
	var randAngle = Math.random()*2*Math.PI;
	var variance = Math.PI;
	for(var i = 0 ; i < totW;i+=width){
		for(var j = 0 ; j < totH; j +=height){
			randAngle = randAngle + Math.random()*variance;
			var vect = {i_:i, j_:j, angle_:randAngle};
			vectorMap.push(vect);
		}
	}
	var radius = 20;
	for (var i = 0; i < vectorMap.length;i++){
		var x1 = Math.cos(vectorMap[i].angle_) * radius + vectorMap[i].i_;
		var y1 =  Math.sin(vectorMap[i].angle_) * radius + vectorMap[i].j_;
		var x2 =  Math.sin(vectorMap[i].angle_) * radius +vectorMap[i].i_;
		var y2 = Math.cos(vectorMap[i].angle_) * radius+ vectorMap[i].j_;
		context.beginPath();
		context.moveTo(x1,y1);
		context.lineTo(vectorMap[i].i_,vectorMap[i].j_);
		context.stroke();
	}
}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
