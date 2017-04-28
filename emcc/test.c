#include <stdio.h>
#include <SDL/SDL.h>
#include <SDL/SDL_image.h>

//emcc -s USE_SDL=1 --preload-file res/background.bmp -o emcc/index.html emcc/test.c

int main ( int argc, char **argv )
{
    SDL_Init(SDL_INIT_VIDEO);

    SDL_Surface * image = IMG_Load("res/background.bmp");
    if (!image)
    {
        printf("IMG_Error: %s\n", IMG_GetError());
        return 1;
    }

    SDL_Surface * screen = SDL_SetVideoMode(640, 480, 32, SDL_SWSURFACE);
    if (!screen)
    {
        printf("SDL_Error: %s\n", SDL_GetError());
        return 1;
    }

    SDL_BlitSurface(image, NULL, screen, NULL);
    SDL_Flip(screen);

    return 0;
}