/** 
 * Entity Factory implementation
 */
#include "shmupwarz.h"

int uniqueId = 0;

void initBackground(SDL_Renderer* renderer, Entity* entity) {
    auto scale = 2.0;
    SDL_Surface *surface = IMG_Load("assets/images/background.png");
    entity
        ->addLevel(ACTOR_BACKGROUND)
        ->addKind(BACKGROUND)
        ->addSprite(SDL_CreateTextureFromSurface(renderer, surface), surface->w*scale, surface->h*scale)
        ->addBounds(0, 0, surface->w*scale, surface->h*scale)
        ->addScale(scale, scale)
        ->addPosition(0, 0)
        ->setActive(true);
    SDL_FreeSurface(surface);
}

void createBackground(SDL_Renderer* renderer, std::vector<Entity>* entities){
    entities->emplace_back(uniqueId++, "background", true);
    initBackground(renderer, &entities->back());
}

void initPlayer(SDL_Renderer* renderer, Entity* entity) {
    auto scale = 1.0;
    SDL_Surface *surface = IMG_Load("assets/images/spaceshipspr.png");
    entity
        ->addLevel(ACTOR_PLAYER)
        ->addKind(PLAYER)
        ->addSprite(SDL_CreateTextureFromSurface(renderer, surface), surface->w*scale, surface->h*scale)
        ->addBounds(0, 0, surface->w*scale, surface->h*scale)
        ->addScale(scale, scale)
        ->addPosition(0, 0)
        ->setActive(true);
    SDL_FreeSurface(surface);
}
Entity* createPlayer(SDL_Renderer* renderer, std::vector<Entity>* entities) {
    entities->emplace_back(uniqueId++, "player", true);
    initPlayer(renderer, &entities->back());
    return &entities->back();
}

void initBullet(SDL_Renderer* renderer, Entity* entity) {
    auto scale = 1.0;
    SDL_Surface *surface = IMG_Load("assets/images/bullet.png");
    entity
        ->addLevel(ACTOR_BULLET)
        ->addKind(BULLET)
        ->addSprite(SDL_CreateTextureFromSurface(renderer, surface), surface->w*scale, surface->h*scale)
        ->addBounds(0, 0, surface->w*scale, surface->h*scale)
        ->addScale(scale, scale)
        ->addPosition(0, 0)
        ->addExpires(1.0)
        ->addHealth(2, 2)
        ->addTint(0xd2, 0xfa, 0x00, 0xff)
        ->addVelocity(0, -800)
        ->addSound(Mix_LoadWAV("assets/sounds/pew.wav"));

    SDL_FreeSurface(surface);
}
void createBullet(SDL_Renderer* renderer, std::vector<Entity>* entities) {
    entities->emplace_back(uniqueId++, "bullet", false);
    initBullet(renderer, &entities->back());
}

void refreshBullet(Entity* entity, int x, int y) {
    entity
        ->setPosition(x, y)
        ->setExpires(1.0)
        ->setHealth(2, 2)
        ->setActive(true);
}

void initEnemy1(SDL_Renderer* renderer, Entity* entity) {
    auto scale = 1.0;
    SDL_Surface *surface = IMG_Load("assets/images/enemy1.png");
    entity
        ->addLevel(ACTOR_ENEMY1)
        ->addKind(ENEMY)
        ->addSprite(SDL_CreateTextureFromSurface(renderer, surface), surface->w*scale, surface->h*scale)
        ->addBounds(0, 0, surface->w*scale, surface->h*scale)
        ->addScale(scale, scale)
        ->addPosition(0, 0)
        ->addHealth(10, 10)
        ->addVelocity(0, 40);
    SDL_FreeSurface(surface);
}
void createEnemy1(SDL_Renderer* renderer, std::vector<Entity>* entities){
    entities->emplace_back(uniqueId++, "enemy1", false);
    initEnemy1(renderer, &entities->back());
}
void refreshEnemy1(Entity* entity, int x, int y) {
    entity
        ->setPosition(x, y)
        ->setHealth(10, 10)
        ->setVelocity(0, 40)
        ->setActive(true);
}

void initEnemy2(SDL_Renderer* renderer, Entity* entity) {
    auto scale = 1.0;
    SDL_Surface *surface = IMG_Load("assets/images/enemy2.png");
    entity
        ->addLevel(ACTOR_ENEMY2)
        ->addKind(ENEMY)
        ->addSprite(SDL_CreateTextureFromSurface(renderer, surface), surface->w*scale, surface->h*scale)
        ->addBounds(0, 0, surface->w*scale, surface->h*scale)
        ->addScale(scale, scale)
        ->addPosition(0, 0)
        ->addHealth(20, 20)
        ->addVelocity(0, 30);

    SDL_FreeSurface(surface);
}
void createEnemy2(SDL_Renderer* renderer, std::vector<Entity>* entities){
    entities->emplace_back(uniqueId++, "enemy2", false);
    initEnemy2(renderer, &entities->back());
}
void refreshEnemy2(Entity* entity, int x, int y){
    entity
        ->setPosition(x, y)
        ->setHealth(20, 20)
        ->setVelocity(0, 30)
        ->setActive(true);
}
void initEnemy3(SDL_Renderer* renderer, Entity* entity) {
    auto scale = 1.0;
    SDL_Surface *surface = IMG_Load("assets/images/enemy3.png");
    entity
        ->addLevel(ACTOR_ENEMY3)
        ->addKind(ENEMY)
        ->addSprite(SDL_CreateTextureFromSurface(renderer, surface), surface->w*scale, surface->h*scale)
        ->addBounds(0, 0, surface->w*scale, surface->h*scale)
        ->addScale(scale, scale)
        ->addPosition(0, 0)
        ->addHealth(60, 60)
        ->addVelocity(0, 20);

    SDL_FreeSurface(surface);
}
void createEnemy3(SDL_Renderer* renderer, std::vector<Entity>* entities){
    entities->emplace_back(uniqueId++, "enemy3", false);
    initEnemy3(renderer, &entities->back());
}
void refreshEnemy3(Entity* entity, int x, int y){
    entity
        ->setPosition(x, y)
        ->setHealth(60, 60)
        ->setVelocity(0, 20)
        ->setActive(true);
}

