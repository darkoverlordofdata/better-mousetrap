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
 * createBackground
 *
 * create background entity 
 *
 * @param game
 * @return id
 */
def createBackground(game:Game, pool:array of Entity):Entity*
    var scale = 2.0
    var surface = getResource("BackdropBlackLittleSparkBlack.png")
    var w = (int)((double)surface.w*scale)
    var h = (int)((double)surface.h*scale)
    var id = Factory.id
    Factory.id++
    pool[id] = { 
        id, 
        "background", 
        true, 
        Actor.BACKGROUND, 
        Category.BACKGROUND,
        Point2d() {x = 0, y = 0}, 
        Rect() {x = 0, y = 0, w = w, h = h}, 
        Vector2d() {x = scale, y = scale}//,
        // Sprite(Video.Texture.create_from_surface(game.renderer, surface), w, h)
    }
    pool[id].sprite.texture = Video.Texture.create_from_surface(game.renderer, surface)
    pool[id].sprite.width = w
    pool[id].sprite.height = h
    return &pool[id]

def createPlayer(game:Game, pool:array of Entity):Entity*
    var scale = 1.0
    var surface = getResource("spaceshipspr.png")
    var w = (int)((double)surface.w*scale)
    var h = (int)((double)surface.h*scale)
    var id = Factory.id
    Factory.id++
    pool[id] = { 
        id, 
        "player", 
        true, 
        Actor.PLAYER, 
        Category.PLAYER,
        Point2d() {x = 0, y = 0}, 
        Rect() {x = 0, y = 0, w = w, h = h}, 
        Vector2d() {x = scale, y = scale}//,
        //Sprite(Video.Texture.create_from_surface(game.renderer, surface), w, h)
    }
    pool[id].sprite.texture = Video.Texture.create_from_surface(game.renderer, surface)
    pool[id].sprite.width = w
    pool[id].sprite.height = h
    return &pool[id]


def createBullet(game:Game, pool:array of Entity):Entity*
    var scale = 1.0
    var surface = getResource("bullet.png")
    var w = (int)((double)surface.w*scale)
    var h = (int)((double)surface.h*scale)
    var id = Factory.id
    Factory.id++
    pool[id] = { 
        id, 
        "bullet", 
        false, 
        Actor.BULLET, 
        Category.BULLET,
        Point2d() {x = 0, y = 0}, 
        Rect() {x = 0, y = 0, w = w, h = h}, 
        Vector2d() {x = scale, y = scale},
        //Sprite(Video.Texture.create_from_surface(game.renderer, surface), w, h),
        Sound(new SDLMixer.Chunk.WAV("/home/bruce/scala/shmupwarz/assets/sounds/pew.wav")),
        Color() {r = 0xd2, g = 0xfa, b = 0x00, a = 0xffa},
        Duration() {timer = 1.0},
        Health() {current = 2, maximum = 2},
        null,
        Vector2d() {x = 0, y = -800}
    }
    pool[id].sprite.texture = Video.Texture.create_from_surface(game.renderer, surface)
    pool[id].sprite.width = w
    pool[id].sprite.height = h
    return &pool[id]


def initBullet(game: Game, ref entity:Entity*, x:int, y:int) 
    entity.position.x = x
    entity.position.y = y
    entity.expires.timer = 1.0
    entity.active = true
    game.addSprite(entity)


def createEnemy1(game:Game, pool:array of Entity):Entity*
    var scale = 1.0
    var surface = getResource("enemy1.png")
    var w = (int)((double)surface.w*scale)
    var h = (int)((double)surface.h*scale)
    var id = Factory.id
    Factory.id++
    pool[id] = { 
        id, 
        "enemy1", 
        false, 
        Actor.ENEMY1, 
        Category.ENEMY,
        Point2d() {x = 0, y = 0}, 
        Rect() {x = 0, y = 0, w = w, h = h}, 
        Vector2d() {x = scale, y = scale},
        //Sprite(Video.Texture.create_from_surface(game.renderer, surface), w, h),
        null,
        null,
        null,
        Health() {current = 10, maximum = 10},
        null,
        Vector2d() {x = 0, y = 40}
    }
    pool[id].sprite.texture = Video.Texture.create_from_surface(game.renderer, surface)
    pool[id].sprite.width = w
    pool[id].sprite.height = h
    return &pool[id]


