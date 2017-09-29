/** 
 * Entity Factory interface
 */
#ifndef ENTITIES_H
#define ENTITIES_H

void createBackground(SDL_Renderer* renderer, std::vector<Entity>* entities);
Entity* createPlayer(SDL_Renderer* renderer, std::vector<Entity>* entities);
void createBullet(SDL_Renderer* renderer, std::vector<Entity>* entities);
void createEnemy1(SDL_Renderer* renderer, std::vector<Entity>* entities);
void createEnemy2(SDL_Renderer* renderer, std::vector<Entity>* entities);
void createEnemy3(SDL_Renderer* renderer, std::vector<Entity>* entities);
void createExplosion(SDL_Renderer* renderer, std::vector<Entity>* entities);
void createBang(SDL_Renderer* renderer, std::vector<Entity>* entities);
void createParticle(SDL_Renderer* renderer, std::vector<Entity>* entities);

void refreshBullet(Entity* entity, int x, int y);
void refreshEnemy1(Entity* entity, int x, int y);
void refreshEnemy2(Entity* entity, int x, int y);
void refreshEnemy3(Entity* entity, int x, int y);
void refreshExplosion(Entity* entity, int x, int y);
void refreshBang(Entity* entity, int x, int y);
void refreshParticle(Entity* entity, int x, int y);

#endif