function init (){
	var canvas = document.createElement('canvas');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	console.log(canvas.width);
	var body = document.getElementsByTagName("body")[0];
	body.appendChild(canvas);
	context = canvas.getContext('2d');
	context.rect(0, 0, canvas.width, canvas.height);
	context.fillStyle = 'rgba(255,255,255,1)';
	context.fill();
	tile(context, canvas.height/10);
	//console.log(coords);
}
function tile(context, height, width = null){
	if (width == null){
		width = height
	}
	var totH = context.canvas.height;
	var totW = context.canvas.width;
		for(var i = 0 ; i < totW;i+=width){
			for(var j = 0 ; j < totH; j +=height){
				
			}
		}
}