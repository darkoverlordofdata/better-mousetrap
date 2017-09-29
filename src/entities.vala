using SDL;
using SDL.Video;
using SDLMixer;
/** 
 * Entity Factory
 */

public const double Tau = 2.0 * Math.PI;


public class Factory
{
    public static int id = 0;
}

/**
 * getImage
 *
 * gets resource from gio resource compiler 
 *
 * @param name
 * @return surface
 */
public Surface getImage(string name)
{
    //  var raw = new SDL.RWops.from_file("assets/images/"+name, "r");
    //  return SDLImage.load_png(raw);
    var ptr = GLib.resources_lookup_data("/darkoverlordofdata/shmupwarz/assets/images/"+name, 0);
    if (ptr == null) 
        return null;
     else {
        var raw = new SDL.RWops.from_mem((void*)ptr.get_data(), (int)ptr.get_size());
        return SDLImage.load_png(raw);    
     }
}

public Chunk getSound(string name)
{
    //  var raw = new SDL.RWops.from_file("assets/images/"+name, "r");
    //  return SDLImage.load_png(raw);
    var ptr = GLib.resources_lookup_data("/darkoverlordofdata/shmupwarz/assets/sounds/"+name, 0);
    if (ptr == null) 
        return null;
     else {
        var raw = new SDL.RWops.from_mem((void*)ptr.get_data(), (int)ptr.get_size());
        return new Chunk.WAV_RW(raw);    
     }
}

/**
 * createBackground
 *
 * create background entity 
 *
 * @param game
 * @return id
 */
public Entity* createBackground(Game game, Entity[] pool)
{
    var scale = 2.0;
    var surface = getImage("background.png");
    var w = (int)((double)surface.w*scale);
    var h = (int)((double)surface.h*scale);
    var id = Factory.id++;

    pool[id] = Entity() { 
        id          = { id }, 
        name        = { "background" }, 
        active      = { true }, 
        actor       = { Actor.BACKGROUND }, 
        style       = { Category.BACKGROUND },
        position    = { 0, 0 }, 
        bounds      = { 0, 0, w, h }, 
        scale       = { scale, scale },
        sprite      = { Video.Texture.create_from_surface(game.renderer, surface), w, h }
    };
    return &pool[id];
}

public Entity* createPlayer(Game game, Entity[] pool)
{
    var scale = 1.0;
    var surface = getImage("spaceshipspr.png");
    var w = (int)((double)surface.w*scale);
    var h = (int)((double)surface.h*scale);
    var id = Factory.id++;

    pool[id] = Entity() { 
        id          = { id }, 
        name        = { "player" }, 
        active      = { true }, 
        actor       = { Actor.PLAYER }, 
        style       = { Category.PLAYER },
        position    = { 0, 0 }, 
        bounds      = { 0, 0, w, h }, 
        scale       = { scale, scale },
        sprite      = { Video.Texture.create_from_surface(game.renderer, surface), w, h }
    };
    return &pool[id];
}

public Entity* createBullet(Game game, Entity[] pool)
{
    var scale = 1.0;
    var surface = getImage("bullet.png");
    var w = (int)((double)surface.w*scale);
    var h = (int)((double)surface.h*scale);
    var id = Factory.id++;

    pool[id] = Entity(){ 
        id          = { id }, 
        name        = { "bullet" }, 
        active      = { false }, 
        actor       = { Actor.BULLET }, 
        style       = { Category.BULLET },
        position    = { 0, 0 }, 
        bounds      = { 0, 0, w, h }, 
        scale       = { scale, scale },
        sprite      = { Video.Texture.create_from_surface(game.renderer, surface), w, h },
        sound       = { getSound("pew.wav") },
        tint        = { 0xd2, 0xfa, 0x00, 0xffa },
        expires     = { 1.0 },
        health      = { 2, 2 },
        velocity    = { 0, -800 }
    };
    return &pool[id];
}

public void initBullet(Game game, ref Entity* entity, int x, int y)
{ 
    entity.position.x = x;
    entity.position.y = y;
    entity.expires.timer = 1.0;
    entity.active.active = true;
    game.addSprite(entity);
}

public Entity* createEnemy1(Game game, Entity[] pool)
{
    var scale = 1.0;
    var surface = getImage("enemy1.png");
    var w = (int)((double)surface.w*scale);
    var h = (int)((double)surface.h*scale);
    var id = Factory.id++;

    pool[id] = Entity() { 
        id          = { id }, 
        name        = { "enemy1" }, 
        active      = { false }, 
        actor       = { Actor.ENEMY1 }, 
        style       = { Category.ENEMY },
        position    = { 0, 0 }, 
        bounds      = { 0, 0, w, h }, 
        scale       = { scale, scale },
        sprite      = { Video.Texture.create_from_surface(game.renderer, surface), w, h },
        health      = { 10, 10 },
        velocity    = { 0, 40 }
    };
    return &pool[id];
}

public void initEnemy1(Game game, ref Entity* entity, int x, int y)
{ 
    entity.position.x = x;
    entity.position.y = y;
    entity.health.current = 10;
    entity.active.active = true;
    game.addSprite(entity);
}

public Entity* createEnemy2(Game game, Entity[] pool)
{
    var scale = 1.0;
    var surface = getImage("enemy2.png");
    var w = (int)((double)surface.w*scale);
    var h = (int)((double)surface.h*scale);
    var id = Factory.id++;

    pool[id] = Entity() { 
        id          = { id }, 
        name        = { "enemy2" }, 
        active      = { false }, 
        actor       = { Actor.ENEMY2 }, 
        style       = { Category.ENEMY },
        position    = { 0, 0 }, 
        bounds      = { 0, 0, w, h }, 
        scale       = { scale, scale },
        sprite      = { Video.Texture.create_from_surface(game.renderer, surface), w, h },
        health      = { 20, 20 },
        velocity    = { 0, 30 }
    };
    return &pool[id];
}

