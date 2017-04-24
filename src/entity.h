#ifndef ENTITY_H
#define ENTITY_H

class Entity {
public:
    Entity(int id, std::string name, bool active): id(id), name(name), active(active) {}
    
    int id;
    std::string name;
    bool active;
    Actor actor;
    Category category;
    Point2d position;
    SDL_Rect bounds;
    Vector2d scale;
    Sprite sprite;

    long mask;

    Effect sound;
    Color tint;
    double expires;
    Health health;
    Tween tween;
    Vector2d velocity;

    bool hasSound;
    bool hasTint;
    bool hasExpires;
    bool hasHealth;
    bool hasTween;
    bool hasVelocity;


};


#endif