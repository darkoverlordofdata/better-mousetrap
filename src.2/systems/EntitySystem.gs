[indent=4]
uses SDL
uses SDL.Video
uses SDLImage
uses sdx.graphics.s2d

namespace demo

    class EntitySystem : Object implements ISystem
    
        world:World
        game:Basic
        factory:Factory

        construct(game:Basic, factory:Factory)
            this.game = game
            this.factory = factory

        def setWorld(world:World)
            this.world = world

        def execute()
            for var entity in world.entity do executeEach(ref entity)
        
        def executeEach(ref entity:Entity*)
            if entity.active 
                var texture = entity.sprite.texture
                texture.x = (int)entity.pos.x
                texture.y = (int)entity.pos.y
                texture.scale.x = (int)entity.scale.x
                texture.scale.y = (int)entity.scale.y
                if entity.tint != null
                    texture.color.r = (uint8)entity.tint.r
                    texture.color.g = (uint8)entity.tint.g
                    texture.color.b = (uint8)entity.tint.b
                    texture.color.a = (uint8)entity.tint.a
                entity.bounds.w = (int)((double)entity.sprite.width * entity.scale.x)
                entity.bounds.h = (int)((double)entity.sprite.height * entity.scale.y)
                entity.bounds.x = (int)((double)entity.pos.x - entity.bounds.w / 2)
                entity.bounds.y = (int)((double)entity.pos.y - entity.bounds.h / 2)

