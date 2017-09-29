[indent=4]
uses Gee
uses entitas
uses sdx
uses sdx.graphics

namespace demo

    class ShmupWarz : sdx.Application implements ApplicationListener
        profile     : bool = true
        factory     : Factory
        world       : World
        sprites     : list of Entity* = new list of Entity*
        fpsSprite   : private s2d.Sprite

        construct(width: int, height: int, base:string) 
            super(width, height, base)
            defaultFont = "fonts/OpenDyslexic-Bold.otf"
            setApplicationListener(this)
            
        def create()
            world = new World(profile)
            factory = new Factory(world)
            world.add(new SpriteManagerSystem(this, factory)
                ).add(new SpawnSystem(this, factory)
                ).add(new SoundSystem(this, factory)
                ).add(new CollisionSystem(this, factory)
                ).add(new HealthSystem(this, factory)
                ).add(new HudSystem(this, factory)
                ).add(new InputSystem(this, factory)
                ).add(new PhysicsSystem(this, factory)
                ).add(new ExpireSystem(this, factory)
                ).add(new TweenSystem(this, factory)
                ).add(new RemoveSystem(this, factory)
                )
            world.initialize()                
            factory.createBackground()

        def render()
            world.execute(Sdx.graphics.deltaTime)

        /**
         * draw
         *
         * vsync mode 
         */
        def override draw()
            renderer.set_draw_color(0, 0, 0, 0)
            renderer.clear()
            sprites.filter(_isActive).foreach(_drawEach)
            if showFps do drawFps()
            renderer.present()

        def drawFps()
            if fpsSprite != null do fpsSprite = null
            fpsSprite = new s2d.Sprite.text("%2.2f".printf(Sdx.graphics.fps), font, Color.AntiqueWhite)
            fpsSprite.centered = false
            fpsSprite.render(renderer, 0, 0)

        def _isActive(e:Entity*):bool
            return e->isActive()

        def _drawEach(e:Entity*):bool
            if e->hasSprite()
                e->bounds.w = (int)((double)e->sprite.sprite.width * e->scale.x)
                e->bounds.h = (int)((double)e->sprite.sprite.height * e->scale.y)
                if !e->isBackground()
                    e->bounds.x = (int)((double)e->position.x - e->bounds.w / 2)
                    e->bounds.y = (int)((double)e->position.y - e->bounds.h / 2)
                    if e->hasTint()
                        e->sprite.sprite.texture.set_color_mod((uint8)e->tint.r, (uint8)e->tint.g, (uint8)e->tint.b)
                        e->sprite.sprite.texture.set_alpha_mod((uint8)e->tint.a)
                
                renderer.copy(e->sprite.sprite.texture, null, 
                    { e->bounds.x, e->bounds.y, (uint)e->bounds.w, (uint)e->bounds.h })

            if e->hasText()
                renderer.copy(e->text.sprite.texture, null, 
                    { (int)e->position.x, (int)e->position.y, e->text.sprite.width, e->text.sprite.height })

            return true

        def dispose()
            pass
        def pause()
            pass
        def resize(width: int, height: int)
            pass
        def resume()
            pass

