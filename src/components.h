#ifndef COMPONENTS_H
#define COMPONENTS_H

enum ComponentFlag {
    __EXPIRES__     = 0x0000000000000001,
    __HEALTH__      = 0x0000000000000002,
    __SOUND__       = 0x0000000000000004,
    __TINT__        = 0x0000000000000008,
    __TWEEN__       = 0x0000000000000010,
    __VELOCITY__    = 0x0000000000000020,
    __ACTIVE__      = 0x8000000000000000
};

enum Components {
    ExpiresComponent = 1,
    HealthComponent,
    SoundComponent,
    TintComponent,
    TweenComponent,
    VelocityComponent,
    COUNT = VelocityComponent
};

enum Actor {
    ACTOR_BACKGROUND,
    ACTOR_TEXT,
    ACTOR_LIVES,
    ACTOR_ENEMY1,
    ACTOR_ENEMY2,
    ACTOR_ENEMY3,
    ACTOR_PLAYER,
    ACTOR_BULLET,
    ACTOR_EXPLOSION,
    ACTOR_BANG,
    ACTOR_PARTICLE,
    ACTOR_HUD
};
enum Category {
    BACKGROUND,
    BULLET,
    ENEMY,
    EXPLOSION,
    PARTICLE,
    PLAYER
};

enum Effect {
    PEW,
    SMALLASPLODE,
    ASPLODE
};

class Point2d {
public:
    Point2d(): x(0), y(0) {}
    Point2d(double x, double y): x(x), y(y) {}
    double x;
    double y;
};

class Vector2d {
public:
    Vector2d(): x(0), y(0) {}
    Vector2d(double x, double y): x(x), y(y) {}
    double x;
    double y;
};

class Scale {
public:
    Scale(): x(0), y(0) {}
    Scale(double x, double y): x(x), y(y) {}
    double x;
    double y;
};

class Sound {
public:
    Sound(): chunk(NULL) {}
    Sound(Mix_Chunk *chunk): chunk(chunk) {}
    Mix_Chunk *chunk;
};

class Color {
public:
    Color(): r(0), g(0), b(0), a(0) {}
    Color(int r, int g, int b, int a): r(r), g(g), b(b), a(a) {}
    int r;
    int g;
    int b;
    int a;
};

class Health {
public:
    Health(): current(0), maximum(0) {}
    Health(int c, int m): current(c), maximum(m) {}
    int current;
    int maximum;
};

class Tween {
public:
    Tween(): min(0), max(0), speed(0), repeat(false), active(false) {}
    Tween(double m, double x, double s, bool r, bool a): min(m), max(x), speed(s), repeat(r), active(a) {}
    double min;
    double max;
    double speed;
    bool repeat;
    bool active;
};

class Sprite {
public:
    SDL_Texture* texture;
    int width;
    int height;
};

const long long __POW2__[] = {
    0x0000000000000000,
    0x0000000000000001,
    0x0000000000000002,
    0x0000000000000004,
    0x0000000000000008,
    0x0000000000000010,
    0x0000000000000020,
    0x0000000000000040,
    0x0000000000000080,
    0x0000000000000100,
    0x0000000000000200,
    0x0000000000000400,
    0x0000000000000800,
    0x0000000000001000,
    0x0000000000002000,
    0x0000000000004000,
    0x0000000000008000,
    0x0000000000010000,
    0x0000000000020000,
    0x0000000000040000,
    0x0000000000080000,
    0x0000000000100000,
    0x0000000000200000,
    0x0000000000400000,
    0x0000000000800000,
    0x0000000001000000,
    0x0000000002000000,
    0x0000000004000000,
    0x0000000008000000,
    0x0000000010000000,
    0x0000000020000000,
    0x0000000040000000,
    0x0000000080000000,
    0x0000000100000000,
    0x0000000200000000,
    0x0000000400000000,
    0x0000000800000000,
    0x0000001000000000,
    0x0000002000000000,
    0x0000004000000000,
    0x0000008000000000,
    0x0000010000000000,
    0x0000020000000000,
    0x0000040000000000,
    0x0000080000000000,
    0x0000100000000000,
    0x0000200000000000,
    0x0000400000000000,
    0x0000800000000000,
    0x0001000000000000,
    0x0002000000000000,
    0x0004000000000000,
    0x0008000000000000,
    0x0010000000000000,
    0x0020000000000000,
    0x0040000000000000,
    0x0080000000000000,
    0x0100000000000000,
    0x0200000000000000,
    0x0400000000000000,
    0x0800000000000000,
    0x1000000000000000,
    0x2000000000000000,
    0x4000000000000000,
    0x8000000000000000

};


#endif
