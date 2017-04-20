[indent=4]
uses Gee
uses entitas
uses sdx
// uses sdx.graphics.s2d

namespace demo


    class ShmupWarz : sdx.Application implements ApplicationListener
        k           : int
        t           : double
        t1          : double = 0.0
        t2          : double = 0.0
        t3          : double = 0.0
        profile     : bool = true
        delta       : double 
        factory     : Factory
        world       : World
        sprites     : list of Entity* = new list of Entity*
        onetime     : list of sdx.graphics.s2d.Sprite = new list of sdx.graphics.s2d.Sprite
        fpsSprite   : private sdx.graphics.s2d.Sprite

        construct(width: int, height: int, base:string) 
            super(width, height, base)
            defaultFont = "fonts/OpenDyslexic-Bold.otf"
            setApplicationListener(this)
            
        def create()
            world = new World()
            factory = new Factory(world)
            world.add(new SpriteManagerSystem(this, factory)
                ).add(new SpawnSystem(this, factory)
                // ).add(new SoundSystem(this, factory)
                ).add(new CollisionSystem(this, factory)
                // ).add(new HealthSystem(this, factory)
                ).add(new InputSystem(this, factory)
                ).add(new PhysicsSystem(this, factory)
                ).add(new ExpireSystem(this, factory)
                ).add(new TweenSystem(this, factory)
                ).add(new RemoveSystem(this, factory)
                )
            factory.createBackground()

                
        def render()
            var freq = SDL.Timer.get_performance_frequency()
            delta = Sdx.graphics.deltaTime
            if profile do t1 = (double)SDL.Timer.get_performance_counter()/freq
            world.execute()
            if profile
                t2 = (double)SDL.Timer.get_performance_counter()/freq
                t3 = t2 - t1
                t = t + t3
                k += 1
                if k == 1000
                    k = 0
                    t = t / 1000.0
                    print "%f", t
                    t = 0

        /**
         * draw
         *
         * vsync mode 
         */
        def override draw()
            if showFps
                if fpsSprite != null do fpsSprite = null
                fpsSprite = new sdx.graphics.s2d.Sprite.text("%2.2f".printf(Sdx.graphics.fps), font, sdx.graphics.Color.AntiqueWhite)
                fpsSprite.centered = false
            renderer.set_draw_color(0, 0, 0, 0)
            renderer.clear()
            sprites.filter(_isActive).foreach(_drawEach)
            if showFps && fpsSprite != null do fpsSprite.render(this.renderer, 0, 0)
            for var sprite in onetime do sprite.render(this.renderer, sprite.x, sprite.y)
            onetime.clear() 
            renderer.present()

        def _isActive(e:Entity*):bool
            return e->isActive()

        def _drawEach(e:Entity*):bool
            e->bounds.w = (int)((double)e->sprite.sprite.width * e->scale.x)
            e->bounds.h = (int)((double)e->sprite.sprite.height * e->scale.y)
            if e->pool != Pool.BACKGROUND
                e->bounds.x = (int)((double)e->position.x - e->bounds.w / 2)
                e->bounds.y = (int)((double)e->position.y - e->bounds.h / 2)
                if e->tint != null
                    e->sprite.sprite.texture.set_color_mod((uint8)e->tint.r, (uint8)e->tint.g, (uint8)e->tint.b)
                    e->sprite.sprite.texture.set_alpha_mod((uint8)e->tint.a)
                
            renderer.copy(e->sprite.sprite.texture, null, { e->bounds.x, e->bounds.y, (uint)e->bounds.w, (uint)e->bounds.h })
            return true


        def dispose()
            pass
        def pause()
            pass
        def resize(width: int, height: int)
            pass
        def resume()
            pass

