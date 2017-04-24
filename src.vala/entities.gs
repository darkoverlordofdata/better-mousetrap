[indent=4]
uses entitas
uses sdx
uses sdx.graphics


namespace demo
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


    /** 
    * Entity Factory
    */

    class Factory
        world       : World
        rand        : Rand
        listener    : EntityAddedListener

        // prop readonly atlas: TextureAtlas

        construct(world:World)
            this.world = world
            rand = new Rand()
            // var file = Sdx.files.resource("orig/pack.atlas")
            // assert(file.exists())
            // _atlas = new TextureAtlas.file(file)
            
            world.setPool(256, Pool.Count, {
                Buffer() { pool = Pool.BULLET,      size = 8,   factory = createBullet },
                Buffer() { pool = Pool.ENEMY1,      size = 15,  factory = createEnemy1 },
                Buffer() { pool = Pool.ENEMY2,      size = 5,   factory = createEnemy2 },
                Buffer() { pool = Pool.ENEMY3,      size = 4,   factory = createEnemy3 },
                Buffer() { pool = Pool.EXPLOSION,   size = 10,  factory = createExplosion },
                Buffer() { pool = Pool.BANG,        size = 12,  factory = createBang },
                Buffer() { pool = Pool.PARTICLE,    size = 100, factory = createParticle },
                Buffer() { pool = Pool.HUD,         size = Pool.Count, factory = createHud }
            })

            
        def setEntityAddedListener(listener:EntityAddedListener)
            this.listener = listener
        /**
        * createEntity
        *
        * creates the core entity with builtin components
        *
        * @param name
        * @param pool
        * @param scale
        * @param path
        * @param active
        * @returns entity id 
        */
        def createEntity(name:string, pool:Pool, path:string, scale:double = 1.0, active:bool = false):Entity*
            var sprite = new s2d.Sprite(@"images/$path.png")
            // var sprite = atlas.createSprite(path, -1)
            return (world.createEntity(name, pool, active)
                .addPosition(0, 0)
                .addLayer(pool)
                .addBounds(0, 0, sprite.width, sprite.height)
                .addScale(scale, scale)
                .addSprite(sprite))


        /**
        * createBackground
        *
        * create background entity 
        *
        * @param game
        * @return id
        */
        def createBackground()
            listener.entityAdded(createEntity("background", Pool.BACKGROUND, 
                                    "BackdropBlackLittleSparkBlack", 2.0, true)
                                    .setBackground(true))

        def createPlayer():Entity*
            var player = createEntity("player", Pool.PLAYER, "spaceshipspr", 1.0, true)
            listener.entityAdded(player)
            return player

        def createBullet():Entity*
            return (
                createEntity("bullet", Pool.BULLET, "bullet")
                .addSound(new audio.Sound(Sdx.files.resource("sounds/pew.wav")))
                .addTint(0xd2, 0xfa, 0, 0xfa)
                .addExpires(1.0)
                .addHealth(2, 2)
                .addVelocity(0, -800)
                .setBullet(true))

        def createEnemy1():Entity*
            return (
                createEntity("enemy1", Pool.ENEMY1, "enemy1")
                .addHealth(10, 10)
                .addVelocity(0, 40)
                .addText("100%", new s2d.Sprite.text("100%", Sdx.app.font, Color.Lime))
                .setEnemy1(true))

        def createEnemy2():Entity*
            return (
                createEntity("enemy2", Pool.ENEMY2, "enemy2")
                .addHealth(20, 20)
                .addVelocity(0, 30)
                .addText("100%", new s2d.Sprite.text("100%", Sdx.app.font, Color.Lime))
                .setEnemy2(true))

        def createEnemy3():Entity*
            return (
                createEntity("enemy3", Pool.ENEMY3, "enemy3")
                .addHealth(60, 60)
                .addVelocity(0, 20)
                .addText("100%", new s2d.Sprite.text("100%", Sdx.app.font, Color.Lime))
                .setEnemy3(true))
            
        def createExplosion():Entity*
            return (
                createEntity("explosion", Pool.EXPLOSION, "explosion", 0.6)
                .addSound(new audio.Sound(Sdx.files.resource("sounds/asplode.wav")))
                .addTint(0xd2, 0xfa, 0xd2, 0x7f)
                .addExpires(0.2)
                .addTween(0.006, 0.6, -3, false, true))

        def createBang():Entity*
            return (
                createEntity("bang", Pool.BANG, "explosion", 0.3)
                .addSound(new audio.Sound(Sdx.files.resource("sounds/smallasplode.wav")))
                .addTint(0xd2, 0xfa, 0xd2, 0x9f)
                .addExpires(0.2)
                .addTween(0.003, 0.3, -3, false, true))

        def createParticle():Entity*
            return (
                createEntity("particlebang", Pool.PARTICLE, "star")
                .addTint(0xd2, 0xfa, 0xd2, 0xfa)
                .addExpires(0.75)
                .addVelocity(0, 0))

        def createHud():Entity*
            return (
                world.createEntity("hud", Pool.HUD, false)
                .addPosition(0, 0)
                .addIndex(0)
                .addLayer(Pool.HUD)
                .setHud(true))

        def newHud(index:int, x:int, y:int, text:string)
            if world.cache[Pool.HUD].is_empty 
                world.cache[Pool.HUD].add(createHud())
        
            var entity = world.cache[Pool.HUD].remove_at(0)
            listener.entityAdded(entity
                .setPosition(x, y)
                .setIndex(index)
                .addText(text, new s2d.Sprite.text(text, Sdx.app.font, Color.Bisque))
                .setActive(true))

        def newBullet(x:int, y:int)
            if world.cache[Pool.BULLET].is_empty 
                world.cache[Pool.BULLET].add(createBullet())
                
            var entity = world.cache[Pool.BULLET].remove_at(0)
            listener.entityAdded(entity
                .setPosition(x, y)
                .setExpires(1.0)
                .setActive(true))

        def newEnemy1(x:int, y:int) 
            if world.cache[Pool.ENEMY1].is_empty
                world.cache[Pool.ENEMY1].add(createEnemy1())

            var entity = world.cache[Pool.ENEMY1].remove_at(0)
            listener.entityAdded(entity
                .setPosition(x, y)
                .setHealth(10, 10)
                .setActive(true))

        def newEnemy2(x:int, y:int) 
            if world.cache[Pool.ENEMY2].is_empty
                world.cache[Pool.ENEMY2].add(createEnemy2())

            var entity = world.cache[Pool.ENEMY2].remove_at(0)
            listener.entityAdded(entity
                .setPosition(x, y)
                .setHealth(20, 20) 
                .setActive(true))

        def newEnemy3(x:int, y:int) 
            if world.cache[Pool.ENEMY3].is_empty
                world.cache[Pool.ENEMY3].add(createEnemy3())

            var entity = world.cache[Pool.ENEMY3].remove_at(0)
            listener.entityAdded(entity
                .setPosition(x, y)
                .setHealth(60, 60)
                .setActive(true))

        def newExplosion(x:int, y:int)
            if world.cache[Pool.EXPLOSION].is_empty
                world.cache[Pool.EXPLOSION].add(createExplosion())

            var entity = world.cache[Pool.EXPLOSION].remove_at(0)
            listener.entityAdded(entity
                .setBounds(x, y, (int)entity.bounds.w, (int)entity.bounds.h)
                .setTween(0.006, 0.6, -3, false, true)
                .setPosition(x, y)
                .setScale(0.6, 0.6)
                .setExpires(0.2)
                .setActive(true))

        def newBang(x:int, y:int)
            if world.cache[Pool.BANG].is_empty
                world.cache[Pool.BANG].add(createBang())

            var entity = world.cache[Pool.BANG].remove_at(0)
            listener.entityAdded(entity
                .setBounds(x, y, (int)entity.bounds.w, (int)entity.bounds.h)
                .setTween(0.003, 0.3, -3, false, true)
                .setPosition(x, y)
                .setScale(0.3, 0.3)
                .setExpires(0.2)
                .setActive(true))

        def newParticle(x:int, y:int) 
            if world.cache[Pool.PARTICLE].is_empty
                world.cache[Pool.PARTICLE].add(createParticle())  

            var entity = world.cache[Pool.PARTICLE].remove_at(0)
            var radians = rand.next_double() * TAU
            var magnitude = rand.int_range(0, 200)
            var velocityX = magnitude * Math.cos(radians)
            var velocityY = magnitude * Math.sin(radians)
            var scale = rand.double_range(0.1, 1.0)

            listener.entityAdded(entity
                .setBounds(x, y, (int)entity.bounds.w, (int)entity.bounds.h)
                .setPosition(x, y)
                .setScale(scale, scale)
                .setVelocity(velocityX, velocityY)
                .setExpires(0.75)
                .setActive(true))

