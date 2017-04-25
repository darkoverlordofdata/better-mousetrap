/** 
 * Entity Factory implementation
 */
#include "shmupwarz.h"

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

    entity->mask |= __ACTIVE__;
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
    entity->addExpires(1.0);
    entity->addHealth(2, 2);
    entity->addTint(0xd2, 0xfa, 0x00, 0xff);
    entity->addVelocity(0, -800);
    entity->addSound(Mix_LoadWAV("assets/sounds/pew.wav"));
    SDL_FreeSurface(surface);
}

void refreshBullet(Entity* entity, int x, int y) {
    entity->position.x = x;
    entity->position.y = y;
    entity->setExpires(1.0);
    entity->setHealth(2, 2);
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
    entity->addHealth(10, 10);
    entity->addVelocity(0, 40);
    SDL_FreeSurface(surface);
}
void refreshEnemy1(Entity* entity, int x, int y) {
    entity->position.x = x;
    entity->position.y = y;
    entity->setHealth(10, 10);
    entity->setVelocity(0, 40);

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
    entity->addHealth(20, 20);
    entity->addVelocity(0, 30);
    SDL_FreeSurface(surface);
}
void refreshEnemy2(Entity* entity, int x, int y){
    entity->position.x = x;
    entity->position.y = y;
    entity->setHealth(20, 20);
    entity->setVelocity(0, 30);
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
    entity->addHealth(60, 60);
    entity->addVelocity(0, 20);
    SDL_FreeSurface(surface);
}
void refreshEnemy3(Entity* entity, int x, int y){
    entity->position.x = x;
    entity->position.y = y;
    entity->setHealth(60, 60);
    entity->setVelocity(0, 20);
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
    entity->addTween(scale/100.0, scale, -3, false, true);
    entity->addTint(0xd2, 0xfa, 0xd2, 0xfa);
    entity->addExpires(0.2);
    entity->addSound(Mix_LoadWAV("assets/sounds/asplode.wav"));
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
    entity->setTween(scale/100.0, scale, -3, false, true);
    entity->setExpires(0.2);
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
    entity->addTween(scale/100.0, scale, -3, false, true);
    entity->addTint(0xd2, 0xfa, 0xd2, 0xfa);
    entity->addExpires(0.2);
    entity->addSound(Mix_LoadWAV("assets/sounds/smallasplode.wav"));
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
    entity->setTween(scale/100.0, scale, -3, false, true);
    entity->setExpires(0.2);
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
    entity->addVelocity(0, 0);
    entity->addTint(0xfa, 0xfa, 0xd2, 0xff);
    entity->addExpires(0.75);
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
    entity->setVelocity(velocityX, velocityY);
    entity->setTint(0xfa, 0xfa, 0xd2, 0xff);
    entity->setExpires(0.75);
    entity->active = true;
}

