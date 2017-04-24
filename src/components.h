#ifndef COMPONENTS_H
#define COMPONENTS_H


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

#endif
