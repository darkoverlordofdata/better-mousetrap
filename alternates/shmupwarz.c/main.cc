#include "shmupwarz.h"
// // 0.00015244
// 0.000096798

void main_loop(Game *arg);

using namespace std::chrono;

inline void logSDLError(std::ostream &os, const std::string &msg){
	os << msg << " error: " << SDL_GetError() << std::endl;
}

double delta = 0.0;
double d = 0.0;
long fps = 60;
long k = 0;
double t = 0.0;
long k2 = 0;

high_resolution_clock::time_point mark1 = high_resolution_clock::now();

extern "C" void game() {
    auto title = "Shmupwarz";
    auto width = 720;
    auto height = 600;

    std::cout << title << std::endl << std::flush;

    SDL_Init(SDL_INIT_EVERYTHING);
    TTF_Init();
    if (IMG_Init(IMG_INIT_PNG) != IMG_INIT_PNG) {
        logSDLError(std::cout, "Init image");
    }
    Mix_Init(0);
    if (Mix_OpenAudio(44100,MIX_DEFAULT_FORMAT,2,4096) < 0) {
        logSDLError(std::cout, "Init mixer");
    }
    Mix_AllocateChannels(500);
    auto window = SDL_CreateWindow(title, SDL_WINDOWPOS_CENTERED, SDL_WINDOWPOS_CENTERED, width, height, SDL_WINDOW_SHOWN);
    auto renderer = SDL_CreateRenderer(window, -1, 0);
    auto game = new Game(title, width, height, window, renderer);
    game->start();
    emscripten_set_main_loop_arg((em_arg_callback_func)main_loop, game, 0, 1);
}

void main_loop(Game *game) {

        high_resolution_clock::time_point mark2 = high_resolution_clock::now();
        delta = ((double) duration_cast<microseconds>(mark2 - mark1).count()) / 1000000.0;
        mark1 = mark2;
        k += 1;
        d += delta;
        if (d >= 1.0) {
            fps = k;
            k = 0;
            d = 0;
        }
        game->handleEvents();
        if (game->getKey(SDLK_ESCAPE)) game->quit();
        
        high_resolution_clock::time_point m1 = high_resolution_clock::now();
        game->update(delta);
        high_resolution_clock::time_point m2 = high_resolution_clock::now();
        k2 = k2 +1;
        t += ((double) duration_cast<microseconds>(m2 - m1).count()) / 1000000.0;
        //t = 4.6e-06 = .00000046

        if (k2 >= 1000) {
	        std::cout << t/1000 << "\n" << std::flush;
            k2 = 0;
            t = 0.0;
        }
        game->draw(fps);

}



