[indent=4]
uses SDL
uses SDL.Video
uses SDLImage

namespace demo

    class CollisionSystem : Object implements ISystem

        world:World
        game:Game
        factory:Factory

        construct(game:Game, factory:Factory)
            this.game = game
            this.factory = factory

        def setWorld(world:World)
            this.world = world

        def execute()
            for var e in world.entity do executeEach(ref e)
        
        def executeEach(ref entity:Entity*)
            if entity.active && (entity.kind == Kind.ENEMY1 || entity.kind == Kind.ENEMY2 || entity.kind == Kind.ENEMY3)
                for var bullet in world.entity
                    if bullet.active && bullet.kind == Kind.BULLET
                        if entity.bounds.is_intersecting(bullet.bounds)
                            if entity.active && bullet.active
                                handleCollision(ref entity, ref bullet)
                            return


        def handleCollision(ref a:Entity*, ref b:Entity*)
            factory.newBang(b.bounds.x, b.bounds.y)
            world.deleteEntity(b)
            for var i=0 to 3 do factory.newParticle(b.bounds.x, b.bounds.y)
            if a.health != null
                var h = a.health.current - 2
                if (h < 0) 
                    factory.newExplosion((int)a.pos.x, (int)a.pos.y)
                    world.deleteEntity(a)
                else 
                    a.health = {h, a.health.maximum}

