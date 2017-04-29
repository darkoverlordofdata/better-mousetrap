/**
 * Game controller 
 */
uses SDL
uses Emscripten
uses entitas

[Compact]
class Game

	mark1: double
	mark2: double
	delta: double
	mouseX: double
	mouseY: double
	mouseDown: bool
	running: bool
	keys: uint8[256]
	evt: SDL.Event
	surface: unowned Surface
	player:Entity*
	factory:Factory
	sprites: List of Entity* = new List of Entity*

	def initialize()
		factory = new Factory()

		factory.createBackground(Pool.BACKGROUND, 0)
		factory.createBackground(Pool.BACKGROUND, 1)
		player = factory.createPlayer(Pool.PLAYER)


		// list the entities in the console
		for var i=0 to 19
			if !factory.pool[i].isActive() do continue
			print factory.pool[i].toString()
		

	def start()
		running = true
		mark1 = emscripten_get_now()/1000

	def processEvents()
		while Event.poll(out evt) != 0

			case evt.type
				when EventType.QUIT
					running = false
				when EventType.KEYDOWN
					keys[evt.key.keysym.sym] = 1
				when EventType.KEYUP
					keys[evt.key.keysym.sym] = 0
				when EventType.MOUSEMOTION
					mouseX = evt.motion.x
					mouseY = evt.motion.y
				when EventType.MOUSEBUTTONDOWN
					mouseDown = true
				when EventType.MOUSEBUTTONUP
					mouseDown = false


	def update()
		mark2 = emscripten_get_now()/1000
		delta = mark2 - mark1
		mark1 = mark2

		processEvents()
		player.bounds.x = (int)(mouseX-player.bounds.w/2)
		player.bounds.y = (int)(mouseY-player.bounds.h/2)
		

		surface.fill(null, surface.format.map_rgb(255, 0, 0))
		for var i=0 to 19
			if !factory.pool[i].isActive() do continue
			factory.pool[i].sprite.surface.blit(null, surface, 
				{ 	
					(int16)factory.pool[i].bounds.x, 
					(int16)factory.pool[i].bounds.y, 
					(int16)factory.pool[i].bounds.w, 
					(int16)factory.pool[i].bounds.h
				})

		surface.flip()

