/** 
 * Entity Factory
 */
#include <SDL2/SDL.h>
#include <SDL2/SDL_image.h>
#include <SDL/SDL_mixer.h>
#include <cstdio>
#include <map>
#include <string>
#include <iostream>
#include <ctime>
#include <chrono>
#include "components.h"
#include "entity.h"
#include "game.h"
#include "systems.h"
#include "entities.h"

int uniqueId = 0;



void createBackground(SDL_Renderer* renderer, std::vector<Entity>* entities, std::string path){
    entities->push_back(Entity(uniqueId++, "background", true));
    initBackground(renderer, &entities->back(), path);
}

void initBackground(SDL_Renderer* renderer, Entity* entity, std::string path) {
    entity->actor = ACTOR_BACKGROUND;
    entity->category = BACKGROUND;
    SDL_Surface *surface = IMG_Load("assets/images/background.png");
    entity->sprite.texture = SDL_CreateTextureFromSurface(renderer, surface);

    double scale = 2.0;
    entity->sprite.width = surface->w*scale;
    entity->sprite.height = surface->h*scale;
    entity->bounds.x = 0;
    entity->bounds.y = 0;
    entity->bounds.w = surface->w*scale; 
    entity->bounds.h = surface->h*scale; 
    entity->scale.x = scale;
    entity->scale.y = scale;
    entity->active = true;
    SDL_FreeSurface(surface);

}

Entity* createPlayer(SDL_Renderer* renderer, std::vector<Entity>* entities, std::string path) {
    entities->push_back(Entity(uniqueId++, "player", true));
    initPlayer(renderer, &entities->back(), path);
    return &entities->back();
}

void initPlayer(SDL_Renderer* renderer, Entity* entity, std::string path) {
    entity->actor = ACTOR_PLAYER;
    entity->category = PLAYER;
    SDL_Surface *surface = IMG_Load("assets/images/spaceshipspr.png");
    entity->sprite.texture = SDL_CreateTextureFromSurface(renderer, surface);

    double scale = 1.0;
    entity->sprite.width = surface->w*scale;
    entity->sprite.height = surface->h*scale;
    entity->bounds.w = surface->w*scale; 
    entity->bounds.h = surface->h*scale; 
    entity->scale.x = scale;
    entity->scale.y = scale;
    SDL_FreeSurface(surface);
}

void createBullet(SDL_Renderer* renderer, std::vector<Entity>* entities, std::string path) {
    entities->push_back(Entity(uniqueId++, "bullet", false));
    initBullet(renderer, &entities->back(), path);
}
void initBullet(SDL_Renderer* renderer, Entity* entity, std::string path) {
    entity->actor = ACTOR_BULLET;
    entity->category = BULLET;
    SDL_Surface *surface = IMG_Load("assets/images/bullet.png");
    entity->sprite.texture = SDL_CreateTextureFromSurface(renderer, surface);

    double scale = 1.0;
    entity->sprite.width = surface->w*scale;
    entity->sprite.height = surface->h*scale;
    entity->bounds.w = surface->w*scale; 
    entity->bounds.h = surface->h*scale; 
    entity->scale.x = scale;
    entity->scale.y = scale;
    SDL_FreeSurface(surface);
}

void refreshBullet(Entity* entity, int x, int y) {
    entity->position.x = x;
    entity->position.y = y;
    entity->expires = 1.0;
    entity->health.current = 2;
    entity->health.maximum = 2;
    entity->hasHealth = true;
    entity->tint.r = 0xd2;
    entity->tint.g = 0xfa;
    entity->tint.b = 0x00;
    entity->tint.a = 0xff;
    entity->hasTint = true;
    entity->velocity.x = 0;
    entity->velocity.y = -800;
    entity->hasVelocity = true;
    entity->sound.chunk = Mix_LoadWAV("assets/sounds/pew.wav");
    entity->hasSound = true;
    entity->active = true;
}

