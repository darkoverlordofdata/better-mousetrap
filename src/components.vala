using SDL;
using SDL.Video;

public enum Actor {
    BACKGROUND,
    ENEMY1,
    ENEMY2,
    ENEMY3,
    PLAYER,
    BULLET,
    EXPLOSION,
    BANG,
    PARTICLE
}

public enum Category {
    BACKGROUND,
    BULLET,
    ENEMY,
    EXPLOSION,
    PARTICLE,
    PLAYER
}

public enum Effect {
    PEW,
    SMALLASPLODE,
    ASPLODE
}

[SimpleType]
public struct Id {
    public int id;
}

public struct Name {
    public string name;
}

[SimpleType]
public struct Active {
    public bool active;
}

[SimpleType]
public struct ActorType {
    public Actor isA;
}

[SimpleType]
public struct ActorStyle {
    public Category isA;
}

public struct Sound {
    public SDLMixer.Chunk* effect;
}

[SimpleType]
public struct Point2d {
    public double x;
    public double y;
}

[SimpleType]
public struct Vector2d {
    public double x;
    public double y;
}

[SimpleType]
public struct Scale {
    public double x;
    public double y;
}

[SimpleType]
public struct Color {
    public int r;
    public int g;
    public int b;
    public int a;
}

[SimpleType]
public struct Health {
    public int current;
    public int maximum;
}

[SimpleType]
public struct Duration {
    public double timer;
}

[SimpleType]
public struct Tween {
    public double min;
    public double max;
    public double speed;
    public bool repeat;
    public bool active;
}

public struct Sprite {
    public Texture* texture;
    public int width;
    public int height;
}

public struct Entity {
    /* Core components: */
    public Id id;
    public Name name;
    public Active active;
    public ActorType actor;
    public ActorStyle style;
    public Point2d position;
    public Rect bounds;
    public Vector2d scale;
    public Sprite sprite;
    
    /* Optional components: */
    public Sound? sound; 
    public Color? tint;
    public Duration? expires;
    public Health? health;
    public Tween? tween;
    public Vector2d? velocity;

}

public struct Metrics {
    public int bullet;
    public int enemy1;
    public int enemy2;
    public int enemy3;
    public int explosion;
    public int bang;
    public int particle;
    public int count;
    public Metrics(int bullet, int enemy1, int enemy2, int enemy3, int explosion, int bang, int particle, int count) {
        this.bullet = bullet;
        this.enemy1 = enemy1;
        this.enemy2 = enemy2;
        this.enemy3 = enemy3;
        this.explosion = explosion;
        this.bang = bang;
        this.particle = particle;
        this.count = count;
    }

}
