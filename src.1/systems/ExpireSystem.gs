[indent=4]
uses SDL
uses SDL.Video
uses SDLImage


class ExpireSystem : Object implements ISystem

    game:Game
    factory:Factory

    construct(game:Game, factory:Factory)
        this.game = game
        this.factory = factory

    def execute()
        for var entity in game.entity do executeEach(ref entity)

    def executeEach(ref entity:Entity*)
        if entity.active && entity.hasExpires()
            var exp = entity.expires.timer - game.delta
            entity.expires.timer = exp
            if (entity.expires.timer < 0) do factory.killEntity(entity)
