/*
  Building A Basic Digital Watchface Using Javascript
  ========================================== 
    Subscribe to the minutechange event.
    Subscribe to the draw event, so we can update the display.
    Clear the display each time we draw on the screen.
    Determine the width and height of the available content area of the screen.
    Obtain the current date and time.
    Set the text color to white.
    Center align the text.
    Display the current time, using the width and height to determine the center point of the screen.

*/



var rocky = require('rocky');   // include the rocky.js library



rocky.on('draw', function(event){   // emmitted after each call to rocky.requestDraw()
  // Get the CanvasRenderingContext2D object
  // The CanvasRenderingContext2D is used to 
  // Determine the display charateristics and draw 
  // text or shapes on the display
  // The draw event may also be emitted at other times, 
  // such as when the handler is first registered.
  var ctx = event.context;

  // Clear the screen
  ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);

  // Determine the width and height of the display
  var w = ctx.canvas.unobstructedWidth;
  var h = ctx.canvas.unobstructedHeight;

  // Current date/time
  var d = new Date();

  // Set the text color
  ctx.fillStyle = 'white';

  // Center align the text
  ctx.textAlign = 'center';
  
  // Display the time, in the middle of the screen
  ctx.fillText(d.toLocaleTimeString(), w/2, h/2, w);
});




rocky.on('secondchange', function(event){   // Register callback method to the minutechange event
  // Display a message in the system logs
  console.log("Second Change Event Triggered!");
  rocky.requestDraw();          // redraw the screen on next pass
});   
// Watchfaces that need to update more or less 
//frequently can also register the secondchange,
// hourchange or daychange events.
