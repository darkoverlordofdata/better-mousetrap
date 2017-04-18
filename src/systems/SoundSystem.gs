[indent=4]
uses entitas
uses sdx

namespace demo

    class SoundSystem : Object implements ISystem

        world:World
        game:ShmupWarz
        factory:Factory
        group:Group

        construct(game:ShmupWarz, factory:Factory)
            this.game = game
            this.factory = factory

        def setWorld(world:World)
            this.world = world
            group = world.getGroup(Matcher.AllOf({Components.SoundComponent}))

        def execute()
            for var entity in group.entities 
                if entity.active //&& entity.sound != null
                    entity.sound.play()


