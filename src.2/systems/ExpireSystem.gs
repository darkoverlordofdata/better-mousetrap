[indent=4]
uses SDL
uses SDL.Video
uses SDLImage

namespace demo

    class ExpireSystem : Object implements ISystem

        world:World
        game:Basic
        factory:Factory

        construct(game:Basic, factory:Factory)
            this.game = game
            this.factory = factory

        def setWorld(world:World)
            this.world = world

        def execute()
            for var entity in world.entity do executeEach(ref entity)

        def executeEach(ref entity:Entity*)
            if entity.active && entity.hasExpires()
                var exp = entity.expires.timer - game.delta
                entity.expires.timer = exp
                if (entity.expires.timer < 0) do world.deleteEntity(entity)
