[indent=4]
uses SDL
uses SDL.Video
/** 
 * Entity Factory
 */

const Tau:double = 2.0 * Math.PI


class Factory
    id: static int = 0

// todo: load sound from res
// var rw = new SDL.RWops.from_mem((void*)ptr.get_data(), (int)ptr.get_size())
// chunk = new SDLMixer.Chunk.WAV_RW(rw)
        // Sound(new SDLMixer.Chunk.WAV("/home/bruce/scala/shmupwarz/assets/sounds/pew.wav")),

/**
 * getResource
 *
 * gets resource from gio resource compiler 
 *
 * @param name
 * @return surface
 */
def getResource(name:string):Surface 

    var ptr = GLib.resources_lookup_data("/darkoverlordofdata/shmupwarz/images/"+name, 0)
    if (ptr == null) 
        return null
     else 
        var raw = new SDL.RWops.from_mem((void*)ptr.get_data(), (int)ptr.get_size())
        return SDLImage.load_png(raw)

/**
 * createEntity
 *
 * @param game
 * @param pool
 * @param name
 * @param actor
 * @param category
 * @param scale
 * @param path
 * @param active
 * @returns entity id 
 */
def createEntity(game:Game, pool:array of Entity, name:string, actor:Actor, 
                    category:Category, path:string, scale:double = 1.0, active:bool = false):int

    var surface = getResource(path)
    var w = (int)((double)surface.w*scale)
    var h = (int)((double)surface.h*scale)
    var id = Factory.id++

    pool[id].id = id
    pool[id].name = name
    pool[id].active = active
    pool[id].actor = actor
    pool[id].category = category
    pool[id].pos.x = 0
    pool[id].pos.y = 0
    pool[id].bounds.x = 0
    pool[id].bounds.y = 0
    pool[id].bounds.w = w
    pool[id].bounds.h = h
    pool[id].scale.x = scale
    pool[id].scale.y = scale
    pool[id].sprite.texture = Video.Texture.create_from_surface(game.renderer, surface)
    pool[id].sprite.width = w
    pool[id].sprite.height = h
    return id

/**
 * createBackground
 *
 * create background entity 
 *
 * @param game
 * @return id
 */
def createBackground(game:Game, pool:array of Entity):Entity*
    var id = createEntity(game, pool, "background", Actor.BACKGROUND, Category.BACKGROUND, "BackdropBlackLittleSparkBlack.png", 2.0, true)
    return &pool[id]

def createPlayer(game:Game, pool:array of Entity):Entity*
    var id = createEntity(game, pool, "player", Actor.PLAYER, Category.PLAYER, "spaceshipspr.png", 1.0, true)
    return &pool[id]

def createBullet(game:Game, pool:array of Entity):Entity*
    var id = createEntity(game, pool, "bullet", Actor.BULLET, Category.BULLET, "bullet.png")
    //pool[id].sound = Sound(new SDLMixer.Chunk.WAV("/home/bruce/scala/shmupwarz/assets/sounds/pew.wav"))
    pool[id].tint = Color() {r = 0xd2, g = 0xfa, b = 0x00, a = 0xffa}
    pool[id].expires = Duration() {timer = 1.0}
    pool[id].health = Health() {current = 2, maximum = 2}
    pool[id].velocity = Vector2d() {x = 0, y = -800}
    return &pool[id]

def initBullet(game: Game, ref entity:Entity*, x:int, y:int) 
    entity.pos.x = x
    entity.pos.y = y
    entity.expires.timer = 1.0
    entity.active = true
    game.addSprite(entity)

def createEnemy1(game:Game, pool:array of Entity):Entity*
    var id = createEntity(game, pool, "enemy1", Actor.ENEMY1, Category.ENEMY, "enemy1.png")
    pool[id].health = Health() {current = 10, maximum = 10}
    pool[id].velocity = Vector2d() {x = 0, y = 40}
    return &pool[id]


def initEnemy1(game: Game, ref entity:Entity*, x:int, y:int) 
    entity.pos.x = x
    entity.pos.y = y
    entity.health.current = 10
    entity.active = true
    game.addSprite(entity)


