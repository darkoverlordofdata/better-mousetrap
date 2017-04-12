[indent=4]
uses SDL
uses SDL.Video
uses SDLImage


class InputSystem : Object implements ISystem

    game:Game
    factory:Factory
    FireRate    : double = 0.1
    timeToFire  : double = 0.0

    construct(game:Game, factory:Factory)
        this.game = game
        this.factory = factory

    def execute()
        game.player.setPos(game.mouseX, game.mouseY)
        if game.getKey(122) || game.mouseDown
            timeToFire -= game.delta
            if timeToFire < 0.0
                factory.fireBullet((int)game.player.pos.x - 27, (int)game.player.pos.y + 2)
                factory.fireBullet((int)game.player.pos.x + 27, (int)game.player.pos.y + 2)
                timeToFire = FireRate

