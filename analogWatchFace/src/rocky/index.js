var rocky = require('rocky');

function fractionToRadian(fraction){
	return fraction * 2 * Math.PI;
}

function drawHand(ctx, cx, cy, angle, length, color){
	// End points
	var x2 = cx + Math.sin(angle) * length;
	var y2 = cy - Math.cos(angle) * length;
	
	// Configure line attributes
	ctx.lineWidth = 8;
	ctx.strokeStyle = color;
	
	// Begin drawing
	ctx.beginPath();
	
	// Position at center point then draw the lines
	ctx.moveTo(cx, cy);
	ctx.lineTo(x2, y2);
	
	// Push the current buffer to display
	ctx.stroke();
}

rocky.on('draw', function(event){
	var ctx = event.context;
	var d = new Date();
	
	// Clear the Screen
	ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
	
	// Determine the width and height of the display
	var w = ctx.canvas.unobstructedWidth;
	var h = ctx.canvas.unobstructedHeight;
	
	// Get the center point
	var cx = w/2;
	var cy = h/2;
	
	// Set max size of watch hands
	// -20 gives an in-setting of 10px on each side
	var maxLength = (Math.min(w, h) - 20) / 2;
	// Uncomment this section and set the event trigger to secondchange if you want to add the seconds hand
///*

	// Calculate the second hand angle
	var secondFraction = (d.getSeconds()) / 60;
	var secondAngle = fractionToRadian(secondFraction);
	
	// Draw the second hand
	drawHand(ctx, cx, cy, secondAngle, maxLength, "gold");
//*/
	// Calculate the minute hand angle
	var minuteFraction = (d.getMinutes()) / 60;
	var minuteAngle = fractionToRadian(minuteFraction);
	
	// Draw the minute hand
	drawHand(ctx, cx, cy, minuteAngle, maxLength * 0.9, "white");
	
	// Calculate the hour hand angle
	var hourFraction = (d.getHours() % 12 + minuteFraction) / 12;
	var hourAngle = fractionToRadian(hourFraction);
	
	// Draw the hour hand
	drawHand(ctx, cx, cy, hourAngle, maxLength * 0.6, "lightblue");
});



rocky.on('secondchange', function(event){
	// Display a mesage in the system logs
	console.log("Precious seconds ticking away!");
	
	// Redraw screen on next pass
	rocky.requestDraw();
});