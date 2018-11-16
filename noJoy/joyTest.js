//now with lists
function joyD(context) {
	var step = 10
	var size = context.canvas.width;
	lines = [];
	for (var i = step; i <= size - step; i += step) {
		var line = [];
		for (var j = step; j <= size - step; j += step) {
			var distanceToCenter = Math.abs(j - size / 2);
			var variance = Math.max(size / 2 - 50 - distanceToCenter, 0);
			var random = Math.random() * variance / 2 * -1;
			var point = {x: j, y: i + random};
			line.push(point);
		}
		lines.push(line);
	}
	for (var i = 0; i < lines.length; i++) {	
		context.beginPath();
		context.moveTo(lines[i][0].x, lines[i][0].y);
		for (var j = 0; j < lines[i].length; j++) {
			context.lineTo(lines[i][j].x, lines[i][j].y);
		}
		context.stroke();
	}
}