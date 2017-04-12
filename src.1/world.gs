[indent=4]
uses SDL
uses SDL.Video
uses SDLMixer

delegate FactoryFunc():Entity*
struct Config
    kind: Kind
    size: int
    alloc: FactoryFunc

class World
    id: static int = 0

    systems     : list of ISystem = new list of ISystem
    game        : Game
    factory     : Factory

    construct(game:Game, factory:Factory)
        this.game = game
        this.factory = factory

    def add(system: ISystem):World
        systems.add(system)
        return this

    def execute()
        factory.getEntities(game.entity)
        for var sys in systems do sys.execute()            

