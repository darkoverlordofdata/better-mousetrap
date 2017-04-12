[indent=4]
uses SDL
uses SDL.Video
uses SDLImage


class CollisionSystem : Object implements ISystem

    game:Game
    factory:Factory

    construct(game:Game, factory:Factory)
        this.game = game
        this.factory = factory

    def execute()
        for var e in game.entity do executeEach(ref e)
    

    def executeEach(ref entity:Entity*)
        if entity.active && (entity.kind == Kind.ENEMY1 || entity.kind == Kind.ENEMY2 || entity.kind == Kind.ENEMY3)
            for var bullet in game.entity
                if bullet.active && bullet.kind == Kind.BULLET
                    if entity.bounds.is_intersecting(bullet.bounds)
                        if entity.active && bullet.active
                            handleCollision(ref entity, ref bullet)
                        return


    def handleCollision(ref a:Entity*, ref b:Entity*)
        factory.fireBang(b.bounds.x, b.bounds.y)
        factory.killEntity(b)
        for var i=0 to 3 do factory.fireParticle(b.bounds.x, b.bounds.y)
        if a.health != null
            var h = a.health.current - 2
            if (h < 0) 
                factory.fireExplosion((int)a.pos.x, (int)a.pos.y)
                factory.killEntity(a)
            else 
                a.health = {h, a.health.maximum}

