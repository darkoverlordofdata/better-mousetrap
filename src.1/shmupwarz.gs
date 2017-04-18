[indent=4]
uses entitas
uses sdx
uses sdx.graphics.s2d

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
        views       : list of Entity* = new list of Entity*

        construct(width: int, height: int, base:string) 
            super(width, height, base)
            defaultFont = "fonts/OpenDyslexic-Bold.otf"
            setApplicationListener(this)
            
        def create()
            world = new World()
            factory = new Factory(world)
            world.add(new SpriteManagerSystem(this, factory)
                ).add(new SpawnSystem(this, factory)
                ).add(new CollisionSystem(this, factory)
                ).add(new InputSystem(this, factory)
                ).add(new PhysicsSystem(this, factory)
                ).add(new ExpireSystem(this, factory)
                ).add(new TweenSystem(this, factory)
                ).add(new RemoveSystem(this, factory)
                )
            factory.createBackground()
                
        def render()
            delta = Sdx.graphics.deltaTime
            if profile do t1 = (double)GLib.get_real_time()/1000000.0
            world.execute()
            if profile
                t2 = (double)GLib.get_real_time()/1000000.0
                t3 = t2 - t1
                t = t + t3
                k += 1
                if k == 1000
                    k = 0
                    t = t / 1000.0
                    print "%f", t
                    t = 0

        def override draw()
            renderer.set_draw_color(0x0, 0x0, 0x0, 0x00)
            renderer.clear()
            for var e in views do if e.active do drawEach(ref e)
            renderer.present()

        def private drawEach(ref e:Entity*)
            e.bounds.w = (int)((double)e.sprite.width * e.scale.x)
            e.bounds.h = (int)((double)e.sprite.height * e.scale.y)
            if (e.pool != Pool.BACKGROUND) 
                e.bounds.x = (int)((double)e.pos.x - e.bounds.w / 2)
                e.bounds.y = (int)((double)e.pos.y - e.bounds.h / 2)
                if e.tint != null
                    e.sprite.texture.set_color_mod((uint8)e.tint.r, (uint8)e.tint.g, (uint8)e.tint.b)
                    e.sprite.texture.set_alpha_mod((uint8)e.tint.a)
                
            renderer.copy(e.sprite.texture, null, e.bounds)

        def dispose()
            pass
        def pause()
            pass
        def resize(width: int, height: int)
            pass
        def resume()
            pass

