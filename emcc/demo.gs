uses SDL
uses Emscripten

surface: unowned Surface
bgd: Surface
mark1: double
mark2: double
delta: double

struct Context
	mark1: double
	mark2: double
	delta: double


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

	ctx:Context = {emscripten_get_now()/1000, 0, 0}

	mark1 = emscripten_get_now()/1000
	emscripten_set_main_loop_arg(main_loop, &ctx, 0, 1)


def main_loop(arg:void*)

	var ctx = (Context*)arg

	ctx->mark2 = emscripten_get_now()/1000
	ctx->delta = ctx->mark2 - ctx->mark1
	ctx->mark1 = ctx->mark2

	print "%f", ctx->delta

	event: SDL.Event
	while Event.poll(out event) > 0

		case event.type

			when EventType.QUIT
				pass

		surface.fill(null, surface.format.map_rgb(255, 0, 0))
		bgd.blit(null, surface, null)
		surface.flip()