def createEnemy2(game:Game, pool:array of Entity):Entity*
    var id = createEntity(game, pool, "enemy2", Actor.ENEMY2, Category.ENEMY, "enemy2.png")
    pool[id].health = Health() {current = 20, maximum = 20}
    pool[id].velocity = Vector2d() {x = 0, y = 30}
    return &pool[id]

def initEnemy2(game: Game, ref entity:Entity*, x:int, y:int)
    entity.pos.x = x
    entity.pos.y = y
    entity.health.current = 20
    entity.active = true
    game.addSprite(entity)

def createEnemy3(game:Game, pool:array of Entity):Entity*
    var id = createEntity(game, pool, "enemy3", Actor.ENEMY3, Category.ENEMY, "enemy3.png")
    pool[id].health = Health() {current = 60, maximum = 60}
    pool[id].velocity = Vector2d() {x = 0, y = 20}
    return &pool[id]
    
def initEnemy3(game: Game, ref entity:Entity*, x:int, y:int)
    entity.pos.x = x
    entity.pos.y = y
    entity.health.current = 60
    entity.active = true
    game.addSprite(entity)

def createExplosion(game:Game, pool:array of Entity):Entity*
    var id = createEntity(game, pool, "explosion", Actor.EXPLOSION, Category.EXPLOSION, "explosion.png", 0.6)
    //pool[id].sound = Sound(new SDLMixer.Chunk.WAV("/home/bruce/scala/shmupwarz/assets/sounds/asplode.wav"))
    pool[id].tint = Color() {r = 0xd2, g = 0xfa, b = 0xd2, a = 0xfa}
    pool[id].expires = Duration() {timer = 0.2}
    pool[id].tween = Tween() {min = 0.006, max = 0.6, speed = -3, repeat = false, active = true}
    return &pool[id]

def initExplosion(game: Game, ref entity:Entity*, x:int, y:int)
    entity.pos.x = x
    entity.pos.y = y
    entity.bounds.x = x 
    entity.bounds.y = y 
    entity.scale.x = 0.6
    entity.scale.y = 0.6
    entity.tween.active = true
    entity.expires.timer = 0.2
    entity.active = true
    game.addSprite(entity)

def createBang(game:Game, pool:array of Entity):Entity*
    var id = createEntity(game, pool, "bang", Actor.BANG, Category.EXPLOSION, "explosion.png", 0.4)
    //pool[id].sound = Sound(new SDLMixer.Chunk.WAV("/home/bruce/scala/shmupwarz/assets/sounds/smallasplode.wav"))
    pool[id].tint = Color() {r = 0xd2, g = 0xfa, b = 0xd2, a = 0xfa}
    pool[id].expires = Duration() {timer = 0.2}
    pool[id].tween = Tween() {min = 0.004, max = 0.4, speed = -3, repeat = false, active = true}
    return &pool[id]

def initBang(game: Game, ref entity:Entity*, x:int, y:int)
    entity.pos.x = x
    entity.pos.y = y
    entity.bounds.x = x 
    entity.bounds.y = y 
    entity.scale.x = 0.4
    entity.scale.y = 0.4
    entity.tween.active = true
    entity.expires.timer = 0.2
    entity.active = true
    game.addSprite(entity)

def createParticle(game:Game, pool:array of Entity):Entity*
    var id = createEntity(game, pool, "particle", Actor.PARTICLE, Category.PARTICLE, "star.png", 0.4)
    pool[id].tint = Color() {r = 0xd2, g = 0xfa, b = 0xd2, a = 0xfa}
    pool[id].expires = Duration() {timer = 0.75}
    pool[id].velocity = Vector2d() {x = 0, y = 0}
    return &pool[id]

def initParticle(game: Game, ref entity:Entity*, x:int, y:int)
    var radians = game.rand.next_double() * Tau 
    var magnitude = game.rand.int_range(0, 200)
    var velocityX = magnitude * Math.cos(radians)
    var velocityY = magnitude * Math.sin(radians)
    var scale = game.rand.double_range(0.1, 1.0)

    entity.pos.x = x
    entity.pos.y = y
    entity.bounds.x = x 
    entity.bounds.y = y 
    entity.scale.x = scale
    entity.scale.y = scale
    entity.velocity.x = velocityX
    entity.velocity.y = velocityY
    entity.expires.timer = 0.75
    entity.active = true
    game.addSprite(entity)


