[indent=4]
uses entitas
uses sdx

namespace demo

    class RemoveSystem : Object implements ISystem

        world:World
        game:ShmupWarz
        factory:Factory
        group:Group

        construct(game:ShmupWarz, factory:Factory)
            this.game = game
            this.factory = factory

        def setWorld(world:World)
            this.world = world
            group = world.getGroup(Matcher.AllOf({Components.VelocityComponent}))

        def initialize()
            pass

        def execute(delta:double)
            for var entity in group.entities do if entity.isActive()
                case entity.pool
                    when Pool.ENEMY1
                        if entity.position.y > game.height do world.deleteEntity(entity)
                        
                    when Pool.ENEMY2
                        if entity.position.y > game.height do world.deleteEntity(entity)
                        
                    when Pool.ENEMY3
                        if entity.position.y > game.height do world.deleteEntity(entity)
                        
                    when Pool.BULLET
                        if entity.position.y < 0 do world.deleteEntity(entity)

