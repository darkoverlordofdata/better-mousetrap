[indent=4]
uses SDL
uses SDL.Video
uses SDLMixer

const TAU           : double = 2.0 * Math.PI


/** 
 * Entity Factory
 */

enum Kind
    BACKGROUND
    ENEMY1
    ENEMY2
    ENEMY3
    PLAYER
    BULLET
    EXPLOSION
    BANG
    PARTICLE
    Count

enum Effect 
    PEW
    SMALLASPLODE
    ASPLODE


class Factory
    game        : Game
    rand        : Rand
    pool        : array of Entity
    cache       : array of list of Entity* 
    config      : array of Config

    construct(game:Game, size:int)
        this.game = game
        rand = new Rand()
        config = {
            Config() { kind = Kind.BULLET,      size = 12,  alloc = createBullet },
            Config() { kind = Kind.ENEMY1,      size = 15,  alloc = createEnemy1 },
            Config() { kind = Kind.ENEMY2,      size = 5,   alloc = createEnemy2 },
            Config() { kind = Kind.ENEMY3,      size = 4,   alloc = createEnemy3 },
            Config() { kind = Kind.EXPLOSION,   size = 10,  alloc = createExplosion },
            Config() { kind = Kind.BANG,        size = 12,  alloc = createBang },
            Config() { kind = Kind.PARTICLE,    size = 100, alloc = createParticle }
        }
        pool = new array of Entity[size]
        cache = new array of list of Entity*[Kind.Count]
        for var i=0 to (Kind.Count-1) do cache[i] = new list of Entity*
        for var i=0 to (config.length)
            for var k=1 to (config[i].size)  
                cache[config[i].kind].add(config[i].alloc())


    def getEntities(entity: list of Entity*)
        entity.clear()
        for var i = 0 to (World.id-1) do if pool[i].active do entity.add(&pool[i])

    def killEntity(entity:Entity*)
        entity.active = false
        game.removeSprite(entity)
        cache[entity.kind].add(entity)
    /**
    * allocEntity
    *
    * allocate the next entity from the pool
    *
    * @returns ptr to Entity 
    */
    def allocEntity():Entity*
        var id = World.id++
        return pool[id].setId(id)


    /**
    * createEntity
    *
    * creates the core entity with builtin components
    *
    * @param name
    * @param kind
    * @param scale
    * @param path
    * @param active
    * @returns entity id 
    */
    def createEntity(name:string, kind:Kind, path:string, scale:double = 1.0, active:bool = false):Entity*

        var surface = getSurface(path)
        var w = (int)((double)surface.w*scale)
        var h = (int)((double)surface.h*scale)
        return (allocEntity()
            .setName(name)
            .setActive(active)
            .setKind(kind)
            .setPos(0, 0)
            .setBounds(0, 0, w, h)
            .setScale(scale, scale)
            .setSprite(Video.Texture.create_from_surface(game.renderer, surface), w, h))



    /**
    * createBackground
    *
    * create background entity 
    *
    * @param game
    * @return id
    */
    def createBackground():Entity*
        return createEntity("background", Kind.BACKGROUND, "BackdropBlackLittleSparkBlack.png", 2.0, true)

    def createPlayer():Entity*
        return createEntity("player", Kind.PLAYER, "spaceshipspr.png", 1.0, true)

    def createBullet():Entity*
        return (
            createEntity("bullet", Kind.BULLET, "bullet.png")
            .addSound(getChunk("pew.wav"))
            .addTint(0xd2, 0xfa, 0, 0xfa)
            .addExpires(1.0)
            .addHealth(2, 2)
            .addVelocity(0, -800))

    def createEnemy1():Entity*
        return (
            createEntity("enemy1", Kind.ENEMY1, "enemy1.png")
            .addHealth(10, 10)
            .addVelocity(0, 40))

    def createEnemy2():Entity*
        return (
            createEntity("enemy2", Kind.ENEMY2, "enemy2.png")
            .addHealth(20, 20)
            .addVelocity(0, 30))

    def createEnemy3():Entity*
        return (
            createEntity("enemy3", Kind.ENEMY3, "enemy3.png")
            .addHealth(60, 60)
            .addVelocity(0, 20))
        
    def createExplosion():Entity*
        return (
            createEntity("explosion", Kind.EXPLOSION, "explosion.png", 0.6)
            .addSound(getChunk("asplode.wav"))
            .addTint(0xd2, 0xfa, 0xd2, 0xfa)
            .addExpires(0.2)
            .addTween(0.006, 0.6, -3, false, true))

    def createBang():Entity*
        return (
            createEntity("bang", Kind.BANG, "explosion.png", 0.4)
            .addSound(getChunk("smallasplode.wav"))
            .addTint(0xd2, 0xfa, 0xd2, 0xfa)
            .addExpires(0.2)
            .addTween(0.004, 0.4, -3, false, true))

    def createParticle():Entity*
        return (
            createEntity("particlebang", Kind.PARTICLE, "star.png")
            .addTint(0xd2, 0xfa, 0xd2, 0xfa)
            .addExpires(0.75)
            .addVelocity(0, 0))

    def fireBullet(x:int, y:int)
        if cache[Kind.BULLET].is_empty 
            for var i=1 to 10
            cache[Kind.BULLET].add(createBullet())

        var entity = cache[Kind.BULLET].remove_at(0)
        game.addSprite(entity
            .setPos(x, y)
            .setExpires(1.0)
            .setActive(true))

    def fireEnemy1(x:int, y:int) 
        if cache[Kind.ENEMY1].is_empty
            for var i=1 to 10
                cache[Kind.ENEMY1].add(createEnemy1())

        var entity = cache[Kind.ENEMY1].remove_at(0)
        game.addSprite(entity
            .setPos(x, y)
            .setHealth(10, 10)
            .setActive(true))

    def fireEnemy2(x:int, y:int) 
        if cache[Kind.ENEMY2].is_empty
            for var i=1 to 10
                cache[Kind.ENEMY2].add(createEnemy2())

        var entity = cache[Kind.ENEMY2].remove_at(0)
        game.addSprite(entity
            .setPos(x, y)
            .setHealth(20, 20) 
            .setActive(true))

    def fireEnemy3(x:int, y:int) 
        if cache[Kind.ENEMY3].is_empty
            for var i=1 to 10
                cache[Kind.ENEMY3].add(createEnemy3())

        var entity = cache[Kind.ENEMY3].remove_at(0)
        game.addSprite(entity
            .setPos(x, y)
            .setHealth(60, 60)
            .setActive(true))

    def fireExplosion(x:int, y:int)
        if cache[Kind.EXPLOSION].is_empty
            for var i=1 to 10
                cache[Kind.EXPLOSION].add(createExplosion())

        var entity = cache[Kind.EXPLOSION].remove_at(0)
        game.addSprite(entity
            .setBounds(x, y, (int)entity.bounds.w, (int)entity.bounds.h)
            .setTween(0.006, 0.6, -3, false, true)
            .setPos(x, y)
            .setScale(0.6, 0.6)
            .setExpires(0.2)
            .setActive(true))

    def fireBang(x:int, y:int)
        if cache[Kind.BANG].is_empty
            for var i=1 to 10
                cache[Kind.BANG].add(createBang())

        var entity = cache[Kind.BANG].remove_at(0)
        game.addSprite(entity
            .setBounds(x, y, (int)entity.bounds.w, (int)entity.bounds.h)
            .setTween(0.006, 0.4, -3, false, true)
            .setPos(x, y)
            .setScale(0.4, 0.4)
            .setExpires(0.2)
            .setActive(true))

    def fireParticle(x:int, y:int) 
        if cache[Kind.PARTICLE].is_empty
            for var i=1 to 20
                cache[Kind.PARTICLE].add(createParticle())  

        var entity = cache[Kind.PARTICLE].remove_at(0)
        var radians = rand.next_double() * TAU
        var magnitude = rand.int_range(0, 200)
        var velocityX = magnitude * Math.cos(radians)
        var velocityY = magnitude * Math.sin(radians)
        var scale = rand.double_range(0.1, 1.0)

        game.addSprite(entity
            .setBounds(x, y, (int)entity.bounds.w, (int)entity.bounds.h)
            .setPos(x, y)
            .setScale(scale, scale)
            .setVelocity(velocityX, velocityY)
            .setExpires(0.75)
            .setActive(true))


    /**
    * getSurface
    *
    * get image resource from gio resource compiler 
    *
    * @param resource name
    * @return surface
    */
    def getSurface(name:string):Surface 

        var ptr = GLib.resources_lookup_data(@"$URI/images/$name", 0)
        if (ptr == null) 
            logSDLError(@"load resource: $URI/images/$name")
            return null
        else 
            var raw = new SDL.RWops.from_mem((void*)ptr.get_data(), (int)ptr.get_size())
            return SDLImage.load_png(raw)


    /**
    * getChunk
    *
    * get sound resource from gio resource compiler 
    *
    * @param resource name
    * @return chunk
    */
    def getChunk(name:string):Chunk
        var ptr = GLib.resources_lookup_data(@"$URI/sounds/$name", 0)
        if (ptr == null) 
            logSDLError(@"load resource: $URI/sounds/$name")
            return null
        else 
            var raw = new SDL.RWops.from_mem((void*)ptr.get_data(), (int)ptr.get_size())
            return new SDLMixer.Chunk.WAV_RW(raw)



