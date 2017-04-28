#include <SDL/SDL.h>
#include <SDL/SDL_image.h>
#include <stdio.h>

int main() {
  FILE *file = fopen("res/hello_world_file.txt", "rb");
  if (!file) {
    printf("cannot open file\n");
    return 1;
  }
  while (!feof(file)) {
    char c = fgetc(file);
    if (c != EOF) {
      putchar(c);
    }
  }
  fclose (file);

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
  
  return 0;
}

//emcc --preload-file res -o emcc/index.html emcc/file.cpp
//emcc -s USE_SDL=1 --use-preload-plugins --preload-file res -o emcc/index.html emcc/file.cpp
