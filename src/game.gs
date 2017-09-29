[indent=4]
uses SDL
uses SDL.Video

const COUNT_OF_BULLET: int = 12
const COUNT_OF_ENEMY1: int = 15
const COUNT_OF_ENEMY2: int = 5
const COUNT_OF_ENEMY3: int = 4
const COUNT_OF_EXPLOSION: int = 10
const COUNT_OF_BANG: int = 12
const COUNT_OF_PARTICLE: int = 100

class Game : Object

    title       : string
    width       : int = 0 
    height      : int = 0
    fps         : int = 0
    mouseX      : int = 0
    mouseY      : int = 0
    mouseDown   : bool = false
    delta       : double = 0.0
    FireRate    : double = 0.1
    timeToFire  : double = 0.0
    enemyT1     : double = 1.0
    enemyT2     : double = 4.0
    enemyT3     : double = 6.0
    rand        : Rand
    player      : Entity*
    window      : unowned Window
    renderer    : unowned Renderer
    evt         : private SDL.Event
    pool        : array of Entity
    keys        : array of uint8 = new array of uint8[255]
    sprites     : list of Entity* = new list of Entity*
    entity      : list of Entity* = new list of Entity*
    unused      : list of Entity* = new list of Entity*

                /* new entity queues */    
    bullets     : list of Point2d? = new list of Point2d?
    enemies1    : list of Point2d? = new list of Point2d?
    enemies2    : list of Point2d? = new list of Point2d?
    enemies3    : list of Point2d? = new list of Point2d?
    explosions  : list of Point2d? = new list of Point2d?
    bangs       : list of Point2d? = new list of Point2d?
    particles   : list of Point2d? = new list of Point2d?
    missing     : Metrics = Metrics(0,0,0,0,0,0,0,0)


    prop readonly unSatisfied:int 
        get
            return (bullets.size
                    +enemies1.size
                    +enemies2.size
                    +enemies3.size
                    +explosions.size
                    +bangs.size
                    +particles.size)

    prop readonly isRunning:bool
        
    construct(title:string, width:int, height:int, window:Window, renderer:Renderer)
        this.title = title
        this.width = width
        this.height = height
        this.window = window
        this.renderer = renderer
        rand = new Rand()

    /**
     * initialize the entity database
     */
    def init()
        pool = new array of Entity[256]
        addSprite(createBackground(this, pool))
        addSprite(player = createPlayer(this, pool))

        for var i=1 to COUNT_OF_BULLET do createBullet(this, pool)
        for var i=1 to COUNT_OF_ENEMY1 do createEnemy1(this, pool)
        for var i=1 to COUNT_OF_ENEMY2 do createEnemy2(this, pool)
        for var i=1 to COUNT_OF_ENEMY3 do createEnemy3(this, pool)
        for var i=1 to COUNT_OF_EXPLOSION do createExplosion(this, pool)
        for var i=1 to COUNT_OF_BANG do createBang(this, pool)
        for var i=1 to COUNT_OF_PARTICLE do createParticle(this, pool)

    /**
     * addSprite
     *
     * sort into actor enum ranking for layer display order
     *
     * @param entity to add
     */
    def addSprite(e:Entity*)
        var rank = (int)e.actor.isA
        if sprites.size == 0 do sprites.add(e)
        else
            var i = 0
            for s in sprites
                if rank <= (int)s.actor.isA
                    sprites.insert(i, e)
                    return
                else
                    i++
            sprites.add(e)

    /**
     * removeSprite
     *
     * @param entity to remove
     */
    def removeSprite(e:Entity*)
        sprites.remove(e)

    /**
     * start
     */
    def start()
        init()
        _isRunning = true

    /**
     * stop
     */
    def stop()
        _isRunning = false
        if missing.count > 0
            print "====== Missing ======"
            print "bullet: %d", missing.bullet
            print "enemy1: %d", missing.enemy1
            print "enemy2: %d", missing.enemy2
            print "enemy3: %d", missing.enemy3
            print "explosion: %d", missing.explosion
            print "bang: %d", missing.bang
            print "particle: %d", missing.particle
        
    /**
     * getKey
     *
     * @param key to get
     * @returns bool true if key is pressed
     */
    def getKey(key:int):bool
        if key<256 do return keys[key] == 1
        return false
        
    /**
     * drawSprite
     *
     * @param entity to draw
     */
    def private drawSprite(ref e:Entity*)
        if (e.style.isA != Category.BACKGROUND) 
            e.bounds.w = (int)((double)e.sprite.width * e.scale.x)
            e.bounds.h = (int)((double)e.sprite.height * e.scale.y)
            e.bounds.x = (int)((double)e.position.x - e.bounds.w / 2)
            e.bounds.y = (int)((double)e.position.y - e.bounds.h / 2)
            if e.tint != null
                e.sprite.texture->set_color_mod((uint8)e.tint.r, (uint8)e.tint.g, (uint8)e.tint.b)
            
        renderer.copy(e.sprite.texture, null, e.bounds)

    /**
     * draw the frame
     *
     * @param fps - frames per second
     * @param avg - average time consumed per frame
     */
    def draw(fps:int, avg:double)
        renderer.set_draw_color(0x0, 0x0, 0x0, 0x0)
        renderer.clear()
        for var e in sprites do if (e.active.active) do drawSprite(ref e)
        renderer.present()
        
    /**
     * handleEvents
     */
    def handleEvents()
        while SDL.Event.poll(out evt) != 0
            case evt.type
            
                when  SDL.EventType.KEYDOWN
                    if evt.key.keysym.sym <= 255
                        keys[evt.key.keysym.sym] = 1

                when  SDL.EventType.KEYUP
                    if evt.key.keysym.sym <= 255
                        keys[evt.key.keysym.sym] = 0

                when  SDL.EventType.MOUSEMOTION
                    mouseX = evt.motion.x
                    mouseY = evt.motion.y

                when  SDL.EventType.MOUSEBUTTONDOWN
                    mouseDown = true

                when  SDL.EventType.MOUSEBUTTONUP
                    mouseDown = false

                when SDL.EventType.QUIT
                    stop()
        
    /**
     * update
     *
     * @param delta time
     */
    def update(delta:double)
        this.delta = delta
        /** create enemies */
        spawnSystem(this, ref player)

        /** do battle, kill lots of entities */
        for var e in entity do collisionSystem(this, ref e)

        /** satisfy factory requests */
        for var e in unused do factorySystem(this, ref e)

        if unSatisfied > 0 do updateMetrics()

        /** Now for the game logic: */
        inputSystem(this, ref player)
        for var e in entity do physicsSystem(this, ref e)
        for var e in entity do expireSystem(this, ref e)
        for var e in entity do tweenSystem(this, ref e)
        for var e in entity do removeSystem(this, ref e)

    /**
     * refresh the entity database pointers
     */
    def refresh()
        entity.clear()
        unused.clear()
        for var i = 0 to (Factory.id-1)
            if pool[i].active.active do entity.add(&pool[i])
            else do unused.add(&pool[i])

    def updateMetrics(abort:bool=true)
        if unSatisfied > missing.count do missing.count = unSatisfied
        if bullets.size > 0     do if bullets.size > missing.bullet do missing.bullet = bullets.size
        if enemies1.size > 0    do if enemies1.size > missing.enemy1 do missing.enemy1 = enemies1.size
        if enemies2.size > 0    do if enemies2.size > missing.enemy2 do missing.enemy2 = enemies2.size
        if enemies3.size > 0    do if enemies3.size > missing.enemy3 do missing.enemy3 = enemies3.size
        if explosions.size > 0  do if explosions.size > missing.explosion do missing.explosion = explosions.size
        if bangs.size > 0       do if bangs.size > missing.bang do missing.bang = bangs.size
        if particles.size > 0   do if particles.size > missing.particle do missing.particle = particles.size
