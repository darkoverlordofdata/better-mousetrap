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

        def execute()
            for var entity in group.entities
                if entity.active
                    var exp = entity.expires.timer - game.delta
                    entity.expires.timer = exp
                    if (entity.expires.timer < 0) do world.deleteEntity(entity)
