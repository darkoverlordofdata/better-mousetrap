[indent=4]
uses SDL
uses SDL.Video
uses SDLImage

/**
 * inputSystem
 *
 * process user input
 *
 * @param game
 * @param entity
 */
def inputSystem(game:Game, ref entity:Entity*)
    if entity.active && entity.actor == Actor.PLAYER
        entity.position.x = game.mouseX
        entity.position.y = game.mouseY
        if game.getKey(122) || game.mouseDown
            game.timeToFire -= game.delta
            if game.timeToFire < 0.0
                game.bullets.add({entity.position.x - 27, entity.position.y + 2})
                game.bullets.add({entity.position.x + 27, entity.position.y + 2})
                game.timeToFire = game.FireRate
        
/**
 * soundSystem
 *
 * play sound effect
 *
 * @param game
 * @param entity
 */
def soundSystem(game:Game, ref entity:Entity)
    if entity.active && entity.sound != null
        SDLMixer.play(-1, entity.sound.effect, 0)

/**
 * physicsSystem
 *
 * update movement
 *
 * @param game
 * @param entity
 */
def physicsSystem(game:Game, ref entity:Entity*)
    if entity.active && entity.velocity != null
        entity.position.x += entity.velocity.x * game.delta
        entity.position.y += entity.velocity.y * game.delta

/**
 * expireSystem
 *
 * deactivate entities on timeout
 *
 * @param game
 * @param entity
 */
def expireSystem(game:Game, ref entity:Entity*)
    if entity.active && entity.expires != null
        var exp = entity.expires.timer - game.delta
        entity.expires.timer = exp
        if (entity.expires.timer < 0) 
            entity.active = false
            game.removeSprite(entity)
 
/**
 * tweenSystem
 *
 * do animations
 *
 * @param game
 * @param entity
 */
def tweenSystem(game:Game, ref entity:Entity*)
    if entity.active && entity.tween != null
        var x = entity.scale.x + (entity.tween.speed * game.delta)
        var y = entity.scale.y + (entity.tween.speed * game.delta)
        var active = entity.tween.active

        if x > entity.tween.max 
            x = entity.tween.max
            y = entity.tween.max
            active = false
        else if x < entity.tween.min
            x = entity.tween.min
            y = entity.tween.min
            active = false
        
        entity.scale.x = x 
        entity.scale.y = y 
        entity.tween.active = active 

/**
 * removeSystem
 *
 * deactivate entities when they leave the screen
 *
 * @param game
 * @param entity
 */
def removeSystem(game:Game, ref entity:Entity*)
    if entity.active
        case entity.category
            when Category.ENEMY
                if (entity.position.y > game.height) 
                    entity.active = false
                    game.removeSprite(entity)
                
            when Category.BULLET
                if (entity.position.y < 0) 
                    entity.active = false
                    game.removeSprite(entity)

/**
 * spawnSystem
 *
 * generate enemies
 *
 * @param game
 * @param entity
 */
def spawnEnemy(game:Game, delta:double , t:double , enemy:int):double 
    var d1 = t-delta
    if (d1 < 0.0) 
        case enemy
            when 1
                game.enemies1.add({(game.rand.int_range(35, game.width-35)), 35})
                return 1.0
            when 2
                game.enemies2.add({(game.rand.int_range(85, game.width-85)), 85})
                return 4.0
            when 3
                game.enemies3.add({(game.rand.int_range(160, game.width-160)), 160})
                return 6.0
            default
                return 0.0
        
    else 
        return d1    

def spawnSystem(game:Game, ref entity:Entity*)
    game.enemyT1 = spawnEnemy(game, game.delta, game.enemyT1, 1)
    game.enemyT2 = spawnEnemy(game, game.delta, game.enemyT2, 2)
    game.enemyT3 = spawnEnemy(game, game.delta, game.enemyT3, 3)

/**
 * factorySystem
 *
 * create entities on request
 *
 * @param game
 * @param entity
 */
def factorySystem(game:Game, ref entity:Entity*)
    if !entity.active 
        case entity.actor

            when Actor.BULLET 
                if (game.bullets.is_empty) do break
                initBullet(game, ref entity, (int)game.bullets.first().x, (int)game.bullets.first().y)
                game.bullets.remove_at(0)

            when Actor.ENEMY1
                if (game.enemies1.is_empty) do break
                initEnemy1(game, ref entity, (int)game.enemies1.first().x, (int)game.enemies1.first().y)
                game.enemies1.remove_at(0)

            when Actor.ENEMY2
                if (game.enemies2.is_empty) do break
                initEnemy2(game, ref entity, (int)game.enemies2.first().x, (int)game.enemies2.first().y)
                game.enemies2.remove_at(0)

            when Actor.ENEMY3
                if (game.enemies3.is_empty) do break
                initEnemy3(game, ref entity, (int)game.enemies3.first().x, (int)game.enemies3.first().y)
                game.enemies3.remove_at(0)

            when Actor.EXPLOSION  
                if (game.explosions.is_empty) do break
                initExplosion(game, ref entity, (int)game.explosions.first().x, (int)game.explosions.first().y)
                game.explosions.remove_at(0)

            when Actor.BANG
                if (game.bangs.is_empty) do break
                initBang(game, ref entity, (int)game.bangs.first().x, (int)game.bangs.first().y)
                game.bangs.remove_at(0)

            when Actor.PARTICLE
                if (game.particles.is_empty) do break
                initParticle(game, ref entity, (int)game.particles.first().x, (int)game.particles.first().y)
                game.particles.remove_at(0)



def handleCollision(game:Game, ref a:Entity*, ref b:Entity*)
    game.bangs.add({b.bounds.x, b.bounds.y})
    b.active = false
    game.removeSprite(b)
    for var i=0 to 3 do game.particles.add({b.bounds.x, b.bounds.y})
    if (a.health != null) 
        var h = a.health.current - 2
        if (h < 0) 
            game.explosions.add({a.position.x, a.position.y})
            a.active = false
            game.removeSprite(a)
        else 
            a.health = {h, a.health.maximum}

/**
 * collisionSystem
 *
 * check for collisions
 *
 * @param game
 * @param entity
 */
def collisionSystem(game:Game, ref entity:Entity*)
    if entity.active && entity.category == Category.ENEMY
        for var bullet in game.entity
            if bullet.active && bullet.category == Category.BULLET
                if entity.bounds.is_intersecting(bullet.bounds)
                    if entity.active && bullet.active
                        handleCollision(game, ref entity, ref bullet)
                    return
            
        
    


