#ifndef SYSTEMS_H
#define SYSTEMS_H

class Systems {
public:
    Systems(Game* game);
    ~Systems();

    void inputSystem(Entity* entity);
    void soundSystem(Entity* entity);
    void physicsSystem(Entity* entity);
    void expireSystem(Entity* entity);
    void tweenSystem(Entity* entity);
    void removeSystem(Entity* entity);
    void spawnSystem(Entity* entity);
    void entitySystem(Entity* entity);
    void collisionSystem(Entity* entity);

    double spawnEnemy(double delta, double t, int enemy);
    bool intersects(SDL_Rect* r1, SDL_Rect* r2);
    void handleCollision(Entity* a, Entity* b);

private:
    Game* game;
    double FireRate;
    double timeToFire;
    double enemyT1;
    double enemyT2;
    double enemyT3;
};

#endif
