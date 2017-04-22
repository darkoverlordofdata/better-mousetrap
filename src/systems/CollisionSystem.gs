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
            bullets = world.getGroup(Matcher.AllOf({ Components.BulletComponent }))
            enemies = world.getGroup(Matcher.AnyOf({
                Components.Enemy1Component, 
                Components.Enemy2Component, 
                Components.Enemy3Component
            }))

        def initialize()
            pass

        def execute(delta:double)
            for var enemy in enemies.entities do if enemy.isActive()
                for var bullet in bullets.entities do if bullet.isActive()
                    if intersects(ref enemy.bounds, ref bullet.bounds)
                        handleCollision(ref enemy, ref bullet)
                        return


        def intersects(ref r1:Bounds, ref r2:Bounds):bool 
            return ((r1.x < r2.x + r2.w) && 
                    (r1.x + r1.w > r2.x) && 
                    (r1.y < r2.y + r2.h) && 
                    (r1.y + r1.h > r2.y)) 
        

        def handleCollision(ref a:Entity*, ref b:Entity*)
            var x = (int)((double)b.position.x - b.bounds.w / 2)
            var y = (int)((double)b.position.y - b.bounds.h / 2)
            factory.newBang(x, y)
            world.deleteEntity(b)
            for var i=0 to 3 do factory.newParticle(x, y)
            if a.health != null
                var current = a.health.current - 2
                if current < 0
                    factory.newExplosion((int)a.position.x, (int)a.position.y)
                    world.deleteEntity(a)
                else 
                    a.health.current = current