public void initEnemy2(Game game, ref Entity* entity, int x, int y)
{
    entity.position.x = x;
    entity.position.y = y;
    entity.health.current = 20;
    entity.active.active = true;
    game.addSprite(entity);
}

public Entity* createEnemy3(Game game, Entity[] pool)
{
    var scale = 1.0;
    var surface = getImage("enemy3.png");
    var w = (int)((double)surface.w*scale);
    var h = (int)((double)surface.h*scale);
    var id = Factory.id++;

    pool[id] = Entity() { 
        id          = { id }, 
        name        = { "enemy3" }, 
        active      = { false }, 
        actor       = { Actor.ENEMY3 }, 
        style       = { Category.ENEMY },
        position    = { 0, 0 }, 
        bounds      = { 0, 0, w, h }, 
        scale       = { scale, scale },
        sprite      = { Video.Texture.create_from_surface(game.renderer, surface), w, h },
        health      = { 60, 60 },
        velocity    = { 0, 20 }
    };
    return &pool[id];
}

public void initEnemy3(Game game, ref Entity* entity, int x, int y)
{
    entity.position.x = x;
    entity.position.y = y;
    entity.health.current = 60;
    entity.active.active = true;
    game.addSprite(entity);
}

public Entity* createExplosion(Game game, Entity[] pool)
{
    var scale = 0.6;
    var surface = getImage("explosion.png");
    var w = (int)((double)surface.w*scale);
    var h = (int)((double)surface.h*scale);
    var id = Factory.id++;

    pool[id] = Entity() { 
        id          = { id }, 
        name        = { "explosion" }, 
        active      = { false }, 
        actor       = { Actor.EXPLOSION }, 
        style       = { Category.EXPLOSION },
        position    = { 0, 0 }, 
        bounds      = { 0, 0, w, h }, 
        scale       = { scale, scale },
        sprite      = { Video.Texture.create_from_surface(game.renderer, surface), w, h },
        sound       = { getSound("asplode.wav") },
        tint        = { 0xd2, 0xfa, 0xd2, 0xfa },
        expires     = { 0.2 },
        tween       = { scale/100.0, scale, -3, false, true }
    };
    return &pool[id];
}

public void initExplosion(Game game, ref Entity* entity, int x, int y)
{
    entity.position.x = x;
    entity.position.y = y;
    entity.bounds.x = x;
    entity.bounds.y = y;
    entity.scale.x = 0.6;
    entity.scale.y = 0.6;
    entity.tween.active = true;
    entity.expires.timer = 0.2;
    entity.active.active = true;
    game.addSprite(entity);
}

public Entity* createBang(Game game, Entity[] pool)
{
    var scale = 0.4;
    var surface = getImage("explosion.png");
    var w = (int)((double)surface.w*scale);
    var h = (int)((double)surface.h*scale);
    var id = Factory.id++;

    pool[id] = Entity() { 
        id          = { id }, 
        name        = { "bang" }, 
        active      = { false }, 
        actor       = { Actor.BANG }, 
        style       = { Category.EXPLOSION },
        position    = { 0, 0 }, 
        bounds      = { 0, 0, w, h }, 
        scale       = { scale, scale },
        sprite      = { Video.Texture.create_from_surface(game.renderer, surface), w, h },
        sound       = { getSound("smallasplode.wav") },
        tint        = { 0xd2, 0xfa, 0xd2, 0xfa },
        expires     = { 0.2 },
        tween       = { scale/100.0, scale, -3, false, true }
    };
    return &pool[id];
}

public void initBang(Game game, ref Entity* entity, int x, int y)
{
    entity.position.x = x;
    entity.position.y = y;
    entity.bounds.x = x; 
    entity.bounds.y = y; 
    entity.scale.x = 0.4;
    entity.scale.y = 0.4;
    entity.tween.active = true;
    entity.expires.timer = 0.2;
    entity.active.active = true;
    game.addSprite(entity);
}

public Entity* createParticle(Game game, Entity[] pool)
{
    var scale = 1.0;
    var surface = getImage("star.png");
    var w = (int)((double)surface.w*scale);
    var h = (int)((double)surface.h*scale);
    var id = Factory.id++;

    pool[id] = Entity() { 
        id          = { id }, 
        name        = { "particle" }, 
        active      = { false }, 
        actor       = { Actor.PARTICLE }, 
        style       = { Category.PARTICLE },
        position    = { 0, 0 }, 
        bounds      = { 0, 0, w, h }, 
        scale       = { scale, scale },
        sprite      = { Video.Texture.create_from_surface(game.renderer, surface), w, h },
        tint        = { 0xd2, 0xfa, 0xd2, 0xfa },
        expires     = { 0.75 },
        velocity    = { 0, 0 }
    };
    return &pool[id];
}

public void initParticle(Game game, ref Entity* entity, int x, int y)
{
    var radians = game.rand.next_double() * Tau;
    var magnitude = game.rand.int_range(0, 200);
    var velocityX = magnitude * Math.cos(radians);
    var velocityY = magnitude * Math.sin(radians);
    var scale = game.rand.double_range(0.1, 1.0);

    entity.position.x = x;
    entity.position.y = y;
    entity.bounds.x = x; 
    entity.bounds.y = y; 
    entity.scale.x = scale;
    entity.scale.y = scale;
    entity.velocity.x = velocityX;
    entity.velocity.y = velocityY;
    entity.expires.timer = 0.75;
    entity.active.active = true;
    game.addSprite(entity);

}
