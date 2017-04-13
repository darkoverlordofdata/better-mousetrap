[indent=4]
uses SDL
uses SDL.Video
uses SDLMixer

namespace demo

    delegate FactoryFunc():Entity*
    struct Config
        kind: Kind
        size: int
        alloc: FactoryFunc

    interface ISystem: Object
        def abstract setWorld(world:World)
        def abstract execute()

    interface IEntityRemoved : Object
        def abstract entityRemoved(e:Entity*)

    interface ISpriteManager: Object
        def abstract addSprite(e:Entity*)
        def abstract createTexture(surface:SDL.Video.Surface):SDL.Video.Texture

    class World

        pool        : array of Entity
        cache       : array of list of Entity* 
        systems     : list of ISystem = new list of ISystem
        entity      : list of Entity* = new list of Entity*
        listener    : IEntityRemoved
        id          : private int = 0

        construct(listener:IEntityRemoved)
            setEntityRemovedListener((IEntityRemoved)listener)

        def setPool(size:int, config: array of Config)
            pool = new array of Entity[size]
            cache = new array of list of Entity*[Kind.Count]
            for var i=0 to (Kind.Count-1) do cache[i] = new list of Entity*
            for var i=0 to (config.length)
                for var k=1 to (config[i].size)  
                    cache[config[i].kind].add(config[i].alloc())
        

        def setEntityRemovedListener(listener:IEntityRemoved)
            this.listener = listener

        def createEntity():Entity*
            var id = this.id++
            return pool[id].setId(id)

        def deleteEntity(entity:Entity*)
            entity.active = false
            listener.entityRemoved(entity)
            cache[entity.kind].add(entity)

        def add(system: ISystem):World
            system.setWorld(this)
            systems.add(system)
            return this

        def execute()
            entity.clear()
            for var i = 0 to (this.id-1) do if pool[i].active do entity.add(&pool[i])
            for var sys in systems do sys.execute()            


