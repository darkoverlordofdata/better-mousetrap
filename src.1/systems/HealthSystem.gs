[indent=4]
uses entitas
uses sdx
//uses sdx.graphics.s2d

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


        def execute()
            sprite:sdx.graphics.s2d.Sprite? = null
        
            for var entity in group.entities do if entity.isActive()
                var position = entity.position
                var health = entity.health
                var text = entity.text
                var pct = "%d%%".printf((int)Math.fmin(100, (double)health.current/(double)health.maximum*100.0))

                if pct == text.text
                    sprite = text.sprite
                    if sprite == null
                        sprite = new sdx.graphics.s2d.Sprite.text(text.text, game.font, sdx.graphics.Color.Lime)
                        sprite.centered = false
                        text.sprite = sprite
                else
                    text.text = pct
                    text.sprite = null
                    sprite = new sdx.graphics.s2d.Sprite.text(text.text, game.font, sdx.graphics.Color.LimeGreen)
                    sprite.centered = false
                    text.sprite = sprite

                sprite.x = (int)position.x
                sprite.y = (int)position.y
                game.onetime.add(sprite)



