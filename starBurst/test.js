

async function init (){
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
	tileStar(context, 500);
	//console.log(coords);
}
async function tileStar(context, height, width = null){
	if (width == null){
		width = height
	}
	var totH = context.canvas.height;
	var totW = context.canvas.width;
		for(var i = 0 ; i < totW;i+=width){
			for(var j = 0 ; j < totH; j +=height){
				starBurst(context, i, j , height);
			}
		}
}


function bursts(coords){

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
	var maxStar = 100;
	var minStar = 100;
	var numStars = Math.round( Math.random() * (maxStar- minStar) +minStar);
	//var numStars = 5;
	var coords = [];
	/**
		(lx,ly) ----- (rx,ly)
		|					|
		(lx,ry) ----- (rx,ry)
	**/
	for (var i = 0; i < numStars; i++){
		var coord = {x: Math.random()*(tileW)  + startX ,  y:Math.random()*(tileH)  + startY , lx: startX, ly: startY  , rx : startX + tileW, ry :startY + tileH};
		coords.push(coord);
	}
	context.globalAlpha = .5;
	for (var i = 0 ; i < coords.length - 1;i++){
		for( gen = 0 ; gen <100; gen ++){
			context.beginPath();
			context.moveTo(coords[i].x, coords[i].y);
			var midX = (coords[i].x + coords[i+1].x )/2;
			var midY = (coords[i].y + coords[i+1].y )/2;
			var choice = Math.ceil(Math.random()*4);
			if ( choice == 1) {
				pullX = (Math.random()*(midX - coords[i].lx)/2)/2+ coords[i].lx;
				pullY = (Math.random()*(midY - coords[i].ly)/2)/2+ coords[i].ly;
				context.strokeStyle = "#21A3CC";
			}
			else if (choice == 2) {
				pullX = coords[i].rx - (Math.random()*(coords[i].rx - midX)/2)/2;
				pullY = (Math.random()*(midY - coords[i].ly)/2)/2+ coords[i].ly;

				context.strokeStyle = "#FF5182";
			}
			else if ( choice ==3) {
				pullX = (Math.random()*(midX - coords[i].lx)/2)/2+ coords[i].lx;
				pullY = coords[i].ry - (Math.random()*(coords[i].ry - midY)/2)/2;
				console.log("new-----------")
				console.log(coords[i])
				console.log("midX ", midX , "midY" , midY, "pullx ",  pullX, "pully ",  pullY);
				context.strokeStyle = "#FFF13C";
			}
			else{
				pullX = coords[i].rx - (Math.random()*(coords[i].rx - midX)/2)/2;
				pullY = coords[i].ry - (Math.random()*(coords[i].ry - midY)/2)/2;
				context.strokeStyle = "#000000";
			}
			context.quadraticCurveTo(pullX, pullY,coords[i + 1].x, coords[i+1].y);
			context.stroke();
		}
	}
}