void initExplosion(SDL_Renderer* renderer, Entity* entity) {
    auto scale = 0.6;
    SDL_Surface *surface = IMG_Load("assets/images/explosion.png");
    entity
        ->addLevel(ACTOR_EXPLOSION)
        ->addKind(EXPLOSION)
        ->addSprite(SDL_CreateTextureFromSurface(renderer, surface), surface->w*scale, surface->h*scale)
        ->addBounds(0, 0, surface->w*scale, surface->h*scale)
        ->addScale(scale, scale)
        ->addPosition(0, 0)
        ->addTween(scale/100.0, scale, -3, false, true)
        ->addTint(0xd2, 0xfa, 0xd2, 0xfa)
        ->addExpires(0.2)
        ->addSound(Mix_LoadWAV("assets/sounds/asplode.wav"));
    SDL_FreeSurface(surface);
}
void createExplosion(SDL_Renderer* renderer, std::vector<Entity>* entities){
    entities->emplace_back(uniqueId++, "explosion", false);
    initExplosion(renderer, &entities->back());
}
void refreshExplosion(Entity* entity, int x, int y){
    auto scale = 0.6;
    entity
        ->setPosition(x, y)
        ->setBounds(x, y, entity->bounds.w, entity->bounds.h)
        ->setScale(scale, scale)
        ->setTween(scale/100.0, scale, -3, false, true)
        ->setExpires(0.2)
        ->setActive(true);
}
void initBang(SDL_Renderer* renderer, Entity* entity) {
    auto scale = 0.4;
    SDL_Surface *surface = IMG_Load("assets/images/explosion.png");
    entity
        ->addLevel(ACTOR_BANG)
        ->addKind(EXPLOSION)
        ->addSprite(SDL_CreateTextureFromSurface(renderer, surface), surface->w*scale, surface->h*scale)
        ->addBounds(0, 0, surface->w*scale, surface->h*scale)
        ->addScale(scale, scale)
        ->addPosition(0, 0)
        ->addTween(scale/100.0, scale, -3, false, true)
        ->addTint(0xd2, 0xfa, 0xd2, 0xfa)
        ->addExpires(0.2)
        ->addSound(Mix_LoadWAV("assets/sounds/sallasplode.wav"));

    SDL_FreeSurface(surface);
}
void createBang(SDL_Renderer* renderer, std::vector<Entity>* entities){
    entities->emplace_back(uniqueId++, "bang", false);
    initBang(renderer, &entities->back());
}
void refreshBang(Entity* entity, int x, int y){
    auto scale = 0.4;
    entity
        ->setPosition(x, y)
        ->setBounds(x, y, entity->bounds.w, entity->bounds.h)
        ->setScale(scale, scale)
        ->setTween(scale/100.0, scale, -3, false, true)
        ->setExpires(0.2)
        ->setActive(true);
}
void initParticle(SDL_Renderer* renderer, Entity* entity) {
    auto scale = 1.0;
    SDL_Surface *surface = IMG_Load("assets/images/star.png");
    entity
        ->addLevel(ACTOR_PARTICLE)
        ->addKind(PARTICLE)
        ->addSprite(SDL_CreateTextureFromSurface(renderer, surface), surface->w*scale, surface->h*scale)
        ->addBounds(0, 0, surface->w*scale, surface->h*scale)
        ->addScale(scale, scale)
        ->addPosition(0, 0)
        ->addVelocity(0, 0)
        ->addTint(0xfa, 0xfa, 0xd2, 0xff)
        ->addExpires(0.75);
    
    SDL_FreeSurface(surface);
}
void createParticle(SDL_Renderer* renderer, std::vector<Entity>* entities){
    entities->emplace_back(uniqueId++, "particle", false);
    initParticle(renderer, &entities->back());
}
void refreshParticle(Entity* entity, int x, int y){
    auto Tau = 6.28318;
    auto radians = ((double)std::rand()/1.0) * Tau;
    auto magnitude = std::rand() % 100 + 50;
    auto velocityX = magnitude * cos(radians);
    auto velocityY = magnitude * sin(radians);
    auto scale = (double)(std::rand() % 10) / 10.0;
    entity
        ->setPosition(x, y)
        ->setBounds(x, y, entity->bounds.w, entity->bounds.h)
        ->setScale(scale, scale)
        ->setVelocity(velocityX, velocityY)
        ->setTint(0xfa, 0xfa, 0xd2, 0xff)
        ->setExpires(0.75)
        ->setActive(true);
}

