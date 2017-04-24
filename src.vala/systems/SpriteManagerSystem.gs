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

        def initialize()
            pass

        def execute(delta:double)
            pass
            
        def entityAdded(e:Entity*)
            if !e.hasSprite() // just add it to the end of the list
                game.sprites.add(e)
                return
                
            var layer = (int)e.layer.value
            e.sprite.sprite.layer = layer
            
            if game.sprites.size == 0
                game.sprites.add(e)

            else
                var i = 0
                for s in game.sprites
                    assert(s != null)
                    if layer <= (int)s.layer.value
                        game.sprites.insert(i, e)
                        return
                    else
                        i++
                game.sprites.add(e)


        def entityRemoved(e:Entity*)
            game.sprites.remove(e)

