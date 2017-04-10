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

[SimpleStruct]
public struct Sound {
    public SDLMixer.Chunk* effect;
    public Sound(SDLMixer.Chunk* effect) {
        this.effect = effect;
    }
}

[SimpleStruct]
public struct Point2d {
    public double x;
    public double y;
}

[SimpleStruct]
public struct Vector2d {
    public double x;
    public double y;
}

[SimpleStruct]
public struct Scale {
    public double x;
    public double y;
}

[SimpleStruct]
public struct Color {
    public int r;
    public int g;
    public int b;
    public int a;
}

[SimpleStruct]
public struct Health {
    public int current;
    public int maximum;
}

[SimpleStruct]
public struct Duration {
    public double timer;
}

[SimpleStruct]
public struct Tween {
    public double min;
    public double max;
    public double speed;
    public bool repeat;
    public bool active;
}

[SimpleStruct]
public struct Sprite {
    public Texture* texture;
    public int width;
    public int height;
    public Sprite(Texture* texture, int width, int height) {
        this.texture = texture;
        this.width = width;
        this.height = height;
    }
}

[SimpleStruct]
public struct Entity {
    /* Core components: */
    public int id;
    public string name;
    public bool active;
    public Actor actor;
    public Category category;
    public Point2d pos;
    public Rect bounds;
    public Vector2d scale;

    /* Optional components: */
    public Sound? sound; 
    public Color? tint;
    public Duration? expires;
    public Health? health;
    public Tween? tween;
    public Vector2d? velocity;

    public Sprite sprite;
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
