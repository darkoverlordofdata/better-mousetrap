[indent=4]
uses entitas
uses sdx
uses sdx.graphics

namespace demo

    class HealthSystem : Object implements ISystem

        world:World
        game:ShmupWarz
        factory:Factory
        group:Group

        construct(game:ShmupWarz, factory:Factory)
            this.game = game
            this.factory = factory

        def setWorld(world:World)
            this.world = world
            group = world.getGroup(Matcher.AllOf({
                Components.HealthComponent, 
                Components.TextComponent
            }))


        def initialize()
            pass

        def execute(delta:double)
            for var entity in group.entities do if entity.isActive()
                var pct = "%d%%".printf((int)Math.fmin(100, (double)entity.health.current/(double)entity.health.maximum*100.0))

                if pct != entity.text.text
                    entity.text.text = pct
                    entity.text.sprite.setText(pct, Sdx.app.font, Color.LimeGreen)
                    entity.text.sprite.x = (int)entity.position.x
                    entity.text.sprite.y = (int)entity.position.y


