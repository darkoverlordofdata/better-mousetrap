[indent=4]
uses SDL
uses SDL.Video
uses SDLImage

namespace demo

    class PhysicsSystem : Object implements ISystem

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
            if entity.active && entity.hasVelocity()
                entity.pos = entity.pos.add(entity.velocity.mul(game.delta))
                // entity.pos.x += entity.velocity.x * game.delta
                // entity.pos.y += entity.velocity.y * game.delta


