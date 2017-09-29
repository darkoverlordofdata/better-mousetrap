#include "shmupwarz.h"
/**
 * Entity
 */
Entity::Entity(int id, std::string name, bool active): id(id), name(name) {
    mask = 0;
    setActive(active);
}

bool Entity::hasComponent(long index) {
    return (__POW2__[index] & mask) != 0;
}
bool Entity::isActive() {
    return (__ACTIVE__ & mask) != 0;
}
Entity* Entity::setActive(bool active) {
    if (((mask & __ACTIVE__) == __ACTIVE__ ) == active) return this;
    if (active) mask |= __ACTIVE__;
    else mask ^= __ACTIVE__;
    return this;
}
bool Entity::hasBounds() {
    return (__BOUNDS__ & mask) != 0;
}
bool Entity::hasExpires() {
    return (__EXPIRES__ & mask) != 0;
}
bool Entity::hasHealth() {
    return (__HEALTH__ & mask) != 0;
}
bool Entity::hasKind() {
    return (__KIND__ & mask) != 0;
}
bool Entity::hasLevel() {
    return (__LEVEL__ & mask) != 0;
}
bool Entity::hasPosition() {
    return (__POSITION__ & mask) != 0;
}
bool Entity::hasScale() {
    return (__SCALE__ & mask) != 0;
}
bool Entity::hasSound() {
    return (__SOUND__ & mask) != 0;
}
bool Entity::hasSprite() {
    return (__SPRITE__ & mask) != 0;
}
bool Entity::hasTint() {
    return (__TINT__ & mask) != 0;
}
bool Entity::hasTween() {
    return (__TWEEN__ & mask) != 0;
}
bool Entity::hasVelocity() {
    return (__VELOCITY__ & mask) != 0;
}

Entity* Entity::addBounds(int x, int y, int w, int h){
    if ((__BOUNDS__ & mask) != 0) throw std::logic_error("already has BoundsComponent");
    mask |= __BOUNDS__;
    bounds.x = x;
    bounds.y = y;
    bounds.w = w;
    bounds.h = h;
    return this;

}
Entity* Entity::setBounds(int x, int y, int w, int h){
    if ((__BOUNDS__ & mask) == 0) throw std::logic_error("does not have BoundsComponent");
    bounds.x = x;
    bounds.y = y;
    bounds.w = w;
    bounds.h = h;
    return this;
}
Entity* Entity::removeBounds(){
    if ((__BOUNDS__ & mask) == 0) throw std::logic_error("does not have BoundsComponent");
    mask ^= __BOUNDS__;
    return this;
}

Entity* Entity::addExpires(double value) {
    if ((__EXPIRES__ & mask) != 0) throw std::logic_error("already has ExpiresComponent");
    mask |= __EXPIRES__;
    expires = value;
    return this;
}
Entity* Entity::setExpires(double value) {
    if ((__EXPIRES__ & mask) == 0) throw std::logic_error("does not have ExpiresComponent");
    expires = value;
    return this;    
}
Entity* Entity::removeExpires() {
    if ((__EXPIRES__ & mask) == 0) throw std::logic_error("does not have ExpiresComponent");
    mask ^= __EXPIRES__;
    return this;    
}

Entity* Entity::addHealth(double current, double maximum) {
    if ((__HEALTH__ & mask) != 0) throw std::logic_error("already has HealthComponent");
    mask |= __HEALTH__;
    this->health.current = current;
    this->health.maximum = maximum;
    return this;
}
Entity* Entity::setHealth(double current, double maximum) {
    if ((__HEALTH__ & mask) == 0) throw std::logic_error("does not have HealthComponent");
    this->health.current = current;
    this->health.maximum = maximum;
    return this;
    
}
Entity* Entity::removeHealth() {
    if ((__HEALTH__ & mask) == 0) throw std::logic_error("does not have HealthComponent");
    mask ^= __HEALTH__;
    return this;    
}

Entity* Entity::addKind(Category value){
    if ((__KIND__ & mask) != 0) throw std::logic_error("already has KindComponent");
    mask |= __KIND__;
    this->kind = value;
    return this;
}
Entity* Entity::setKind(Category value){
    if ((__KIND__ & mask) == 0) throw std::logic_error("does not have KindComponent");
    this->kind = value;
    return this;
}
Entity* Entity::removeKind(){
    if ((__KIND__ & mask) == 0) throw std::logic_error("does not have KindComponent");
    mask ^= __KIND__;
    return this;    
}

Entity* Entity::addLevel(Actor value){
    if ((__LEVEL__ & mask) != 0) throw std::logic_error("already has LevelComponent");
    mask |= __LEVEL__;
    this->level = value;
    return this;
}
Entity* Entity::setLevel(Actor value){
    if ((__LEVEL__ & mask) == 0) throw std::logic_error("does not have LevelComponent");
    this->level = value;
    return this;
}
Entity* Entity::removeLevel(){
    if ((__LEVEL__ & mask) == 0) throw std::logic_error("does not have LevelComponent");
    mask ^= __LEVEL__;
    return this;
}

