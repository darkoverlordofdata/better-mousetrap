[indent=4]
uses SDL
uses SDL.Video
uses SDLImage

namespace demo

    class RemoveSystem : Object implements ISystem

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
            if entity.active
                case entity.kind
                    when Kind.ENEMY1
                        if entity.pos.y > game.height do world.deleteEntity(entity)
                        
                    when Kind.ENEMY2
                        if entity.pos.y > game.height do world.deleteEntity(entity)
                        
                    when Kind.ENEMY3
                        if entity.pos.y > game.height do world.deleteEntity(entity)
                        
                    when Kind.BULLET
                        if entity.pos.y < 0 do world.deleteEntity(entity)

