/**
 * Entity Factory
 */
uses SDL
uses Emscripten
uses entitas

const TAU: double = 2.0 * Math.PI
enum Pool
	BACKGROUND
	ENEMY1
	ENEMY2
	ENEMY3
	PLAYER
	BULLET
	EXPLOSION
	BANG
	PARTICLE
	HUD
	Count

 
[Compact]
class Factory

	pool: Entity[20]
	id:int = 0
	cache: array of Surface = {
		new Surface.load("assets/images/background.png"),
		new Surface.load("assets/images/enemy1.png"),
		new Surface.load("assets/images/enemy2.png"),
		new Surface.load("assets/images/enemy3.png"),
		new Surface.load("assets/images/spaceshipspr.png"),
		new Surface.load("assets/images/bullet.png"),
		new Surface.load("assets/images/explosion.png"),
		new Surface.load("assets/images/explosion.png"),
		new Surface.load("assets/images/particle.png")
	}
        
	def createCore(name:string, pool:int, active:bool = false):Entity*
		var id = this.id++
		return this.pool[id].setId(id).setName(name).setPool(pool).setActive(active)

	def createEntity(name:string, pool:int, s:Surface, active:bool = false):Entity*
		return (createCore(name, pool, active)
			.addPosition(0, 0)
			.addLayer(pool)
			.addBounds(0, 0, s.w, s.h)
			.addSprite(s))

	def createBackground(index:int, tile:int):Entity*
		var e = (createEntity("background", 0, cache[index], true).setBackground(true))
		e.bounds.x = e.bounds.w * tile
		return e

	def createPlayer(index: int):Entity*
		return createEntity("player", 1, cache[index], true)