def initEnemy1(game: Game, ref entity:Entity*, x:int, y:int) 
    entity.position.x = x
    entity.position.y = y
    entity.health.current = 10
    entity.active = true
    game.addSprite(entity)


def createEnemy2(game:Game, pool:array of Entity):Entity*
    var scale = 1.0
    var surface = getResource("enemy2.png")
    var w = (int)((double)surface.w*scale)
    var h = (int)((double)surface.h*scale)
    var id = Factory.id
    Factory.id++
    pool[id] = { 
        id, 
        "enemy2", 
        false, 
        Actor.ENEMY2, 
        Category.ENEMY,
        Point2d() {x = 0, y = 0}, 
        Rect() {x = 0, y = 0, w = w, h = h}, 
        Vector2d() {x = scale, y = scale},
        //Sprite(Video.Texture.create_from_surface(game.renderer, surface), w, h),
        null,
        null,
        null,
        Health() {current = 20, maximum = 20},
        null,
        Vector2d() {x = 0, y = 30}
    }
    pool[id].sprite.texture = Video.Texture.create_from_surface(game.renderer, surface)
    pool[id].sprite.width = w
    pool[id].sprite.height = h
    return &pool[id]


def initEnemy2(game: Game, ref entity:Entity*, x:int, y:int)
    entity.position.x = x
    entity.position.y = y
    entity.health.current = 20
    entity.active = true
    game.addSprite(entity)

def createEnemy3(game:Game, pool:array of Entity):Entity*
    var scale = 1.0
    var surface = getResource("enemy3.png")
    var w = (int)((double)surface.w*scale)
    var h = (int)((double)surface.h*scale)
    var id = Factory.id
    Factory.id++
    pool[id] = { 
        id, 
        "enemy3", 
        false, 
        Actor.ENEMY3, 
        Category.ENEMY,
        Point2d() {x = 0, y = 0}, 
        Rect() {x = 0, y = 0, w = w, h = h}, 
        Vector2d() {x = scale, y = scale},
        //Sprite(Video.Texture.create_from_surface(game.renderer, surface), w, h),
        null,
        null,
        null,
        Health() {current = 60, maximum = 60},
        null,
        Vector2d() {x = 0, y = 20}
    }
    pool[id].sprite.texture = Video.Texture.create_from_surface(game.renderer, surface)
    pool[id].sprite.width = w
    pool[id].sprite.height = h
    return &pool[id]
    
def initEnemy3(game: Game, ref entity:Entity*, x:int, y:int)
    entity.position.x = x
    entity.position.y = y
    entity.health.current = 60
    entity.active = true
    game.addSprite(entity)


def createExplosion(game:Game, pool:array of Entity):Entity*
    var scale = 0.6
    var surface = getResource("explosion.png")
    var w = (int)((double)surface.w*scale)
    var h = (int)((double)surface.h*scale)
    var id = Factory.id
    Factory.id++
    pool[id] = { 
        id, 
        "explosion", 
        false, 
        Actor.EXPLOSION, 
        Category.EXPLOSION,
        Point2d() {x = 0, y = 0}, 
        Rect() {x = 0, y = 0, w = w, h = h}, 
        Vector2d() {x = scale, y = scale},
        //Sprite(Video.Texture.create_from_surface(game.renderer, surface), w, h),
        Sound(new SDLMixer.Chunk.WAV("/home/bruce/scala/shmupwarz/assets/sounds/asplode.wav")),
        Color() {r = 0xd2, g = 0xfa, b = 0xd2, a = 0xfa},
        Duration() {timer = 0.2},
        null,
        Tween() {min = scale/100.0, max = scale, speed = -3, repeat = false, active = true},
        null
    }
    pool[id].sprite.texture = Video.Texture.create_from_surface(game.renderer, surface)
    pool[id].sprite.width = w
    pool[id].sprite.height = h
    return &pool[id]

