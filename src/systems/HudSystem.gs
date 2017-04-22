[indent=4]
uses sdx
uses sdx.graphics.s2d
uses entitas


namespace demo

    class HudSystem : Object implements ISystem

        const desc: array of string = {
            "Bullet:          %3d/%3d",
            "Enemy1:       %3d/%3d",
            "Enemy2:       %3d/%3d",
            "Enemy3:       %3d/%3d",
            "Explosion:     %3d/%3d",
            "Bang:           %3d/%3d",
            "Particle:       %3d/%3d"
        }

        world:World
        game:ShmupWarz
        factory:Factory
        group:Group

        construct(game:ShmupWarz, factory:Factory)
            this.game = game
            this.factory = factory

        def setWorld(world:World)
            group = world.getGroup(new Matcher({
                (Matcher)Matcher.NoneOf({ Components.SpriteComponent }),
                (Matcher)Matcher.AllOf({ Components.TextComponent, Components.IndexComponent })
            }))
            this.world = world

        def initialize()
            factory.newHud(Pool.BULLET,     0, 300, desc[0].printf(0, 0))
            factory.newHud(Pool.ENEMY1,     0, 320, desc[1].printf(0, 0))
            factory.newHud(Pool.ENEMY2,     0, 340, desc[2].printf(0, 0))
            factory.newHud(Pool.ENEMY3,     0, 360, desc[3].printf(0, 0))
            factory.newHud(Pool.EXPLOSION,  0, 380, desc[4].printf(0, 0))
            factory.newHud(Pool.BANG,       0, 400, desc[5].printf(0, 0))
            factory.newHud(Pool.PARTICLE,   0, 420, desc[6].printf(0, 0))

        def execute(delta:double)
            var i=0
            for var e in group.entities
                e.text.sprite.setText(desc[i++].printf(world.cache[e.index.value].size, world.bufsiz[e.index.value]),
                    Sdx.app.font, sdx.graphics.Color.Bisque)


