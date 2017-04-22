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


        def initialize()
            pass

        def execute(delta:double)
            for var entity in group.entities do if entity.isActive() 
                entity.position.x += entity.velocity.x * delta
                entity.position.y += entity.velocity.y * delta


