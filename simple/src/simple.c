#include <pebble.h>

Window *g_window;
TextLayer *g_text_layer;

void window_load(Window *window)
{
	// We will add the creation of the Window's elements here soon!
	g_text_layer = text_layer_create(GRect(0, 0, 144, 168));
	text_layer_set_background_color(g_text_layer, GColorClear);
	text_layer_set_text_color(g_text_layer, GColorBlack);
	
	layer_add_child(window_get_root_layer(window), text_layer_get_layer(g_text_layer));
	text_layer_set_text(g_text_layer, "Anything you want, as long as it is in quotes");
}

void window_unload(Window *window)
{
	// Safely destroy the Window's elements here!
	text_layer_destroy(g_text_layer);
}

void init()
{
	// Create app elements here
	g_window = window_create();	// construct window element for g_window to point to
	window_set_window_handlers(g_window, (WindowHandlers) {
		.load = window_load,
		.unload = window_unload,
	});

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






*/




