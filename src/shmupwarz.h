/**
 * Shmupwarz
 */
#include <cstdio>
#include <map>
#include <string>
#include <iostream>
#include <ctime>
#include <chrono>
#include <vector>
#include <random>
#include <list>
#include <stdio.h>
#include <stdexcept>
#include <algorithm>
#include <emscripten.h>

#include <SDL2/SDL.h>
#include <SDL2/SDL_image.h>
#include <SDL/SDL_mixer.h>
#include <SDL/SDL_ttf.h>

#include "components.h"
#include "entity.h"
#include "entities.h"
#include "game.h"
#include "systems.h"


/*
Copyright (c) 2017 Bruce Davidson &lt;darkoverlordofdata@gmail.com&gt;

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/