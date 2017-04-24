[indent=4]
uses entitas
uses sdx

namespace demo

    class ExpireSystem : Object implements ISystem

        world:World
        game:ShmupWarz
        factory:Factory
        group:Group

        construct(game:ShmupWarz, factory:Factory)
            this.game = game
            this.factory = factory

        def setWorld(world:World)
            this.world = world
            group = world.getGroup(Matcher.AllOf({Components.ExpiresComponent}))


        def initialize()
            pass

        def execute(delta:double)
            for var entity in group.entities do if entity.isActive()
                var exp = entity.expires.value - delta
                entity.expires.value = exp
                if (entity.expires.value < 0) do world.deleteEntity(entity)
