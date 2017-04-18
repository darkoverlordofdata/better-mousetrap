[indent=4]
uses entitas
uses sdx

namespace demo

    class TweenSystem : Object implements ISystem

        world:World
        game:ShmupWarz
        factory:Factory
        group:Group

        construct(game:ShmupWarz, factory:Factory)
            this.game = game
            this.factory = factory

        def setWorld(world:World)
            this.world = world
            group = world.getGroup(Matcher.AllOf({Components.TweenComponent}))

        def execute()
            for var entity in group.entities 
            // for var entity in world.entity do executeEach(ref entity)

            // def executeEach(ref entity:Entity*)
                if entity.active && entity.hasTween()
                    var x = entity.scale.x + (entity.tween.speed * game.delta)
                    var y = entity.scale.y + (entity.tween.speed * game.delta)
                    var active = entity.tween.active

                    if x > entity.tween.max 
                        x = entity.tween.max
                        y = entity.tween.max
                        active = false
                    else if x < entity.tween.min
                        x = entity.tween.min
                        y = entity.tween.min
                        active = false
                    
                    entity.scale.x = x 
                    entity.scale.y = y 
                    entity.tween.active = active 

