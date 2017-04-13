[indent=4]
namespace demo

    exception Ecs 
        EntityAlreadyHasComponent
        EntityDoesNotHaveComponent

    [SimpleType]
    struct Point2d 
        x       : double
        y       : double

        def add(v:Vector2d):Point2d
            return { x+v.x, y+v.y }
        def sub(v:Vector2d):Point2d
            return { x-v.x, y-v.y }

    [SimpleType]
    struct Vector2d
        x       : double
        y       : double

        def mul(f:double):Vector2d
            return { x*f, y*f }
        def div(f:double):Vector2d
            return { x/f, y/f }
        def len():double
            return Math.sqrt(x*x + y*y)

    [SimpleType]
    struct Scale 
        x       : double
        y       : double

    [SimpleType]
    struct Color 
        r       : int
        g       : int
        b       : int
        a       : int

    [SimpleType]
    struct Health 
        current : int
        maximum : int

    [SimpleType]
    struct Duration 
        timer   : double

    [SimpleType]
    struct Tween 
        min     : double
        max     : double
        speed   : double
        repeat  : bool
        active  : bool

    [SimpleType]
    struct Sound 
        effect  : SDLMixer.Chunk*

    [SimpleType]
    struct Sprite 
        texture : SDL.Video.Texture* 
        width   : int
        height  : int

    struct Entity 
        /* Core components: */
        id      : int
        name    : string
        active  : bool
        kind    : Kind
        pos     : Point2d
        bounds  : SDL.Video.Rect
        scale   : Vector2d
        sprite  : Sprite

        /* user defined components: */
        sound   : Sound? 
        tint    : Color?
        expires : Duration?
        health  : Health?
        tween   : Tween?
        velocity: Vector2d?

        def setId(id:int):Entity*
            this.id = id
            return &this

        def setName(name:string):Entity*
            this.name = name
            return &this

        def setActive(active:bool):Entity*
            this.active = active
            return &this

        def setKind(kind:Kind):Entity*
            this.kind = kind
            return &this

        def setPos(x:int, y:int):Entity*
            pos.x = x
            pos.y = y
            return &this
            
        def setBounds(x:int, y:int, w:int, h:int):Entity*
            bounds.x = x
            bounds.y = y
            bounds.h = h
            bounds.w = w
            return &this

        def setScale(x:double, y:double):Entity*
            scale.x = x
            scale.y = y
            return &this

        def setSprite(texture:SDL.Video.Texture*, width:int, height:int):Entity*
            sprite.texture = texture
            sprite.width = width
            sprite.height = height
            return &this

        def hasSound():bool
            return sound != null

        def addSound(effect:SDLMixer.Chunk*):Entity*
            if sound != null do raise new Ecs.EntityAlreadyHasComponent("effect")
            this.sound = { effect }
            return &this

        def setSound(effect:SDLMixer.Chunk*):Entity*
            if sound == null do raise new Ecs.EntityDoesNotHaveComponent("effect")
            this.sound.effect = effect
            return &this

        def hasTint():bool
            return tint != null

        def addTint(r:int, g:int, b:int, a:int):Entity*
            if tint != null do raise new Ecs.EntityAlreadyHasComponent("tint")
            this.tint = { r, g, b, a }
            return &this
            
        def setTint(r:int, g:int, b:int, a:int):Entity*
            if tint == null do raise new Ecs.EntityDoesNotHaveComponent("tint")
            this.tint.r = r
            this.tint.g = g
            this.tint.b = b
            this.tint.a = a 
            return &this
            
        def hasExpires():bool
            return expires != null
            
        def addExpires(timer:double):Entity*
            if expires != null do raise new Ecs.EntityAlreadyHasComponent("expires")
            this.expires = { timer }
            return &this

        def setExpires(timer:double):Entity*
            if expires == null do raise new Ecs.EntityDoesNotHaveComponent("expires")
            this.expires.timer = timer
            return &this

        def hasHealth():bool
            return health != null
            
        def addHealth(current:int, maximum:int):Entity*
            if health != null do raise new Ecs.EntityAlreadyHasComponent("health")
            this.health = { current, maximum }
            return &this

        def setHealth(current:int, maximum:int):Entity*
            if health == null do raise new Ecs.EntityDoesNotHaveComponent("health")
            this.health.current = current
            this.health.maximum = maximum
            return &this

        def hasTween():bool
            return tween != null
            
        def addTween(min:double, max:double, speed:double, repeat:bool, active:bool):Entity*
            if tween != null do raise new Ecs.EntityAlreadyHasComponent("tween")
            this.tween = { min, max, speed, repeat, active }
            return &this

        def setTween(min:double, max:double, speed:double, repeat:bool, active:bool):Entity*
            if tween == null do raise new Ecs.EntityDoesNotHaveComponent("tween")
            this.tween.min = min
            this.tween.max = max
            this.tween.speed = speed
            this.tween.repeat = repeat
            this.tween.active = active
            return &this

        def hasVelocity():bool
            return velocity != null
            
        def addVelocity(x:double, y:double):Entity*
            if velocity != null do raise new Ecs.EntityAlreadyHasComponent("velocity")
            this.velocity = { x, y }
            return &this

        def setVelocity(x:double, y:double):Entity*
            if velocity == null do raise new Ecs.EntityDoesNotHaveComponent("velocity")
            this.velocity.x = x
            this.velocity.y = y
            return &this
