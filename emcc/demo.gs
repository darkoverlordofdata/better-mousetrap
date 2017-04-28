
uses SDL
uses Emscripten

surface: unowned Surface
bgd: Surface

init

	if SDL.init(SDL.InitFlag.VIDEO) < 0
		print "Unable to init SDL %s", SDL.get_error()
		return

	surface = Screen.set_video_mode(800, 300, 32, SurfaceFlag.HWSURFACE | SurfaceFlag.DOUBLEBUF)

	if surface == null	
		print "Unable to set video %s", SDL.get_error()
		return

	bgd = new SDL.Surface.load("assets/images/background.png")

	if bgd == null
		print "Unable to load bpm %s", SDL.get_error()
		return
	
	WindowManager.set_caption("ShmupWarz", "ShmupWarz")

	emscripten_set_main_loop_arg(main_loop, null, 0, 1)


def main_loop(game:void*)

	event: SDL.Event
	while Event.poll(out event) > 0

		case event.type

			when EventType.QUIT
				pass

		surface.fill(null, surface.format.map_rgb(255, 0, 0))
		bgd.blit(null, surface, null)
		surface.flip()
