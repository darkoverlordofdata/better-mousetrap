[indent=4]
uses SDL
uses SDL.Video

const URI           : string = "/darkoverlordofdata/shmupwarz"

class Game : Object

    title       : string
    width       : int = 0 
    height      : int = 0
    fps         : int = 0
    mouseX      : int = 0
    mouseY      : int = 0
    mouseDown   : bool = false
    delta       : double = 0.0
    player      : Entity*
    window      : unowned Window
    renderer    : unowned Renderer
    evt         : private SDL.Event
    keys        : array of uint8 = new array of uint8[255]
    sprites     : list of Entity* = new list of Entity*
    entity      : list of Entity* = new list of Entity*
    factory     : Factory
    world       : World

    prop readonly isRunning:bool
    
    construct(title:string, width:int, height:int, window:Window, renderer:Renderer)
        this.title = title
        this.width = width
        this.height = height
        this.window = window
        this.renderer = renderer

    /**
     * addSprite
     *
     * sort into kind enum ranking for layer display order
     *
     * @param entity to add
     */
    def addSprite(e:Entity*)
        var rank = (int)e.kind
        if sprites.size == 0 do sprites.add(e)
        else
            var i = 0
            for s in sprites
                if rank <= (int)s.kind
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
        factory = new Factory(this, 256)
        world = new World(this, factory)
        addSprite(factory.createBackground())
        addSprite(player = factory.createPlayer())
        world.add(new SpawnSystem(this, factory)
        ).add(new CollisionSystem(this, factory)
        ).add(new InputSystem(this, factory)
        ).add(new PhysicsSystem(this, factory)
        ).add(new ExpireSystem(this, factory)
        ).add(new TweenSystem(this, factory)
        ).add(new RemoveSystem(this, factory))
            //new SoundSystem(this)
        _isRunning = true

    /**
     * stop
     */
    def stop()
        _isRunning = false
        
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
        if (e.kind != Kind.BACKGROUND) 
            e.bounds.w = (int)((double)e.sprite.width * e.scale.x)
            e.bounds.h = (int)((double)e.sprite.height * e.scale.y)
            e.bounds.x = (int)((double)e.pos.x - e.bounds.w / 2)
            e.bounds.y = (int)((double)e.pos.y - e.bounds.h / 2)
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
        for var e in sprites do if (e.active) do drawSprite(ref e)
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
        world.execute()


