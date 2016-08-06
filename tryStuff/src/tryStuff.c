#include <pebble.h>

Window *g_window;
TextLayer *g_text_layer;


void window_load(Window *window)
{
	// Add the creation of the Window's elements here!
	
	g_text_layer = text_layer_create(GRect(0, 0, 144, 80));
	text_layer_set_background_color(g_text_layer, GColorClear);
	text_layer_set_text_color(g_text_layer, GColorBlack);
	
	layer_add_child(window_get_root_layer(window), text_layer_get_layer(g_text_layer));
	text_layer_set_text(g_text_layer, "#The World Is Yours!");
}

void window_unload(Window *window){
	// Safely destroy Window's elements and here!
	text_layer_destroy(g_text_layer);
}

void init()
{
	// Create app elements here
	
	g_window = window_create();	// window element assigned to pointer *g_window x
	
	window_set_window_handlers(g_window, (WindowHandlers){
		.load = window_load,
		.unload = window_unload,
	});// Set handlers for process load and unload
	
	window_stack_push(g_window, true);
}

void deinit()
{
	// Destroy app elements here
	window_destroy(g_window);
}

int main(void) {
	init();
	app_event_loop();
	deinit();
}


/*
	=========================================
	Basic app creation step may be defined as
	
	main()	--	Entry point of app
	init()	--	Create Window
	window_load()	--	Create Window Elements
	app_event_loop()	--	Wait for any ticks, clicks, or other events until exit
	window_unload()	--	Destroy Window elements
	deinit()	--	Destroy Window


========================================================================


    text_layer_create() - 
    	This creates the TextLayer and sets its frame to
    	that in the GRect supplied as its only argument
    	to x = 0, y = 0, width = 144 pixels and height = 168 pixels
    	**(this is the size of the entire screen). 
    	Just like window_create(), this function returns 
    	a pointer to the newly created TextLayer
    	
    	
    text_layer_set_background_color() - 
    	This also does what it says: sets the TextLayer's
    	background color to GColorClear, which is transparent.
    	
    	
    text_layer_set_text_color() - 
    	Similar to the last function, but sets the text color to GColorBlack.
    	
    	
    layer_add_child() - This is used to add the TextLayer's 
    	"root" Layer (which is the part drawn to the screen) 
    	as a 'child' of the Window's root layer. Simply put, 
    	all child Layers are drawn in front of their 'parents' 
    	and allows us to control layering of Layers and in which 
    	order they are drawn.

-|/-\-
As should always be the case, we must add the required destruction function calls to free up the memory we used in creating the TextLayer. This is done in the parent Window's window_unload() function




*/
