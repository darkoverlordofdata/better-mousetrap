[indent=4]
uses sdx.audio
uses sdx.graphics.s2d

/**
 * to be generated by entitas
 */
namespace entitas

    enum Components
        CoreComponent
        BulletComponent
        EnemyComponent
        ExpiresComponent
        HealthComponent
        SoundComponent
        TintComponent
        TweenComponent
        VelocityComponent


    const ComponentString:array of string = {
        "CoreComponent",
        "BulletComponent",
        "EnemyComponent",
        "ExpiresComponent",
        "HealthComponent",
        "SoundComponent",
        "TintComponent",
        "TweenComponent",
        "VelocityComponent"
    }



    [SimpleType]
    struct Point2d // builtin
        x   : double
        y   : double

        def add(v:Vector2d):Point2d
            return { x+v.x, y+v.y }

        def sub(v:Vector2d):Point2d
            return { x-v.x, y-v.y }

    [SimpleType]
    struct Vector2d // builtin
        x   : double
        y   : double

        def mul(f:double):Vector2d
            return { x*f, y*f }

        def div(f:double):Vector2d
            return { x/f, y/f }

        def len():double
            return Math.sqrt(x*x + y*y)

    [SimpleType]
    struct Scale 
        x   : double
        y   : double

    [SimpleType]
    struct Color 
        r   : int
        g   : int
        b   : int
        a   : int

    [SimpleType]
    struct Health 
        current : int
        maximum : int

    [SimpleType]
    struct Duration 
        timer   : double

    [SimpleType]
    struct IsA 
        entity  : bool

    [SimpleType]
    struct Tween 
        min     : double
        max     : double
        speed   : double
        repeat  : bool
        active  : bool



    struct Entity 
                                        /* Core component: */  
        id          : int               /* sequentially assigned id# */
        name        : string            /* display name */
        active      : bool              /* active=true inactive=false*/
        pool        : int               /* pool entities by type */
        pos         : Point2d           /* display at cartesian location */
        layer       : int               /* display at layer (zOrder) */
        bounds      : SDL.Video.Rect    /* current screen location  */
        scale       : Vector2d          /* display scale */
        sprite      : Sprite            /* graphic display object */
                                        /* user defined components:  */

        donotuse    : bool              /* has[0] - unused */
        has         : bool[1]           /* has component flags */
        hasBullet   : bool              /* has[1] */
        hasEnemy    : bool              /* has[2] */
        hasExpires  : bool              /* has[3] */
        hasHealth   : bool              /* has[4] */
        hasSound    : bool              /* has[5] */
        hasTint     : bool              /* has[6] */
        hasTween    : bool              /* has[7] */
        hasVelocity : bool              /* has[8] */
        
        bullet      : IsA?              /* isBullet == true? */
        enemy       : IsA?              /* isEnemy == true? */
        expires     : Duration?         /* count of ms until timeout */
        health      : Health?           /* scoring */
        sound       : Sound?            /* audio object */
        tint        : Color?            /* rgba color struct */
        tween       : Tween?            /* animation values */
        velocity    : Vector2d?         /* speed */

        def hasComponent(index : int) : bool
            return has[index]

        def hasComponents(indices : array of int) : bool
            for var index in indices do if !has[index] do return false
            return true

        def hasAnyComponent(indices : array of int) : bool
            for var index in indices do if has[index] do return true
            return false

        /* core component */

        def setId(id:int):Entity*
            this.id = id
            return &this

        def setName(name:string):Entity*
            this.name = name
            return &this

        def setActive(active:bool):Entity*
            this.active = active
            return &this

        def setPool(pool:int):Entity*
            this.pool = pool
            return &this

        def setPos(x:int, y:int):Entity*
            pos.x = x
            pos.y = y
            return &this
            
        def setLayer(z:int):Entity*
            this.layer = z
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

        def setSprite(sprite:sdx.graphics.s2d.Sprite):Entity*
            this.sprite = sprite
            return &this

        /* user defined components */

        def setBullet(value:bool):Entity*
            if value
                this.bullet = { true }
                hasBullet = true
                World.onComponentAdded(&this, Components.BulletComponent)
            else
                this.bullet = null
                hasBullet = false
                World.onComponentRemoved(&this, Components.BulletComponent)
            return &this

        def isBullet():bool
            if this.bullet == null do return false
            else do return true

        def setEnemy(value:bool):Entity*
            if value
                this.enemy = { true }
                hasEnemy = true
                World.onComponentAdded(&this, Components.EnemyComponent)
            else
                this.enemy = null
                hasEnemy = false
                World.onComponentRemoved(&this, Components.EnemyComponent)
            return &this

        def isEnemy():bool
            if this.enemy == null do return false
            else do return true

        def addSound(sound:sdx.audio.Sound):Entity*
            if hasSound do raise new Exception.EntityAlreadyHasComponent("effect")
            this.sound = sound
            hasSound = true
            World.onComponentAdded(&this, Components.SoundComponent)
            return &this

        def setSound(sound:sdx.audio.Sound):Entity*
            if !hasSound do raise new Exception.EntityDoesNotHaveComponent("effect")
            this.sound = sound
            return &this

        def removeSound():Entity*
            if !hasSound do raise new Exception.EntityDoesNotHaveComponent("effect")
            this.sound = null
            hasSound = false
            World.onComponentRemoved(&this, Components.SoundComponent)
            return &this

        def addTint(r:int, g:int, b:int, a:int):Entity*
            if hasTint do raise new Exception.EntityAlreadyHasComponent("tint")
            this.tint = { r, g, b, a }
            hasTint = true
            World.onComponentAdded(&this, Components.TintComponent)
            return &this
            
        def setTint(r:int, g:int, b:int, a:int):Entity*
            if !hasTint do raise new Exception.EntityDoesNotHaveComponent("tint")
            this.tint.r = r
            this.tint.g = g
            this.tint.b = b
            this.tint.a = a 
            return &this
            
        def removeTint():Entity*
            if !hasTint do raise new Exception.EntityDoesNotHaveComponent("tint")
            this.tint = null
            hasTint = false
            World.onComponentRemoved(&this, Components.TintComponent)
            return &this

        def addExpires(timer:double):Entity*
            if hasExpires do raise new Exception.EntityAlreadyHasComponent("expires")
            this.expires = { timer }
            hasExpires = true
            World.onComponentAdded(&this, Components.ExpiresComponent)
            return &this

        def setExpires(timer:double):Entity*
            if !hasExpires do raise new Exception.EntityDoesNotHaveComponent("expires")
            this.expires.timer = timer
            return &this

        def removeExpires():Entity*
            if !hasExpires do raise new Exception.EntityDoesNotHaveComponent("expires")
            this.expires = null
            hasExpires = false
            World.onComponentRemoved(&this, Components.ExpiresComponent)
            return &this

        def addHealth(current:int, maximum:int):Entity*
            if hasHealth do raise new Exception.EntityAlreadyHasComponent("health")
            this.health = { current, maximum }
            hasHealth = true
            World.onComponentAdded(&this, Components.HealthComponent)
            return &this

        def setHealth(current:int, maximum:int):Entity*
            if !hasHealth do raise new Exception.EntityDoesNotHaveComponent("health")
            this.health.current = current
            this.health.maximum = maximum
            return &this

        def removeHealth():Entity*
            if !hasHealth do raise new Exception.EntityDoesNotHaveComponent("health")
            this.health = null
            hasHealth = false
            World.onComponentRemoved(&this, Components.HealthComponent)
            return &this

        def addTween(min:double, max:double, speed:double, repeat:bool, active:bool):Entity*
            if hasTween do raise new Exception.EntityAlreadyHasComponent("tween")
            this.tween = { min, max, speed, repeat, active }
            hasTween = true
            World.onComponentAdded(&this, Components.TweenComponent)
            return &this

        def setTween(min:double, max:double, speed:double, repeat:bool, active:bool):Entity*
            if !hasTween do raise new Exception.EntityDoesNotHaveComponent("tween")
            this.tween.min = min
            this.tween.max = max
            this.tween.speed = speed
            this.tween.repeat = repeat
            this.tween.active = active
            return &this

        def removeTween():Entity*
            if !hasTween do raise new Exception.EntityDoesNotHaveComponent("tween")
            this.tween = null
            hasTween = false
            World.onComponentRemoved(&this, Components.TweenComponent)
            return &this

        def addVelocity(x:double, y:double):Entity*
            if hasVelocity do raise new Exception.EntityAlreadyHasComponent("velocity")
            this.velocity = { x, y }
            hasVelocity = true
            World.onComponentAdded(&this, Components.VelocityComponent)
            return &this

        def setVelocity(x:double, y:double):Entity*
            if !hasVelocity do raise new Exception.EntityDoesNotHaveComponent("velocity")
            this.velocity.x = x
            this.velocity.y = y
            return &this

        def removeVelocity():Entity*
            if !hasVelocity do raise new Exception.EntityDoesNotHaveComponent("velocity")
            this.velocity = null
            hasVelocity = false
            World.onComponentRemoved(&this, Components.VelocityComponent)
            return &this