void createEnemy1(SDL_Renderer* renderer, std::vector<Entity>* entities, std::string path){
    entities->push_back(Entity(uniqueId++, "enemy1", false));
    initEnemy1(renderer, &entities->back(), path);
}
void initEnemy1(SDL_Renderer* renderer, Entity* entity, std::string path) {
    entity->actor = ACTOR_ENEMY1;
    entity->category = ENEMY;
    SDL_Surface *surface = IMG_Load("assets/images/enemy1.png");
    entity->sprite.texture = SDL_CreateTextureFromSurface(renderer, surface);

    double scale = 1.0;
    entity->sprite.width = surface->w*scale;
    entity->sprite.height = surface->h*scale;
    entity->bounds.w = surface->w*scale; 
    entity->bounds.h = surface->h*scale; 
    entity->scale.x = scale;
    entity->scale.y = scale;
    SDL_FreeSurface(surface);
}
void refreshEnemy1(Entity* entity, int x, int y) {
    entity->position.x = x;
    entity->position.y = y;
    entity->health.current = 10;
    entity->health.maximum = 10;
    entity->hasHealth = true;
    entity->velocity.x = 0;
    entity->velocity.y = 40;
    entity->hasVelocity = true;
    entity->active = true;
}

void createEnemy2(SDL_Renderer* renderer, std::vector<Entity>* entities, std::string path){
    entities->push_back(Entity(uniqueId++, "enemy2", false));
    initEnemy2(renderer, &entities->back(), path);
}
void initEnemy2(SDL_Renderer* renderer, Entity* entity, std::string path) {
    entity->actor = ACTOR_ENEMY2;
    entity->category = ENEMY;
    SDL_Surface *surface = IMG_Load("assets/images/enemy2.png");
    entity->sprite.texture = SDL_CreateTextureFromSurface(renderer, surface);

    double scale = 1.0;
    entity->sprite.width = surface->w*scale;
    entity->sprite.height = surface->h*scale;
    entity->bounds.w = surface->w*scale; 
    entity->bounds.h = surface->h*scale; 
    entity->scale.x = scale;
    entity->scale.y = scale;
    SDL_FreeSurface(surface);
}
void refreshEnemy2(Entity* entity, int x, int y){
    entity->position.x = x;
    entity->position.y = y;
    entity->health.current = 20;
    entity->health.maximum = 20;
    entity->hasHealth = true;
    entity->velocity.x = 0;
    entity->velocity.y = 30;
    entity->hasVelocity = true;
    entity->active = true;
}
void createEnemy3(SDL_Renderer* renderer, std::vector<Entity>* entities, std::string path){
    entities->push_back(Entity(uniqueId++, "enemy3", false));
    initEnemy3(renderer, &entities->back(), path);
}
void initEnemy3(SDL_Renderer* renderer, Entity* entity, std::string path) {
    entity->actor = ACTOR_ENEMY3;
    entity->category = ENEMY;
    SDL_Surface *surface = IMG_Load("assets/images/enemy3.png");
    entity->sprite.texture = SDL_CreateTextureFromSurface(renderer, surface);

    double scale = 1.0;
    entity->sprite.width = surface->w*scale;
    entity->sprite.height = surface->h*scale;
    entity->bounds.w = surface->w*scale; 
    entity->bounds.h = surface->h*scale; 
    entity->scale.x = scale;
    entity->scale.y = scale;
    SDL_FreeSurface(surface);
}
void refreshEnemy3(Entity* entity, int x, int y){
    entity->position.x = x;
    entity->position.y = y;
    entity->health.current = 60;
    entity->health.maximum = 60;
    entity->hasHealth = true;
    entity->velocity.x = 0;
    entity->velocity.y = 20;
    entity->hasVelocity = true;
    entity->active = true;
}