Entity* Entity::addPosition(double x, double y){
    if ((__POSITION__ & mask) != 0) throw std::logic_error("already has PositionComponent");
    mask |= __POSITION__;
    this->position.x = x;
    this->position.y = y;
    return this;
}
Entity* Entity::setPosition(double x, double y){
    if ((__POSITION__ & mask) == 0) throw std::logic_error("does not have PositionComponent");
    this->position.x = x;
    this->position.y = y;
    return this;
}
Entity* Entity::removePosition(){
    if ((__POSITION__ & mask) == 0) throw std::logic_error("does not have PositionComponent");
    mask ^= __POSITION__;
    return this;
}

Entity* Entity::addScale(double x, double y){
    if ((__SCALE__ & mask) != 0) throw std::logic_error("already has ScaleComponent");
    mask |= __SCALE__;
    this->scale.x = x;
    this->scale.y = y;
    return this;
}
Entity* Entity::setScale(double x, double y){
    if ((__SCALE__ & mask) == 0) throw std::logic_error("does not have ScaleComponent");
    this->scale.x = x;
    this->scale.y = y;
    return this;
}
Entity* Entity::removeScale(){
    if ((__SCALE__ & mask) == 0) throw std::logic_error("does not have ScaleComponent");
    mask ^= __SCALE__;
    return this;
}



Entity* Entity::addSound(Mix_Chunk *chunk) {
    if ((__SOUND__ & mask) != 0) throw std::logic_error("already has SoundComponent");
    mask |= __SOUND__;
    this->sound.chunk = chunk;
    return this;
}
Entity* Entity::setSound(Mix_Chunk *chunk) {
    if ((__SOUND__ & mask) == 0) throw std::logic_error("does not have SoundComponent");
    this->sound.chunk = chunk;
    return this;    
}
Entity* Entity::removeSound() {
    if ((__SOUND__ & mask) == 0) throw std::logic_error("does not have SoundComponent");
    this->sound.chunk = NULL;
    mask ^= __SOUND__;
    return this;
}

Entity* Entity::addSprite(SDL_Texture* texture, int width, int height){
    if ((__SPRITE__ & mask) != 0) throw std::logic_error("already has SpriteComponent");
    mask |= __SPRITE__;
    this->sprite.texture = texture;
    this->sprite.width = width;
    this->sprite.height = height;
    return this;
}
Entity* Entity::setSprite(SDL_Texture* texture, int width, int height){
    if ((__SPRITE__ & mask) == 0) throw std::logic_error("does not have SpriteComponent");
    this->sprite.texture = texture;
    this->sprite.width = width;
    this->sprite.height = height;
    return this;
}
Entity* Entity::removeSprite(){
    if ((__SPRITE__ & mask) == 0) throw std::logic_error("does not have SoundComponent");
    this->sprite.texture = NULL;
    mask ^= __SPRITE__;
    return this;
}


Entity* Entity::addTint(int r, int g, int b, int a) {
    if ((__TINT__ & mask) != 0) throw std::logic_error("already has TintComponent");
    mask |= __TINT__;
    this->tint.r = r;
    this->tint.g = g;
    this->tint.b = b;
    this->tint.a = a;
    return this;
    
}
Entity* Entity::setTint(int r, int g, int b, int a) {
    if ((__TINT__ & mask) == 0) throw std::logic_error("does not have TintComponent");
    this->tint.r = r;
    this->tint.g = g;
    this->tint.b = b;
    this->tint.a = a;
    return this;    
}
Entity* Entity::removeTint() {
    if ((__TINT__ & mask) == 0) throw std::logic_error("does not have TintComponent");
    mask ^= __TINT__;
    return this;   
}

Entity* Entity::addTween(double min, double max, double speed, bool repeat, bool active) {
    if ((__TWEEN__ & mask) != 0) throw std::logic_error("already has TweenComponent");
    this->tween.min = min;
    this->tween.max = max;
    this->tween.speed = speed;
    this->tween.repeat = repeat;
    this->tween.active = active;
    mask |= __TWEEN__;
    return this;
    
}
Entity* Entity::setTween(double min, double max, double speed, bool repeat, bool active) {
    if ((__TWEEN__ & mask) == 0) throw std::logic_error("does not have TweenComponent");
    this->tween.min = min;
    this->tween.max = max;
    this->tween.speed = speed;
    this->tween.repeat = repeat;
    this->tween.active = active;
    return this;
}
Entity* Entity::removeTween() {
    if ((__TWEEN__ & mask) == 0) throw std::logic_error("does not have TweenComponent");
    mask ^= __TWEEN__;
    return this;
    
}

Entity* Entity::addVelocity(double x, double y) {
    if ((__VELOCITY__ & mask) != 0) throw std::logic_error("already has VelocityComponent");
    this->velocity.x = x;
    this->velocity.y = y;
    mask |= __VELOCITY__;
    return this;
    
}
Entity* Entity::setVelocity(double x, double y) {
    if ((__VELOCITY__ & mask) == 0) throw std::logic_error("does not have VelocityComponent");
    this->velocity.x = x;
    this->velocity.y = y;
    return this;
    
}
Entity* Entity::removeVelocity() {
    if ((__VELOCITY__ & mask) == 0) throw std::logic_error("does not have VelocityComponent");
    mask ^= __VELOCITY__;
    return this;
    
}
