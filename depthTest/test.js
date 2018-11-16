function init (){
	var canvas = document.createElement('canvas');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	console.log(canvas.width);
	var body = document.getElementsByTagName("body")[0];
	body.appendChild(canvas);
	context = canvas.getContext('2d');
	context.rect(0, 0, canvas.width, canvas.height);
	context.fillStyle = 'rgba(0,0,0,0,1)';
	context.fill();
	var totH = context.canvas.height;
	var totW = context.canvas.width;
	var radius = 400;
	drawLines(context,{'x':totW/2, 'y': totH/2}, radius, 1000);
	context.canvas.addEventListener('click', function(event) {
	    var rect = canvas.getBoundingClientRect();
	    x = event.clientX - rect.left;
	    y = event.clientY - rect.top;
	    var opposite = y - totH/2;
	    var adjacent = x - totW/2;
	    var hyp = Math.sqrt(opposite**2 + adjacent**2);
	    var angle = Math.asin(opposite/hyp);
	    context.rect(0, 0, canvas.width, canvas.height);
	    context.fillStyle = 'rgba(0,0,0,0,1)';
		context.fill();
	    drawLines(context,{'x':totW/2, 'y': totH/2}, radius, 1000 , angle);
	}, false);
	//console.log(coords);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


async function drawLines(context, center, radius, steps, angle = undefined){
	if (angle ==undefined) {
		var angle = Math.random()*Math.PI*2;
	}
	var lightPoint = {'x': Math.cos(angle)*radius + center.x, 'y': Math.sin(angle)*radius + center.y};
	var darkPoint = {'x': Math.sin(angle)*radius + center.x, 'y': Math.cos(angle)*radius + center.y};
	var gradient=context.createRadialGradient(lightPoint.x,lightPoint.y,50,darkPoint.x,darkPoint.y,700);
	gradient.addColorStop(0,`rgba(190,190,190,.9`);
	gradient.addColorStop(1,"black");
	context.strokeStyle=gradient;

	for(var i = 0; i < steps ; i++){
		context.beginPath();
		var angle = Math.random()*Math.PI*2;
		var angle2 = Math.random()*Math.PI*2;
		var angle3 = Math.random()*Math.PI*2;
		context.moveTo(( Math.cos(angle)*radius + center.x),(Math.sin(angle)*radius) + center.y);
		//context.lineTo((Math.cos(angle2)*radius),(Math.sin(angle2)*radius));
		context.quadraticCurveTo( (Math.cos(angle2)*radius) + center.x,(Math.sin(angle2)*radius)+ center.y,(Math.cos(angle3)*radius) + center.x,(Math.sin(angle3)*radius)+ center.y);
		context.stroke();
		await sleep(1);
	}
}

function drawBetweenPoints(context, center, radius,points){
	var angle = Math.random()*Math.PI*2;
	for (i = 0 ; i < points.length; i ++){
		context.beginPath();
		context.moveTo(points[i].x,points[i].y);

		context.quadraticCurveTo((radius * Math.cos(Math.random()*Math.PI*2) + center.x),(radius * Math.cos(Math.random()*Math.PI*2) + center.y),(radius * Math.cos(Math.random()*Math.PI*2) + center.x),(radius * Math.cos(Math.random()*Math.PI*2) + center.y));
		context.stroke();
	}
}
function getPoints(context, center, radius, steps){
	points = [];
	for (var i = 0; i < steps; i++){
		angle = (i / (steps/2)) * Math.PI; 
		x = (radius * Math.cos(angle) + center.x); // Calculate the x position of the element.
		y = (radius * Math.sin(angle) + center.y); // Calculate the y position of the element.
		point ={x: x, y:y};
		points.push(point);
	}
}