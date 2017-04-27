#ifndef ENTITY_H
#define ENTITY_H
/**
 * Entity
 */

class Entity {
public:
    Entity(int id, std::string name, bool active);

    int id;
    std::string name;
    unsigned long long mask;

    SDL_Rect bounds;
    double expires;
    Health health;
    Category kind;
    Actor level;
    Point2d position;
    Vector2d scale;
    Sound sound;
    Sprite sprite;
    Color tint;
    Tween tween;
    Vector2d velocity;

    bool isActive();
    Entity* setActive(bool active);

    bool hasBounds();
    bool hasExpires();
    bool hasHealth();
    bool hasKind();
    bool hasLevel();
    bool hasPosition();
    bool hasScale();
    bool hasSound();
    bool hasSprite();
    bool hasTint();
    bool hasTween();
    bool hasVelocity();

    bool hasComponent(long index);

    Entity* addBounds(int x, int y, int w, int h);
    Entity* setBounds(int x, int y, int w, int h);
    Entity* removeBounds();

    Entity* addExpires(double value);
    Entity* setExpires(double value);
    Entity* removeExpires();

    Entity* addHealth(double current, double maximum);
    Entity* setHealth(double current, double maximum);
    Entity* removeHealth();

    Entity* addKind(Category value);
    Entity* setKind(Category value);
    Entity* removeKind();

    Entity* addLevel(Actor value);
    Entity* setLevel(Actor value);
    Entity* removeLevel();

    Entity* addPosition(double x, double y);
    Entity* setPosition(double x, double y);
    Entity* removePosition();

    Entity* addScale(double x, double y);
    Entity* setScale(double x, double y);
    Entity* removeScale();

    Entity* addSound(Mix_Chunk *chunk);
    Entity* setSound(Mix_Chunk *chunk);
    Entity* removeSound();

    Entity* addSprite(SDL_Texture* texture, int width, int height);
    Entity* setSprite(SDL_Texture* texture, int width, int height);
    Entity* removeSprite();

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