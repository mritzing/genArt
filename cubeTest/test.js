async function init (){
	var canvas = document.createElement('canvas');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	var body = document.getElementsByTagName("body")[0];
	body.appendChild(canvas);
	context = canvas.getContext('2d');
	context.rect(0, 0, canvas.width, canvas.height);
	context.fillStyle = 'rgba(255,255,255,1)';
	context.fill();

	/**

	var cHeight = 200;
	var cWidth =  200;
	var cDepth = 50;
	var startX = canvas.width/2 - cWidth/2;
	var startY = canvas.height/2 - cHeight/2;



	var nodes=[];
	var uR =  {x: startX, y: startY};
	var uL =  {x: startX + cWidth, y: startY}
	var xL =  {x: startX + cWidth, y: startY + cHeight};
	var xR =  {x: startX, y: startY + cHeight};

	nodes.push(uR);
	nodes.push(uL);
	nodes.push(xL);
	nodes.push(xR);
	**/
	//cube w/ lines
	nodes=[];
	var center = {x: canvas.width/2, y: canvas.height/2, z: 0};
	var cHeight = 500;
	var cWidth = 500;
	var startX = canvas.width/2 - cWidth/2;
	var startY = canvas.height/2 - cHeight/2;
	var steps = 50;
	var angle = Math.PI/360; 
	for (var i = startX; i < center.x + cWidth / 2; i += steps){
		for(var j = startY; j < center.y + cHeight /2; j += steps){
			var node = {x: i + steps/2 , y: j + steps/2};
			nodes.push(node);
		}
	}
	nodes.push(center);
	circleNodes(context, nodes);
	while(true){
		//fillTransparent(context, .5);
		nodes = rotateZ(context, nodes, angle, center);
		circleNodes(context, nodes);
		await sleep(1000);
	}
	//console.log(coords);
}



function fillTransparent(context, val) {
      context.rect(0, 0, context.canvas.width, context.canvas.height);
      context.fillStyle = 'rgba(255, 255, 255,' + val + ')';
      context.fill();
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
//draws line between nodes
function line2d(conext, nodes)  {
	context.beginPath();
	context.strokeStyle = "black";
	context.moveTo(nodes[0].x, nodes[0].y);
	for (var i = 1; i < nodes.length; i ++){
		console.log(nodes[i]);
		context.lineTo(nodes[i].x, nodes[i].y);
	}
	context.lineTo(nodes[0].x, nodes[0].y);
	context.stroke();
}

function circleNodes(context, nodes) {
	context.fillStyle = "black";
	var radius =3;
	console.log(nodes);
	for (var i = 0; i < nodes.length; i++) {
		context.beginPath();
		context.arc(nodes[i].x, nodes[i].y, radius, 0 , 2*Math.PI);
		context.fillStyle = "black";
		context.fill();
		context.stroke();
	}
}	

function rotateZ(context, nodes , angle, center) {
	var sinTheta = Math.sin(angle);
	var cosTheta = Math.cos(angle);
	var newNodes = [];
	center.x = 0;
	center.y = 0;
	var countOut = 0;
	for (var i = 0; i < nodes.length; i++) {
		var x_ = nodes[i].x - center.x;
		var y_ = nodes[i].y - center.y;
		var point = {x:( x_*cosTheta - y_*sinTheta) + center.x, y: (y_*cosTheta + x_*sinTheta) + center.y, z: nodes.z};
		if ((point.x > context.canvas.width || point.x < context.canvas.width) && (point.y > context.canvas.width || point.y < context.canvas.width))
		newNodes.push(point);
	}


	//reset in frame
	return newNodes;
}

function rotateY(nodes , angle, center) {
	var sinTheta = Math.sin(angle);
	var cosTheta = Math.cos(angle);
	var newNodes = [];
	for (var i = 0; i < nodes.length; i++) {
		var x_ = nodes[i].x - center.x;
		var y_ = nodes[i].y - center.y;
		newNodes.push({x:( x_*cosTheta - y_*sinTheta) + center.x, y: (y_*cosTheta + x_*sinTheta) + center.y});
	}
	return newNodes;
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