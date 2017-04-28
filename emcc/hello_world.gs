/**

posixvalac --vapidir ./vapis --pkg sdl --pkg emscripten -C --save-temps --disable-warnings hello_world.gs
emcc `pkg-config posixvala --cflags` -s WASM=1 -s USE_SDL=1 hello_world.c -o index.html


*/
uses SDL
uses Emscripten

surface: unowned Surface

init

	var x = 42
	print "Hello World %d", x

	if SDL.init(SDL.InitFlag.VIDEO) < 0
		print "Unable to init SDL %s", SDL.get_error()
		return

	surface = Screen.set_video_mode(800, 300, 32, SurfaceFlag.HWSURFACE | SurfaceFlag.DOUBLEBUF)

	if surface == null	
		print "Unable to set video %s", SDL.get_error()
		return
		
	WindowManager.set_caption("Hello", "")

	emscripten_set_main_loop_arg(main_loop, null, 0, 1)


def main_loop(game:void*)

	event: SDL.Event
	while Event.poll(out event)>0

		case event.type

			when EventType.QUIT
				pass

		
		surface.fill(null, surface.format.map_rgb(255, 0, 0))
		