[indent=4]
uses SDL
uses SDL.Video
uses SDLImage
uses sdx.graphics.s2d

namespace demo

    class SpriteManagerSystem : Object implements ISystem, EntityAddedListener, EntityRemovedListener

        world:World
        game:Basic
        factory:Factory

        construct(game:Basic, factory:Factory)
            this.game = game
            this.factory = factory
            factory.setEntityAddedListener(this)

        def setWorld(world:World)
            this.world = world
            world.setEntityRemovedListener(this)

        def execute()
            pass
            
        def entityAdded(e:Entity*)
            var rank = (int)e.kind
            assert(e.sprite != null)
            e.sprite.layer = rank
            
            if game.views.size == 0
                game.views.add(e)

            else
                var i = 0
                for s in game.views
                    assert(s != null)
                    if rank <= (int)s.kind
                        game.views.insert(i, e)
                        return
                    else
                        i++
                game.views.add(e)


        def entityRemoved(e:Entity*)
            game.views.remove(e)

