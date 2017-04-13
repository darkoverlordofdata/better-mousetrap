[indent=4]
uses SDL
uses SDL.Video
uses SDLImage

namespace demo

    class InputSystem : Object implements ISystem

        world:World
        game:Game
        factory:Factory
        FireRate    : double = 0.1
        timeToFire  : double = 0.0

        construct(game:Game, factory:Factory)
            this.game = game
            this.factory = factory
            //Sdx.input.setInputProcessor(this)

        def setWorld(world:World)
            this.world = world

        def execute()
            factory.player.setPos(game.mouseX, game.mouseY)
            if game.getKey(122) || game.mouseDown
                timeToFire -= game.delta
                if timeToFire < 0.0
                    factory.newBullet((int)factory.player.pos.x - 27, (int)factory.player.pos.y + 2)
                    factory.newBullet((int)factory.player.pos.x + 27, (int)factory.player.pos.y + 2)
                    timeToFire = FireRate

