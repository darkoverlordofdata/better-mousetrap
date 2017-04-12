[indent=4]
uses SDL
uses SDL.Video
uses SDLImage

namespace demo

    class SoundSystem : Object implements ISystem

        world:World
        game:Game
        factory:Factory

        construct(game:Game, factory:Factory)
            this.game = game
            this.factory = factory

        def setWorld(world:World)
            this.world = world

        def execute()
            for var entity in world.entity do executeEach(ref entity)
        
        def executeEach(ref entity:Entity*)
            if entity.active && entity.sound != null
                SDLMixer.play(-1, entity.sound.effect, 0)


