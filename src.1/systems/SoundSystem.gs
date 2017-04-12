[indent=4]
uses SDL
uses SDL.Video
uses SDLImage


class SoundSystem : Object implements ISystem

    game:Game
    factory:Factory

    construct(game:Game, factory:Factory)
        this.game = game
        this.factory = factory

    def execute()
        for var entity in game.entity do executeEach(ref entity)
    
    def executeEach(ref entity:Entity*)
        if entity.active && entity.sound != null
            SDLMixer.play(-1, entity.sound.effect, 0)


