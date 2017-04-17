[indent=4]
uses SDL
uses SDL.Video

namespace demo

    const URI : string = "/darkoverlordofdata/shmupwarz"

    class ShmupWarz : Game implements IEntityRemoved, ISpriteManager

        factory     : Factory
        world       : World
        sprites     : list of Entity* = new list of Entity*

        construct(title:string, width:int, height:int, window:Window, renderer:Renderer)
            super(window, renderer)
            this.title = title
            this.width = width
            this.height = height

        /**
        * start
        */
        def start()
            super.start()
            world = new World(this)
            factory = new Factory(this, world)
            addSprite(factory.createPlayer())
            addSprite(factory.createBackground())
            world.add(new SpawnSystem(this, factory)
                ).add(new CollisionSystem(this, factory)
                ).add(new InputSystem(this, factory)
                ).add(new PhysicsSystem(this, factory)
                ).add(new ExpireSystem(this, factory)
                ).add(new TweenSystem(this, factory)
                ).add(new RemoveSystem(this, factory)
                //.add(new SoundSystem(this, factory)
            )

            
        def createTexture(surface:SDL.Video.Surface):SDL.Video.Texture
            return SDL.Video.Texture.create_from_surface(renderer, surface)
            
        def entityRemoved(e:Entity*)
            sprites.remove(e)
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
        // def removeSprite(e:Entity*)
        //     sprites.remove(e)

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
        def override draw(fps:int, avg:double)
            renderer.set_draw_color(0x0, 0x0, 0x0, 0x0)
            renderer.clear()
            for var e in sprites do if (e.active) do drawSprite(ref e)
            renderer.present()
            
            
        /**
        * update
        *
        * @param delta time
        */
        def override update(delta:double)
            this.delta = delta
            world.execute()


