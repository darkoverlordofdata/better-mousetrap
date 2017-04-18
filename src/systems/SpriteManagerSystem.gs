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
            var layer = (int)e.layer
            e.sprite.layer = layer
            
            if game.sprites.size == 0
                game.sprites.add(e)

            else
                var i = 0
                for s in game.sprites
                    assert(s != null)
                    if layer <= (int)s.layer
                        game.sprites.insert(i, e)
                        return
                    else
                        i++
                game.sprites.add(e)


        def entityRemoved(e:Entity*)
            game.sprites.remove(e)

