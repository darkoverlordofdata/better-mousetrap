[indent=4]
uses entitas
uses sdx

namespace demo

    class CollisionSystem : Object implements ISystem

        world:World
        game:ShmupWarz
        factory:Factory
        bullets:Group
        enemies:Group

        construct(game:ShmupWarz, factory:Factory)
            this.game = game
            this.factory = factory

        def setWorld(world:World)
            this.world = world
            bullets = world.getGroup(Matcher.AllOf({Components.BulletComponent}))
            enemies = world.getGroup(Matcher.AllOf({Components.EnemyComponent}))

        def execute()
            for var enemy in enemies.entities
                if enemy.active
                    for var bullet in bullets.entities
                        if bullet.active
                            if enemy.bounds.is_intersecting(bullet.bounds)
                                if enemy.active && bullet.active
                                    handleCollision(ref enemy, ref bullet)
                                return



        def handleCollision(ref a:Entity*, ref b:Entity*)
            var x = (int)((double)b.pos.x - b.bounds.w / 2)
            var y = (int)((double)b.pos.y - b.bounds.h / 2)
            factory.newBang(x, y)
            world.deleteEntity(b)
            for var i=0 to 3
                factory.newParticle(x, y)
            if a.health != null
                var h = a.health.current - 2
                if (h < 0) 
                    factory.newExplosion((int)a.pos.x, (int)a.pos.y)
                    world.deleteEntity(a)
                else 
                    a.health = {h, a.health.maximum}

