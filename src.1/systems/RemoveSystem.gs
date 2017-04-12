[indent=4]
uses SDL
uses SDL.Video
uses SDLImage


class RemoveSystem : Object implements ISystem

    game:Game
    factory:Factory

    construct(game:Game, factory:Factory)
        this.game = game
        this.factory = factory

    def execute()
        for var entity in game.entity do executeEach(ref entity)

    def executeEach(ref entity:Entity*)
        if entity.active
            case entity.kind
                when Kind.ENEMY1
                    if entity.pos.y > game.height do factory.killEntity(entity)
                    
                when Kind.ENEMY2
                    if entity.pos.y > game.height do factory.killEntity(entity)
                    
                when Kind.ENEMY3
                    if entity.pos.y > game.height do factory.killEntity(entity)
                    
                when Kind.BULLET
                    if entity.pos.y < 0 do factory.killEntity(entity)

