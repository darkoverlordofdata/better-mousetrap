/**
 * Entitas Generated Entity & Components for shmupwarz
 *
 * do not edit this file
 */
[indent=4]
namespace entitas

    const BOUNDS:uint64 = 0x0001
    const BULLET:uint64 = 0x0002
    const ENEMY:uint64 = 0x0004
    const EXPIRES:uint64 = 0x0008
    const HEALTH:uint64 = 0x0010
    const LAYER:uint64 = 0x0020
    const POSITION:uint64 = 0x0040
    const SCALE:uint64 = 0x0080
    const SOUND:uint64 = 0x0100
    const SPRITE:uint64 = 0x0200
    const TEXT:uint64 = 0x0400
    const TINT:uint64 = 0x0800
    const TWEEN:uint64 = 0x1000
    const VELOCITY:uint64 = 0x2000
    const ACTIVE:uint64 = 0x8000000000000000

    // const POW2:array of uint64 = {
    //     0x0000,
    //     0x0001,
    //     0x0002,
    //     0x0004,
    //     0x0008,
    //     0x0010,
    //     0x0020,
    //     0x0040,
    //     0x0080,
    //     0x0100,
    //     0x0200,
    //     0x0400,
    //     0x0800,
    //     0x1000,
    //     0x2000
    // }
    /**
    * Components
    */
    const ComponentString: array of string = {
        "CoreComponent",
        "BoundsComponent",
        "BulletComponent",
        "EnemyComponent",
        "ExpiresComponent",
        "HealthComponent",
        "LayerComponent",
        "PositionComponent",
        "ScaleComponent",
        "SoundComponent",
        "SpriteComponent",
        "TextComponent",
        "TintComponent",
        "TweenComponent",
        "VelocityComponent",
        ""
    }

    enum Components
        CoreComponent
        BoundsComponent
        BulletComponent
        EnemyComponent
        ExpiresComponent
        HealthComponent
        LayerComponent
        PositionComponent
        ScaleComponent
        SoundComponent
        SpriteComponent
        TextComponent
        TintComponent
        TweenComponent
        VelocityComponent
        COUNT

    struct Bounds
        x : int 
        y : int 
        w : int 
        h : int 

    struct Bullet
        active : bool

    struct Enemy
        active : bool

    struct Expires
        value : double 

    struct Health
        current : double 
        maximum : double 

    struct Layer
        value : int 

    struct Position
        x : double 
        y : double 

    struct Scale
        x : double 
        y : double 

    struct Sound
        sound : sdx.audio.Sound 

    struct Sprite
        sprite : sdx.graphics.s2d.Sprite 

    struct Text
        text : string 
        sprite : sdx.graphics.s2d.Sprite 

    struct Tint
        r : int 
        g : int 
        b : int 
        a : int 

    struct Tween
        min : double 
        max : double 
        speed : double 
        repeat : bool 
        active : bool 

    struct Velocity
        x : double 
        y : double 

    struct Entity                       /* Core component: */  
        id          : int               /* sequentially assigned id# */
        name        : string            /* display name */
        pool        : int               /* pool entities by type */
        mask        : uint64            /* hasComponent bit array */
        bounds      : Bounds?
        bullet      : Bullet?
        enemy       : Enemy?
        expires     : Expires?
        health      : Health?
        layer       : Layer?
        position    : Position?
        scale       : Scale?
        sound       : Sound?
        sprite      : Sprite?
        text        : Text?
        tint        : Tint?
        tween       : Tween?
        velocity    : Velocity?

        def hasComponent(index : int) : bool
            return (POW2[index] & mask) != 0

        def hasComponents(indices : array of int) : bool
            for var index in indices do if (POW2[index] & mask) == 0 do return false
            return true

        def hasAnyComponent(indices : array of int) : bool
            for var index in indices do if (POW2[index] & mask) != 0 do return true
            return false

        def setId(id:int):Entity*
            this.id = id
            return &this

        def setName(name:string):Entity*
            this.name = name
            return &this

        def setActive(active:bool):Entity*
            if active do mask |= ACTIVE
            else do mask ^= ACTIVE
            return &this

        def setPool(pool:int):Entity*
            this.pool = pool
            return &this

        def isActive():bool
            return (mask & ACTIVE) == ACTIVE

        /**
         * Components:
         */

        def addBounds(x:int,y:int,w:int,h:int):Entity* 
            if (mask & BOUNDS) != 0 do raise new Exception.EntityAlreadyHasComponent("BoundsComponent")
            this.bounds = { x, y, w, h }
            mask |= BOUNDS
            World.onComponentAdded(&this, Components.BoundsComponent)
            return &this

        def setBounds(x:int,y:int,w:int,h:int):Entity*
            if (mask & BOUNDS) == 0 do raise new Exception.EntityDoesNotHaveComponent("BoundsComponent")
            this.bounds.x = x
            this.bounds.y = y
            this.bounds.w = w
            this.bounds.h = h
            return &this

        def removeBounds():Entity*
            if (mask & BOUNDS) == 0 do raise new Exception.EntityDoesNotHaveComponent("BoundsComponent")
            this.bounds = null
            mask ^= BOUNDS
            World.onComponentRemoved(&this, Components.BoundsComponent)
            return &this

        def setBullet(value:bool):Entity*
            if value
                this.bullet = { true }
                mask |= BULLET
                World.onComponentAdded(&this, Components.BulletComponent)
            else
                this.bullet = null
                mask ^= BULLET
                World.onComponentRemoved(&this, Components.BulletComponent)
            return &this

        def isBullet():bool
            if this.bullet == null do return false
            else do return true

        def setEnemy(value:bool):Entity*
            if value
                this.enemy = { true }
                mask |= ENEMY
                World.onComponentAdded(&this, Components.EnemyComponent)
            else
                this.enemy = null
                mask ^= ENEMY
                World.onComponentRemoved(&this, Components.EnemyComponent)
            return &this

        def isEnemy():bool
            if this.enemy == null do return false
            else do return true

        def addExpires(value:double):Entity* 
            if (mask & EXPIRES) != 0 do raise new Exception.EntityAlreadyHasComponent("ExpiresComponent")
            this.expires = { value }
            mask |= EXPIRES
            World.onComponentAdded(&this, Components.ExpiresComponent)
            return &this

        def setExpires(value:double):Entity*
            if (mask & EXPIRES) == 0 do raise new Exception.EntityDoesNotHaveComponent("ExpiresComponent")
            this.expires.value = value
            return &this

        def removeExpires():Entity*
            if (mask & EXPIRES) == 0 do raise new Exception.EntityDoesNotHaveComponent("ExpiresComponent")
            this.expires = null
            mask ^= EXPIRES
            World.onComponentRemoved(&this, Components.ExpiresComponent)
            return &this

        def addHealth(current:double,maximum:double):Entity* 
            if (mask & HEALTH) != 0 do raise new Exception.EntityAlreadyHasComponent("HealthComponent")
            this.health = { current, maximum }
            mask |= HEALTH
            World.onComponentAdded(&this, Components.HealthComponent)
            return &this

        def setHealth(current:double,maximum:double):Entity*
            if (mask & HEALTH) == 0 do raise new Exception.EntityDoesNotHaveComponent("HealthComponent")
            this.health.current = current
            this.health.maximum = maximum
            return &this

        def removeHealth():Entity*
            if (mask & HEALTH) == 0 do raise new Exception.EntityDoesNotHaveComponent("HealthComponent")
            this.health = null
            mask ^= HEALTH
            World.onComponentRemoved(&this, Components.HealthComponent)
            return &this

        def addLayer(value:int):Entity* 
            if (mask & LAYER) != 0 do raise new Exception.EntityAlreadyHasComponent("LayerComponent")
            this.layer = { value }
            mask |= LAYER
            World.onComponentAdded(&this, Components.LayerComponent)
            return &this

        def setLayer(value:int):Entity*
            if (mask & LAYER) == 0 do raise new Exception.EntityDoesNotHaveComponent("LayerComponent")
            this.layer.value = value
            return &this

        def removeLayer():Entity*
            if (mask & LAYER) == 0 do raise new Exception.EntityDoesNotHaveComponent("LayerComponent")
            this.layer = null
            mask ^= LAYER
            World.onComponentRemoved(&this, Components.LayerComponent)
            return &this

        def addPosition(x:double,y:double):Entity* 
            if (mask & POSITION) != 0 do raise new Exception.EntityAlreadyHasComponent("PositionComponent")
            this.position = { x, y }
            mask |= POSITION
            World.onComponentAdded(&this, Components.PositionComponent)
            return &this

        def setPosition(x:double,y:double):Entity*
            if (mask & POSITION) == 0 do raise new Exception.EntityDoesNotHaveComponent("PositionComponent")
            this.position.x = x
            this.position.y = y
            return &this

        def removePosition():Entity*
            if (mask & POSITION) == 0 do raise new Exception.EntityDoesNotHaveComponent("PositionComponent")
            this.position = null
            mask ^= POSITION
            World.onComponentRemoved(&this, Components.PositionComponent)
            return &this

        def addScale(x:double,y:double):Entity* 
            if (mask & SCALE) != 0 do raise new Exception.EntityAlreadyHasComponent("ScaleComponent")
            this.scale = { x, y }
            mask |= SCALE
            World.onComponentAdded(&this, Components.ScaleComponent)
            return &this

        def setScale(x:double,y:double):Entity*
            if (mask & SCALE) == 0 do raise new Exception.EntityDoesNotHaveComponent("ScaleComponent")
            this.scale.x = x
            this.scale.y = y
            return &this

        def removeScale():Entity*
            if (mask & SCALE) == 0 do raise new Exception.EntityDoesNotHaveComponent("ScaleComponent")
            this.scale = null
            mask ^= SCALE
            World.onComponentRemoved(&this, Components.ScaleComponent)
            return &this

        def addSound(sound:sdx.audio.Sound):Entity* 
            if (mask & SOUND) != 0 do raise new Exception.EntityAlreadyHasComponent("SoundComponent")
            this.sound = { sound }
            mask |= SOUND
            World.onComponentAdded(&this, Components.SoundComponent)
            return &this

        def setSound(sound:sdx.audio.Sound):Entity*
            if (mask & SOUND) == 0 do raise new Exception.EntityDoesNotHaveComponent("SoundComponent")
            this.sound.sound = sound
            return &this

        def removeSound():Entity*
            if (mask & SOUND) == 0 do raise new Exception.EntityDoesNotHaveComponent("SoundComponent")
            this.sound = null
            mask ^= SOUND
            World.onComponentRemoved(&this, Components.SoundComponent)
            return &this

        def addSprite(sprite:sdx.graphics.s2d.Sprite):Entity* 
            if (mask & SPRITE) != 0 do raise new Exception.EntityAlreadyHasComponent("SpriteComponent")
            this.sprite = { sprite }
            mask |= SPRITE
            World.onComponentAdded(&this, Components.SpriteComponent)
            return &this

        def setSprite(sprite:sdx.graphics.s2d.Sprite):Entity*
            if (mask & SPRITE) == 0 do raise new Exception.EntityDoesNotHaveComponent("SpriteComponent")
            this.sprite.sprite = sprite
            return &this

        def removeSprite():Entity*
            if (mask & SPRITE) == 0 do raise new Exception.EntityDoesNotHaveComponent("SpriteComponent")
            this.sprite = null
            mask ^= SPRITE
            World.onComponentRemoved(&this, Components.SpriteComponent)
            return &this

        def addText(text:string,sprite:sdx.graphics.s2d.Sprite):Entity* 
            if (mask & TEXT) != 0 do raise new Exception.EntityAlreadyHasComponent("TextComponent")
            this.text = { text, sprite }
            mask |= TEXT
            World.onComponentAdded(&this, Components.TextComponent)
            return &this

        def setText(text:string,sprite:sdx.graphics.s2d.Sprite):Entity*
            if (mask & TEXT) == 0 do raise new Exception.EntityDoesNotHaveComponent("TextComponent")
            this.text.text = text
            this.text.sprite = sprite
            return &this

        def removeText():Entity*
            if (mask & TEXT) == 0 do raise new Exception.EntityDoesNotHaveComponent("TextComponent")
            this.text = null
            mask ^= TEXT
            World.onComponentRemoved(&this, Components.TextComponent)
            return &this

        def addTint(r:int,g:int,b:int,a:int):Entity* 
            if (mask & TINT) != 0 do raise new Exception.EntityAlreadyHasComponent("TintComponent")
            this.tint = { r, g, b, a }
            mask |= TINT
            World.onComponentAdded(&this, Components.TintComponent)
            return &this

        def setTint(r:int,g:int,b:int,a:int):Entity*
            if (mask & TINT) == 0 do raise new Exception.EntityDoesNotHaveComponent("TintComponent")
            this.tint.r = r
            this.tint.g = g
            this.tint.b = b
            this.tint.a = a
            return &this

        def removeTint():Entity*
            if (mask & TINT) == 0 do raise new Exception.EntityDoesNotHaveComponent("TintComponent")
            this.tint = null
            mask ^= TINT
            World.onComponentRemoved(&this, Components.TintComponent)
            return &this

        def addTween(min:double,max:double,speed:double,repeat:bool,active:bool):Entity* 
            if (mask & TWEEN) != 0 do raise new Exception.EntityAlreadyHasComponent("TweenComponent")
            this.tween = { min, max, speed, repeat, active }
            mask |= TWEEN
            World.onComponentAdded(&this, Components.TweenComponent)
            return &this

        def setTween(min:double,max:double,speed:double,repeat:bool,active:bool):Entity*
            if (mask & TWEEN) == 0 do raise new Exception.EntityDoesNotHaveComponent("TweenComponent")
            this.tween.min = min
            this.tween.max = max
            this.tween.speed = speed
            this.tween.repeat = repeat
            this.tween.active = active
            return &this

        def removeTween():Entity*
            if (mask & TWEEN) == 0 do raise new Exception.EntityDoesNotHaveComponent("TweenComponent")
            this.tween = null
            mask ^= TWEEN
            World.onComponentRemoved(&this, Components.TweenComponent)
            return &this

        def addVelocity(x:double,y:double):Entity* 
            if (mask & VELOCITY) != 0 do raise new Exception.EntityAlreadyHasComponent("VelocityComponent")
            this.velocity = { x, y }
            mask |= VELOCITY
            World.onComponentAdded(&this, Components.VelocityComponent)
            return &this

        def setVelocity(x:double,y:double):Entity*
            if (mask & VELOCITY) == 0 do raise new Exception.EntityDoesNotHaveComponent("VelocityComponent")
            this.velocity.x = x
            this.velocity.y = y
            return &this

        def removeVelocity():Entity*
            if (mask & VELOCITY) == 0 do raise new Exception.EntityDoesNotHaveComponent("VelocityComponent")
            this.velocity = null
            mask ^= VELOCITY
            World.onComponentRemoved(&this, Components.VelocityComponent)
            return &this