def initExplosion(game: Game, ref entity:Entity*, x:int, y:int)
    entity.position.x = x
    entity.position.y = y
    entity.bounds.x = x 
    entity.bounds.y = y 
    entity.scale.x = 0.6
    entity.scale.y = 0.6
    entity.tween.active = true
    entity.expires.timer = 0.2
    entity.active = true
    game.addSprite(entity)

def createBang(game:Game, pool:array of Entity):Entity*
    var scale = 0.4
    var surface = getResource("explosion.png")
    var w = (int)((double)surface.w*scale)
    var h = (int)((double)surface.h*scale)
    var id = Factory.id
    Factory.id++
    pool[id] = { 
        id, 
        "bang", 
        false, 
        Actor.BANG, 
        Category.EXPLOSION,
        Point2d() {x = 0, y = 0}, 
        Rect() {x = 0, y = 0, w = w, h = h}, 
        Vector2d() {x = scale, y = scale},
        //Sprite(Video.Texture.create_from_surface(game.renderer, surface), w, h),
        Sound(new SDLMixer.Chunk.WAV("/home/bruce/scala/shmupwarz/assets/sounds/smallasplode.wav")),
        Color() {r = 0xd2, g = 0xfa, b = 0xd2, a = 0xfa},
        Duration() {timer = 0.2},
        null,
        Tween() {min = scale/100.0, max = scale, speed = -3, repeat = false, active = true},
        null
    }
    pool[id].sprite.texture = Video.Texture.create_from_surface(game.renderer, surface)
    pool[id].sprite.width = w
    pool[id].sprite.height = h
    return &pool[id]


def initBang(game: Game, ref entity:Entity*, x:int, y:int)
    entity.position.x = x
    entity.position.y = y
    entity.bounds.x = x 
    entity.bounds.y = y 
    entity.scale.x = 0.4
    entity.scale.y = 0.4
    entity.tween.active = true
    entity.expires.timer = 0.2
    entity.active = true
    game.addSprite(entity)

def createParticle(game:Game, pool:array of Entity):Entity*
    var scale = 1.0
    var surface = getResource("star.png")
    var w = (int)((double)surface.w*scale)
    var h = (int)((double)surface.h*scale)
    var id = Factory.id
    Factory.id++
    pool[id] = { 
        id, 
        "particle", 
        false, 
        Actor.PARTICLE, 
        Category.PARTICLE,
        Point2d() {x = 0, y = 0}, 
        Rect() {x = 0, y = 0, w = w, h = h}, 
        Vector2d() {x = scale, y = scale},
        //Sprite(Video.Texture.create_from_surface(game.renderer, surface), w, h),
        null,
        Color() {r = 0xd2, g = 0xfa, b = 0xd2, a = 0xfa},
        Duration() {timer = 0.75},
        null,
        null,
        Vector2d() {x = 0, y = 0}
    }
    pool[id].sprite.texture = Video.Texture.create_from_surface(game.renderer, surface)
    pool[id].sprite.width = w
    pool[id].sprite.height = h
    return &pool[id]


def initParticle(game: Game, ref entity:Entity*, x:int, y:int)
    var radians = game.rand.next_double() * Tau 
    var magnitude = game.rand.int_range(0, 200)
    var velocityX = magnitude * Math.cos(radians)
    var velocityY = magnitude * Math.sin(radians)
    var scale = game.rand.double_range(0.1, 1.0)

    entity.position.x = x
    entity.position.y = y
    entity.bounds.x = x 
    entity.bounds.y = y 
    entity.scale.x = scale
    entity.scale.y = scale
    entity.velocity.x = velocityX
    entity.velocity.y = velocityY
    entity.expires.timer = 0.75
    entity.active = true
    game.addSprite(entity)


