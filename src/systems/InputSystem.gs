[indent=4]
uses entitas
uses sdx

namespace demo

    class InputSystem : Object implements ISystem, InputProcessor

        world:World
        game:ShmupWarz
        factory:Factory
        player      : Entity*
        FireRate    : double = 0.1
        timeToFire  : double = 0.0
        shoot       : bool
        mouseX      : int
        mouseY      : int
        scale       : double = 1.0

        construct(game:ShmupWarz, factory:Factory)
            this.game = game
            this.factory = factory
            Sdx.input.setInputProcessor(this)

        def setWorld(world:World)
            this.world = world
            player = factory.createPlayer()

        def initialize()
            pass

        def execute(delta:double)
            player.setPosition(mouseX, mouseY)
            if shoot do timeToFire -= delta
            if timeToFire < 0.0
                factory.newBullet((int)player.position.x - 27, (int)player.position.y + 2)
                factory.newBullet((int)player.position.x + 27, (int)player.position.y + 2)
                timeToFire = FireRate


        def moveTo(x: int, y: int)
            mouseX = (int)((double)x/scale)
            mouseY = (int)((double)y/scale)

        def keyDown(keycode: int): bool
            if sdx.Input.Keys.z == keycode do shoot = true
            return true

        def keyUp(keycode: int): bool
            if sdx.Input.Keys.z == keycode do shoot = false
            return true
            
        def keyTyped(character: char): bool
            return false
            
        def touchDown(screenX: int, screenY: int, pointer: int, button: int): bool
            moveTo(screenX, screenY)
            shoot = true
            return false
            
        def touchUp(screenX: int, screenY: int, pointer: int, button: int): bool
            shoot = false
            return true
            
        def touchDragged(screenX: int, screenY: int, pointer: int): bool
            moveTo(screenX, screenY)
            return false
            
        def mouseMoved(screenX: int, screenY: int): bool
            moveTo(screenX, screenY)
            return false
            
        def scrolled(amount: int): bool
            return false
            


