#include "shmupwarz.h"


Systems::Systems(Game* g): game(g) {
    FireRate = 0.1;
    timeToFire = 0.0;
    enemyT1 = 1.0;
    enemyT2 = 4.0;
    enemyT3 = 6.0;
    
}
Systems::~Systems(){}

void Systems::inputSystem(Entity* entity){
    entity->position.x = game->mouseX;
    entity->position.y = game->mouseY;
    if (game->getKey(122) || game->mouseDown) {
        timeToFire -= game->delta;
        if (timeToFire < 0.0) {
            game->bullets.emplace_back(entity->position.x - 27, entity->position.y + 2);
            game->bullets.emplace_back(entity->position.x + 27, entity->position.y + 2);
            timeToFire = FireRate;
        }
    }
}

void Systems::soundSystem(Entity* entity){
    if (entity->isActive() && entity->hasSound()) {
        //Mix_PlayChannelTimed(-1, entity->sound.chunk, 0, 1);
    }
}

void Systems::physicsSystem(Entity* entity){
    if (entity->isActive() && entity->hasVelocity()) {
        entity->position.x += entity->velocity.x * game->delta;
        entity->position.y += entity->velocity.y * game->delta;
    }
}

void Systems::expireSystem(Entity* entity){
    if (entity->isActive() && entity->hasExpires()) {
        auto exp = entity->expires - game->delta;
        entity->expires = exp;
        if (entity->expires < 0) {
            entity->setActive(false);
        }
    }
}

void Systems::tweenSystem(Entity* entity){
    if (entity->isActive() && entity->hasTween()) {

        auto x = entity->scale.x + (entity->tween.speed * game->delta);
        auto y = entity->scale.y + (entity->tween.speed * game->delta);
        auto active = entity->tween.active;


        if (x > entity->tween.max) {
            x = entity->tween.max;
            y = entity->tween.max;
            active = false;
        } else if (x < entity->tween.min) {
            x = entity->tween.min;
            y = entity->tween.min;
            active = false;
        }
        entity->scale.x = x; 
        entity->scale.y = y; 
        entity->tween.active = active;
    }
}

void Systems::removeSystem(Entity* entity){
    if (entity->isActive()) {
        switch(entity->kind) {
            case ENEMY:
                if (entity->position.y > game->height) {
                    entity->setActive(false);
                }
                break;
            case BULLET:
                if (entity->position.y < 0) {
                    entity->setActive(false);
                }
                break;
            default:
                break;
        }
    }
}

double Systems::spawnEnemy(double delta, double t, int enemy) {
    auto d1 = t-delta;
    if (d1 < 0.0) {
        switch(enemy) {
            case 1:
                game->enemies1.emplace_back((std::rand() % (game->width-70))+35, 35);
                return 1.0;
            case 2:
                game->enemies2.emplace_back((std::rand() % (game->width-170))+85, 85);
                return 4.0;
            case 3:
                game->enemies3.emplace_back((std::rand() % (game->width-320))+160, 160);
                return 6.0;
            default:
                return 0;
        }
    } else return d1;    
}

void Systems::spawnSystem(Entity* entity){
    enemyT1 = spawnEnemy(game->delta, enemyT1, 1);
    enemyT2 = spawnEnemy(game->delta, enemyT2, 2);
    enemyT3 = spawnEnemy(game->delta, enemyT3, 3);

}

void Systems::entitySystem(Entity* entity){
    if (!entity->isActive()) {
        switch(entity->level) {

            case ACTOR_BULLET: 
                if (game->bullets.empty()) break;
                refreshBullet(entity, game->bullets.back().x, game->bullets.back().y);
                game->bullets.pop_back();
                break;

            case ACTOR_ENEMY1:
                if (game->enemies1.empty()) break;
                refreshEnemy1(entity, game->enemies1.back().x, game->enemies1.back().y);
                game->enemies1.pop_back();
                break;

            case ACTOR_ENEMY2:
                if (game->enemies2.empty()) break;
                refreshEnemy2(entity, game->enemies2.back().x, game->enemies2.back().y);
                game->enemies2.pop_back();
                break;

            case ACTOR_ENEMY3:
                if (game->enemies3.empty()) break;
                refreshEnemy3(entity, game->enemies3.back().x, game->enemies3.back().y);
                game->enemies3.pop_back();
                break;

            case ACTOR_EXPLOSION:  
                if (game->explosions.empty()) break;
                refreshExplosion(entity, game->explosions.back().x, game->explosions.back().y);
                game->explosions.pop_back();
                break;

            case ACTOR_BANG:
                if (game->bangs.empty()) break;
                refreshBang(entity, game->bangs.back().x, game->bangs.back().y);
                game->bangs.pop_back();
                break;

            case ACTOR_PARTICLE:
                if (game->particles.empty()) break;
                refreshParticle(entity, game->particles.back().x, game->particles.back().y);
                game->particles.pop_back();
                break;

            default:
                break;
        }
    }

}

void Systems::handleCollision(Entity* a, Entity* b){
    game->bangs.emplace_back(b->bounds.x, b->bounds.y);
    b->setActive(false);
    for (int i=0; i<3; i++) game->particles.emplace_back(b->bounds.x, b->bounds.y);
    if (a->hasHealth()) {
        auto h = a->health.current - 2;
        if (h < 0) {
            game->explosions.emplace_back(a->position.x, a->position.y);
            a->setActive(false);
        } else {
            a->health.current = h;
        }   
    }
}

void Systems::collisionSystem(Entity* entity){
    if (entity->isActive() && entity->kind == ENEMY) {
        for (int i=0; i<game->entities.size(); i++) {
            Entity* bullet = &game->entities[i];
            if (bullet->isActive() && bullet->kind == BULLET) {
                if (SDL_HasIntersection(&entity->bounds, &bullet->bounds)) {
                    if (entity->isActive() && bullet->isActive()) handleCollision(entity, bullet);
                    return;
                }
            }
        }
    }
}
