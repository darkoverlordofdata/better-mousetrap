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
            // for var entity in world.entity do executeEach(ref entity)
        
            // def executeEach(ref entity:Entity*)
            // if entity.active && entity.sound != null
            //     SDLMixer.play(-1, entity.sound, 0)
            pass

