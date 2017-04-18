[indent=4]
uses entitas
uses sdx

namespace demo

    class PhysicsSystem : Object implements ISystem

        world:World
        game:ShmupWarz
        factory:Factory
        group:Group

        construct(game:ShmupWarz, factory:Factory)
            this.game = game
            this.factory = factory


        def setWorld(world:World)
            group = world.getGroup(Matcher.AllOf({Components.VelocityComponent}))

        def execute()
            for var entity in group.entities 
                if entity.active 
                    entity.pos = entity.pos.add(entity.velocity.mul(game.delta))
                    // entity.pos.x += entity.velocity.x * game.delta
                    // entity.pos.y += entity.velocity.y * game.delta


