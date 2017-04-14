[indent=4]
uses sdx
uses sdx.graphics.s2d

namespace demo
    const TAU: double = 2.0 * Math.PI

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

    class Factory
        world       : World
        rand        : Rand
        listener    : EntityAddedListener

        prop readonly atlas: TextureAtlas

        construct(world:World)
            this.world = world
            rand = new Rand()
            // var file = Sdx.files.resource("orig/pack.atlas")
            // assert(file.exists())
            // _atlas = new TextureAtlas.file(file)
            
            world.setPool(256, {
                Config() { kind = Kind.BULLET,      size = 12,  alloc = createBullet },
                Config() { kind = Kind.ENEMY1,      size = 15,  alloc = createEnemy1 },
                Config() { kind = Kind.ENEMY2,      size = 5,   alloc = createEnemy2 },
                Config() { kind = Kind.ENEMY3,      size = 4,   alloc = createEnemy3 },
                Config() { kind = Kind.EXPLOSION,   size = 10,  alloc = createExplosion },
                Config() { kind = Kind.BANG,        size = 12,  alloc = createBang },
                Config() { kind = Kind.PARTICLE,    size = 100, alloc = createParticle }
            })


        def setEntityAddedListener(listener:EntityAddedListener)
            this.listener = listener
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
            var sprite = new sdx.graphics.s2d.Sprite(@"images/$path.png")
            // var sprite = atlas.createSprite(path, -1)
            return (world.createEntity()
                .setName(name)
                .setActive(active)
                .setKind(kind)
                .setPos(0, 0)
                .setBounds(0, 0, sprite.width, sprite.height)
                .setScale(scale, scale)
                .setSprite(sprite, sprite.width, sprite.height))


        /**
        * createBackground
        *
        * create background entity 
        *
        * @param game
        * @return id
        */
        def createBackground()
            var b = createEntity("background", Kind.BACKGROUND, "BackdropBlackLittleSparkBlack", 2.0, true)
            //b.sprite.texture.centered = false
            // print "(%d,%d)", b.sprite.texture.height, b.sprite.texture.width 
            listener.entityAdded(b)

        def createPlayer():Entity*
            var player = createEntity("player", Kind.PLAYER, "spaceshipspr", 1.0, true)
            listener.entityAdded(player)
            return player

        def createBullet():Entity*
            return (
                createEntity("bullet", Kind.BULLET, "bullet")
                //.addSound(getChunk("pew.wav"))
                .addTint(0xd2, 0xfa, 0, 0xfa)
                .addExpires(1.0)
                .addHealth(2, 2)
                .addVelocity(0, -800))

        def createEnemy1():Entity*
            return (
                createEntity("enemy1", Kind.ENEMY1, "enemy1")
                .addHealth(10, 10)
                .addVelocity(0, 40))

        def createEnemy2():Entity*
            return (
                createEntity("enemy2", Kind.ENEMY2, "enemy2")
                .addHealth(20, 20)
                .addVelocity(0, 30))

        def createEnemy3():Entity*
            return (
                createEntity("enemy3", Kind.ENEMY3, "enemy3")
                .addHealth(60, 60)
                .addVelocity(0, 20))
            
        def createExplosion():Entity*
            return (
                createEntity("explosion", Kind.EXPLOSION, "explosion", 0.6)
                //.addSound(getChunk("asplode.wav"))
                .addTint(0xd2, 0xfa, 0xd2, 0x7f)
                .addExpires(0.2)
                .addTween(0.006, 0.6, -3, false, true))

        def createBang():Entity*
            return (
                createEntity("bang", Kind.BANG, "explosion", 0.3)
                //.addSound(getChunk("smallasplode.wav"))
                .addTint(0xd2, 0xfa, 0xd2, 0x9f)
                .addExpires(0.2)
                .addTween(0.003, 0.3, -3, false, true))

        def createParticle():Entity*
            return (
                createEntity("particlebang", Kind.PARTICLE, "star")
                .addTint(0xd2, 0xfa, 0xd2, 0xfa)
                .addExpires(0.75)
                .addVelocity(0, 0))

        def newBullet(x:int, y:int)
            if world.cache[Kind.BULLET].is_empty 
                for var i=1 to 10 do world.cache[Kind.BULLET].add(createBullet())
            var entity = world.cache[Kind.BULLET].remove_at(0)
            listener.entityAdded(entity
                .setPos(x, y)
                .setExpires(1.0)
                .setActive(true))

        def newEnemy1(x:int, y:int) 
            if world.cache[Kind.ENEMY1].is_empty
                for var i=1 to 10 do world.cache[Kind.ENEMY1].add(createEnemy1())

            var entity = world.cache[Kind.ENEMY1].remove_at(0)
            listener.entityAdded(entity
                .setPos(x, y)
                .setHealth(10, 10)
                .setActive(true))

        def newEnemy2(x:int, y:int) 
            if world.cache[Kind.ENEMY2].is_empty
                for var i=1 to 10 do world.cache[Kind.ENEMY2].add(createEnemy2())

            var entity = world.cache[Kind.ENEMY2].remove_at(0)
            listener.entityAdded(entity
                .setPos(x, y)
                .setHealth(20, 20) 
                .setActive(true))

        def newEnemy3(x:int, y:int) 
            if world.cache[Kind.ENEMY3].is_empty
                for var i=1 to 10 do world.cache[Kind.ENEMY3].add(createEnemy3())

            var entity = world.cache[Kind.ENEMY3].remove_at(0)
            listener.entityAdded(entity
                .setPos(x, y)
                .setHealth(60, 60)
                .setActive(true))

        def newExplosion(x:int, y:int)
            if world.cache[Kind.EXPLOSION].is_empty
                for var i=1 to 10 do world.cache[Kind.EXPLOSION].add(createExplosion())

            var entity = world.cache[Kind.EXPLOSION].remove_at(0)
            listener.entityAdded(entity
                .setBounds(x, y, (int)entity.bounds.w, (int)entity.bounds.h)
                .setTween(0.006, 0.6, -3, false, true)
                .setPos(x, y)
                .setScale(0.6, 0.6)
                .setExpires(0.2)
                .setActive(true))

        def newBang(x:int, y:int)
            if world.cache[Kind.BANG].is_empty
                for var i=1 to 10 do world.cache[Kind.BANG].add(createBang())

            var entity = world.cache[Kind.BANG].remove_at(0)
            listener.entityAdded(entity
                .setBounds(x, y, (int)entity.bounds.w, (int)entity.bounds.h)
                .setTween(0.003, 0.3, -3, false, true)
                .setPos(x, y)
                .setScale(0.3, 0.3)
                .setExpires(0.2)
                .setActive(true))

        def newParticle(x:int, y:int) 
            if world.cache[Kind.PARTICLE].is_empty
                for var i=1 to 20 do world.cache[Kind.PARTICLE].add(createParticle())  

            var entity = world.cache[Kind.PARTICLE].remove_at(0)
            var radians = rand.next_double() * TAU
            var magnitude = rand.int_range(0, 200)
            var velocityX = magnitude * Math.cos(radians)
            var velocityY = magnitude * Math.sin(radians)
            var scale = rand.double_range(0.1, 1.0)

            listener.entityAdded(entity
                .setBounds(x, y, (int)entity.bounds.w, (int)entity.bounds.h)
                .setPos(x, y)
                .setScale(scale, scale)
                .setVelocity(velocityX, velocityY)
                .setExpires(0.75)
                .setActive(true))

