[indent=4]
uses SDL
uses SDL.Video
uses SDLImage


class PhysicsSystem : Object implements ISystem

    game:Game
    factory:Factory

    construct(game:Game, factory:Factory)
        this.game = game
        this.factory = factory


    def execute()
        for var entity in game.entity do executeEach(ref entity)
    
    def executeEach(ref entity:Entity*)
        if entity.active && entity.hasVelocity()
            entity.pos = entity.pos.add(entity.velocity.mul(game.delta))
            // entity.pos.x += entity.velocity.x * game.delta
            // entity.pos.y += entity.velocity.y * game.delta

