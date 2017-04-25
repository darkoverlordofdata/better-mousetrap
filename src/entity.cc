#include "shmupwarz.h"


Entity::Entity(int id, std::string name, bool active): id(id), name(name), active(active) {
    mask = 0;
}

bool Entity::hasComponent(long index) {
    return (__POW2__[index] & mask) != 0;
}
bool Entity::hasExpires() {
    return (__EXPIRES__ & mask) != 0;
}
bool Entity::hasHealth() {
    return (__HEALTH__ & mask) != 0;
}
bool Entity::hasSound() {
    return (__SOUND__ & mask) != 0;
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