void createExplosion(SDL_Renderer* renderer, std::vector<Entity>* entities, std::string path){
    entities->push_back(Entity(uniqueId++, "explosion", false));
    initExplosion(renderer, &entities->back(), path);
}
void initExplosion(SDL_Renderer* renderer, Entity* entity, std::string path) {
    entity->actor = ACTOR_EXPLOSION;
    entity->category = EXPLOSION;
    SDL_Surface *surface = IMG_Load("assets/images/explosion.png");
    entity->sprite.texture = SDL_CreateTextureFromSurface(renderer, surface);

    double scale = 0.6;
    entity->sprite.width = surface->w*scale;
    entity->sprite.height = surface->h*scale;
    entity->bounds.w = surface->w*scale; 
    entity->bounds.h = surface->h*scale; 
    entity->scale.x = scale;
    entity->scale.y = scale;
    SDL_FreeSurface(surface);
}
void refreshExplosion(Entity* entity, int x, int y){
    double scale = 0.6;
    entity->position.x = x;
    entity->position.y = y;
    entity->bounds.x = x; 
    entity->bounds.y = y; 
    entity->scale.x = scale;
    entity->scale.y = scale;
    entity->tween.min = scale/100.0;
    entity->tween.max = scale;
    entity->tween.speed = -3;
    entity->tween.repeat = false;
    entity->tween.active = true;
    entity->hasTween = true;
    entity->tint.r = 0xd2;
    entity->tint.g = 0xfa;
    entity->tint.b = 0xd2;
    entity->tint.a = 0xfa;
    entity->hasTint = true;
    entity->expires = 0.2;
    entity->hasExpires = true;
    entity->sound.chunk = Mix_LoadWAV("assets/sounds/asplode.wav");
    entity->hasSound = true;
    entity->active = true;
}
void createBang(SDL_Renderer* renderer, std::vector<Entity>* entities, std::string path){
    entities->push_back(Entity(uniqueId++, "bang", false));
    initBang(renderer, &entities->back(), path);
}
void initBang(SDL_Renderer* renderer, Entity* entity, std::string path) {
    entity->actor = ACTOR_BANG;
    entity->category = EXPLOSION;
    SDL_Surface *surface = IMG_Load("assets/images/explosion.png");
    entity->sprite.texture = SDL_CreateTextureFromSurface(renderer, surface);

    double scale = 0.4;
    entity->sprite.width = surface->w*scale;
    entity->sprite.height = surface->h*scale;
    entity->bounds.w = surface->w*scale; 
    entity->bounds.h = surface->h*scale; 
    entity->scale.x = scale;
    entity->scale.y = scale;
    SDL_FreeSurface(surface);
}
void refreshBang(Entity* entity, int x, int y){
    double scale = 0.4;
    entity->position.x = x;
    entity->position.y = y;
    entity->bounds.x = x; 
    entity->bounds.y = y; 
    entity->scale.x = scale;
    entity->scale.y = scale;
    entity->tween.min = scale/100.0;
    entity->tween.max = scale;
    entity->tween.speed = -3;
    entity->tween.repeat = false;
    entity->tween.active = true;
    entity->hasTween = true;
    entity->hasTween = true;
    entity->tint.r = 0xd2;
    entity->tint.g = 0xfa;
    entity->tint.b = 0xd2;
    entity->tint.a = 0xfa;
    entity->hasTint = true;
    entity->expires = 0.2;
    entity->hasExpires = true;
    entity->sound.chunk = Mix_LoadWAV("assets/sounds/smallasplode.wav");
    entity->active = true;
}
void createParticle(SDL_Renderer* renderer, std::vector<Entity>* entities, std::string path){
    entities->push_back(Entity(uniqueId++, "particle", false));
    initParticle(renderer, &entities->back(), path);
}
void initParticle(SDL_Renderer* renderer, Entity* entity, std::string path) {
    entity->actor = ACTOR_PARTICLE;
    entity->category = PARTICLE;
    SDL_Surface *surface = IMG_Load("assets/images/star.png");
    entity->sprite.texture = SDL_CreateTextureFromSurface(renderer, surface);

    double scale = 1.0;
    entity->sprite.width = surface->w*scale;
    entity->sprite.height = surface->h*scale;
    entity->bounds.w = surface->w*scale; 
    entity->bounds.h = surface->h*scale; 
    entity->scale.x = scale;
    entity->scale.y = scale;
    SDL_FreeSurface(surface);
}
void refreshParticle(Entity* entity, int x, int y){
    double Tau = 6.28318;
    double radians = ((double)std::rand()/1.0) * Tau;
    double magnitude = std::rand() % 100 + 50;
    double velocityX = magnitude * cos(radians);
    double velocityY = magnitude * sin(radians);
    double scale = (double)(std::rand() % 10) / 10.0;
    entity->position.x = x;
    entity->position.y = y;
    entity->bounds.x = x; 
    entity->bounds.y = y; 
    entity->scale.x = scale;
    entity->scale.y = scale;
    entity->velocity.x = velocityX;
    entity->velocity.y = velocityY;
    entity->hasVelocity = true;
    entity->tint.r = 0xfa;
    entity->tint.g = 0xfa;
    entity->tint.b = 0xd2;
    entity->tint.a = 0xff;
    entity->hasTint = true;
    entity->expires = 0.75;
    entity->hasExpires = true;
    entity->active = true;
}

