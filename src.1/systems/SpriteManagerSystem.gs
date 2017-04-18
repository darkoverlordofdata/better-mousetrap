[indent=4]
uses entitas
uses sdx
uses sdx.graphics.s2d

namespace demo

    class SpriteManagerSystem : Object implements ISystem, EntityAddedListener, EntityRemovedListener

        world:World
        game:ShmupWarz
        factory:Factory

        construct(game:ShmupWarz, factory:Factory)
            this.game = game
            this.factory = factory
            factory.setEntityAddedListener(this)

        def setWorld(world:World)
            this.world = world
            world.setEntityRemovedListener(this)

        def execute()
            pass
            
        def entityAdded(e:Entity*)
            var zOrder = (int)e.zOrder
            e.sprite.layer = zOrder
            
            if game.views.size == 0
                game.views.add(e)

            else
                var i = 0
                for s in game.views
                    assert(s != null)
                    if zOrder <= (int)s.zOrder
                        game.views.insert(i, e)
                        return
                    else
                        i++
                game.views.add(e)


        def entityRemoved(e:Entity*)
            game.views.remove(e)

