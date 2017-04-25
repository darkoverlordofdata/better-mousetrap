#ifndef ENTITY_H
#define ENTITY_H

class Entity {
public:
    Entity(int id, std::string name, bool active);

    int id;
    std::string name;
    bool active;
    long mask;

    Actor actor;
    Category category;
    Point2d position;
    SDL_Rect bounds;
    Vector2d scale;
    Sprite sprite;


    double expires;
    Health health;
    Sound sound;
    Color tint;
    Tween tween;
    Vector2d velocity;

    bool hasExpires();
    bool hasHealth();
    bool hasSound();
    bool hasTint();
    bool hasTween();
    bool hasVelocity();

    bool hasComponent(long index);

    Entity* addExpires(double value);
    Entity* setExpires(double value);
    Entity* removeExpires();

    Entity* addHealth(double current, double maximum);
    Entity* setHealth(double current, double maximum);
    Entity* removeHealth();

    Entity* addSound(Mix_Chunk *chunk);
    Entity* setSound(Mix_Chunk *chunk);
    Entity* removeSound();

    Entity* addTint(int r, int g, int b, int a);
    Entity* setTint(int r, int g, int b, int a);
    Entity* removeTint();

    Entity* addTween(double min, double max, double speed, bool repeat, bool active);
    Entity* setTween(double min, double max, double speed, bool repeat, bool active);
    Entity* removeTween();

    Entity* addVelocity(double x, double y);
    Entity* setVelocity(double x, double y);
    Entity* removeVelocity();



};



#endif